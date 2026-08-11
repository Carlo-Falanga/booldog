const pool = require("../data/db")

// the ORDER BY is only ever built from these, never from the query string
const SORT_OPTIONS = {
    "price-up": "p.price",
    "price-down": "p.price DESC",
    "name": "p.name"
}
const DEFAULT_SORT = "p.created_at DESC"

const index = async (req, res) => {

    const { sort, search } = req.query;

    const orderQuery = SORT_OPTIONS[sort] || DEFAULT_SORT;

    const queryParams = [];

    let sql = `
    SELECT
    p.id,
    p.slug,
    p.name,
    p.description,
    p.price,
    p.color,
    p.material,
    p.size,
    p.stock,
    p.img_url,
    p.category,
    p.is_featured,
    p.created_at,
    b.name AS brand_name,
    b.slug AS brand_slug,
    a.name AS animal_name,
    a.slug AS animal_slug
    FROM products p
    JOIN brands b ON b.id = p.brand_id
    JOIN animal_types a ON a.id = p.animal_type_id`;

    if (search && search.trim() !== "") {
        sql += ` WHERE p.name LIKE ?`;
        queryParams.push(`%${search}%`);
    }

    sql += ` ORDER BY ${orderQuery}`;

    try {
        const [results] = await pool.query(sql, queryParams);
        res.json(results);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: "Database error"
        });
    }

}

const indexAnimalType = async (req, res) => {

    const { animalType } = req.params

    const { sort, search } = req.query;

    const orderQuery = SORT_OPTIONS[sort] || DEFAULT_SORT;

    const queryParams = [`${animalType}`];

    let sql = `
    SELECT
    p.id,
    p.slug,
    p.name,
    p.description,
    p.price,
    p.color,
    p.material,
    p.size,
    p.stock,
    p.img_url,
    p.category,
    p.is_featured,
    p.created_at,
    b.name AS brand_name,
    b.slug AS brand_slug,
    a.name AS animal_name,
    a.slug AS animal_slug
    FROM products p
    JOIN brands b ON b.id = p.brand_id
    JOIN animal_types a ON a.id = p.animal_type_id
     WHERE a.slug IN (?, "cane-gatto")`;

    if (search && search.trim() !== "") {
        sql += ` AND p.name LIKE ?`;
        queryParams.push(`%${search}%`);
    }

    sql += ` ORDER BY ${orderQuery}`;

    try {
        const [results] = await pool.query(sql, queryParams);
        res.json(results);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: "Database error"
        });
    }

}

const show = async (req, res) => {
    const { slug } = req.params;

    const productSql =
        `  SELECT
      p.id,
      p.slug,
      p.name,
      p.description,
      p.price,
      p.color,
      p.material,
      p.size,
      p.stock,
      p.img_url,
      p.category,
      p.is_featured,
      p.created_at,
      b.id   AS brand_id,
      b.name AS brand_name,
      b.slug AS brand_slug,
      b.logo_url AS brand_logo,
      a.id   AS animal_id,
      a.name AS animal_name,
      a.slug AS animal_slug
    FROM products p
    JOIN brands b       ON b.id = p.brand_id
    JOIN animal_types a ON a.id = p.animal_type_id
    WHERE p.slug = ?
    LIMIT 1`
        ;

    try {
        const [productResults] = await pool.query(productSql, [slug]);

        if (productResults.length === 0) {
            return res.status(404).json({ error: "Prodotto non trovato" });
        }

        const product = productResults[0];

        const relatedSql =
            ` SELECT
            p.slug,
            p.id,
            p.name,
            p.price,
            p.category,
            p.img_url,
            b.name AS brand_name,
            a.id   AS animal_id,
            a.name AS animal_name
        FROM products p
        JOIN brands b ON b.id = p.brand_id
        JOIN animal_types a ON a.id = p.animal_type_id
        WHERE p.id != ?
          AND (p.brand_id = ? OR p.category = ?)
        ORDER BY RAND()
        LIMIT 4`
            ;

        const [relatedResults] = await pool.query(relatedSql, [product.id, product.brand_id, product.category]);

        res.json({
            ...product,
            related: relatedResults,
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            message: "Database error"
        });
    }
}

module.exports = { index, show, indexAnimalType }
