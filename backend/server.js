const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000
const productsRouter = require("./routers/productsRouter")
const couponsRouter = require("./routers/couponsRouter")
const ordersRouter = require("./routers/ordersRouter")
const brandsRouter = require("./routers/brandsRouter")
const serverError = require("./middlewares/serverError")
const notFound = require("./middlewares/notFound")
const cors = require("cors")

app.use(cors())

app.use(express.json())

// absolute, so the server also works when started from the repo root
app.use(express.static(path.join(__dirname, "public")))

app.use('/products', productsRouter)

app.use('/coupons', couponsRouter)

app.use("/orders", ordersRouter)

app.use("/brands", brandsRouter)

app.use(notFound)

app.use(serverError)


app.listen(PORT, () => {
  console.log(`BoolDog API listening on port http://localhost:${PORT}`)
})

