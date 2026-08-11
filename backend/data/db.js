const mysql = require("mysql2/promise")


const credentials = {
    "host": process.env.DB_HOST,
    "user": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "port": process.env.DB_PORT
}

const pool = mysql.createPool(credentials)

// fail loudly at startup instead of on the first request
pool.getConnection()
    .then((connection) => {
        console.log("Connected to the database")
        connection.release()
    })
    .catch((err) => {
        console.error("Could not connect to the database:", err.message)
        process.exit(1)
    })

module.exports = pool
