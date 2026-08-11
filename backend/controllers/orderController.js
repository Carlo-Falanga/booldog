const pool = require("../data/db");
const { validationResult } = require("express-validator");
const {
  sendOrderConfirmation,
  sendAdminOrderConfirmation,
} = require("../services/mail");
const { evaluateCoupon, REASON_EXPIRED } = require("../services/coupon");
const { roundToCents } = require("../services/money");

const ADMIN_MAIL_DELAY_MS = 10000;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const show = async (req, res) => {
  const { id } = req.params;

  try {
    const orderSql = `SELECT * FROM orders WHERE id = ?`;
    const [orderResults] = await pool.query(orderSql, [id]);

    if (orderResults.length === 0) {
      return res.status(404).json({ error: "Ordine non trovato" });
    }

    const order = orderResults[0];

    const itemsSql = `
            SELECT p.id, p.name, p.slug, p.price, p.img_url, op.quantity
            FROM order_product op
            JOIN products p ON p.id = op.product_id
            WHERE op.order_id = ?
        `;
    const [itemsResults] = await pool.query(itemsSql, [id]);

    res.json({
      ...order,
      items: itemsResults,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Database error",
    });
  }
};

const store = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ error: true, errors: result.array() });
  }

  const {
    user_full_name,
    email,
    phone_number,
    address,
    zipcode,
    city,
    country,
    products,
    coupon_code,
  } = req.body;

  // order, items and stock must all land or none of them
  const connection = await pool.getConnection();

  try {
    const productIds = products.map((p) => p.id);
    const productSql = `SELECT id, name, price, stock FROM products WHERE id IN (?)`;
    const [productResults] = await connection.query(productSql, [productIds]);

    if (productResults.length === 0) {
      return res.status(404).json({ error: "Prodotti non trovati" });
    }

    let total = 0;
    for (const cartItem of products) {
      const dbProduct = productResults.find((p) => p.id === cartItem.id);

      if (!dbProduct) {
        return res.status(404).json({ error: "Prodotto non trovato" });
      }

      if (cartItem.quantity > dbProduct.stock) {
        return res.status(400).json({
          error: `Stock insufficiente per "${dbProduct.name}" (disponibili: ${dbProduct.stock})`,
        });
      }

      total += parseFloat(dbProduct.price) * cartItem.quantity;
    }

    // summing floats leaves things like 104.69999999999999
    total = roundToCents(total);

    let coupon_id = null;
    if (coupon_code) {
      const couponSql = `SELECT * FROM coupons WHERE code = ?`;
      const [couponResults] = await connection.query(couponSql, [coupon_code]);

      if (couponResults.length === 0) {
        return res.status(404).json({ error: "Coupon non trovato" });
      }

      const coupon = couponResults[0];
      const evaluation = evaluateCoupon(coupon, total);

      if (!evaluation.valid) {
        const message = evaluation.reason === REASON_EXPIRED
          ? "Coupon scaduto o non ancora attivo"
          : "Totale minimo non raggiunto";
        return res.status(400).json({ error: message });
      }

      coupon_id = coupon.id;
      total = roundToCents(evaluation.newTotal);
    }

    await connection.beginTransaction();

    const order_code = `BD-${Date.now()}`;

    const insertOrderSql = `
                INSERT INTO orders
                (coupon_id, order_code, user_full_name, email, phone_number, address, zipcode, city, country, total)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

    const orderValues = [
      coupon_id,
      order_code,
      user_full_name,
      email,
      phone_number || null,
      address,
      zipcode,
      city,
      country,
      total,
    ];

    const [insertOrderResult] = await connection.query(insertOrderSql, orderValues);
    const order_id = insertOrderResult.insertId;

    const itemsValues = products.map((p) => [order_id, p.id, p.quantity]);
    const itemsSql = `INSERT INTO order_product (order_id, product_id, quantity) VALUES ?`;
    await connection.query(itemsSql, [itemsValues]);

    // the stock >= ? guard is what stops two racing checkouts from overselling
    const updateStockSql = `UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?`;

    for (const cartItem of products) {
      const [updateResult] = await connection.query(updateStockSql, [
        cartItem.quantity,
        cartItem.id,
        cartItem.quantity,
      ]);

      if (updateResult.affectedRows === 0) {
        await connection.rollback();
        const dbProduct = productResults.find((p) => p.id === cartItem.id);
        return res.status(400).json({
          error: `Stock insufficiente per "${dbProduct.name}" (disponibili: ${dbProduct.stock})`,
        });
      }
    }

    await connection.commit();

    const itemsList = products.map((p) => {
      const dbProduct = productResults.find((dp) => dp.id === p.id);
      return { name: dbProduct.name, quantity: p.quantity };
    });

    const mailPayload = {
      email,
      user_full_name,
      order_code,
      total,
      items: itemsList,
    };

    // after the commit: a failed email must not fail the order
    try {
      await sendOrderConfirmation(mailPayload);
    } catch (mailErr) {
      console.error("Errore invio mail cliente:", mailErr);
    }

    res.status(201).json({
      message: "Ordine creato",
      order_id,
      order_code,
      total,
    });

    (async () => {
      try {
        await delay(ADMIN_MAIL_DELAY_MS);
        await sendAdminOrderConfirmation(mailPayload);
      } catch (mailErr) {
        console.error("Errore invio mail admin:", mailErr);
      }
    })();
  } catch (err) {
    await connection.rollback();
    res.status(500).json({
      error: true,
      message: "Database error",
    });
  } finally {
    connection.release();
  }
};

module.exports = { show, store };
