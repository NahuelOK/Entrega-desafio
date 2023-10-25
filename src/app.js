import express from "express"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"

const app = express()
app.use(express.json())

app.get("/", (req, res) => res.status(200).json({ message: "TODO Ok" }))
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Serven en http://localhost:${PORT}`))
server.on('err', err => console.log(`Error: ${err.message}`))