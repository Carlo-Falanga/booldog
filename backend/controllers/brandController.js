const pool = require("../data/db");

const index = async (req, res) => {
  const sql = `SELECT id, name, slug, logo_url FROM brands ORDER BY name`;

  try {
    const [results] = await pool.query(sql);
    res.json(results);
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Database error",
    });
  }
};

module.exports = { index };
