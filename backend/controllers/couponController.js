const pool = require("../data/db")
const { evaluateCoupon, REASON_EXPIRED } = require("../services/coupon")
const { roundToCents } = require("../services/money")

// the total comes from the database prices, not from the client
const validate = async (req, res) => {

    const { code, products } = req.body

    if (!code || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: "Dati mancanti" })
    }

    try {
        const productIds = products.map((p) => p.id)
        const productSql = `SELECT id, price FROM products WHERE id IN (?)`
        const [dbProducts] = await pool.query(productSql, [productIds])

        if (dbProducts.length === 0) {
            return res.status(404).json({ error: "Prodotti non trovati" })
        }

        let cartTotal = 0
        for (const cartItem of products) {
            const dbProduct = dbProducts.find((p) => p.id === cartItem.id)

            if (!dbProduct) {
                return res.status(404).json({ error: "Prodotto non trovato" })
            }

            cartTotal += parseFloat(dbProduct.price) * cartItem.quantity
        }

        cartTotal = roundToCents(cartTotal)

        const couponSql = "SELECT * FROM coupons WHERE code = ?"
        const [coupons] = await pool.query(couponSql, [code])

        if (coupons.length === 0) {
            return res.status(404).json({ valid: false, message: "Coupon non trovato" })
        }

        const coupon = coupons[0]
        const evaluation = evaluateCoupon(coupon, cartTotal)

        if (!evaluation.valid) {
            const message = evaluation.reason === REASON_EXPIRED
                ? "Coupon scaduto o non ancora attivo"
                : `Totale minimo richiesto: ${evaluation.minCartAmount}€`

            return res.json({ valid: false, message })
        }

        res.json({
            valid: true,
            coupon,
            discount: evaluation.discount,
            new_total: roundToCents(evaluation.newTotal)
        })
    } catch (err) {
        res.status(500).json({
            error: true,
            message: "Database error"
        })
    }
}


module.exports = { validate }
