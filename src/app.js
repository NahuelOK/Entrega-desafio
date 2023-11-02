import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import { Server } from "socket.io";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js"; 

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("/", (req, res) => {
    res.render("index", {
        name: "jorge",
        title: "Proyecto backend"
    });
});
app.use('/home', viewsRouter);

const PORT = process.env.PORT || 8080;
const serverHTTP = app.listen(PORT, () => console.log(`Server en http://localhost:${PORT}`));
serverHTTP.on('err', err => console.log(`Error: ${err.message}`));

const socketServer = new Server(serverHTTP);
socketServer.on("connection", socket => {
    console.log("Nuevo cliente conectado!");

    socket.on("message", data => {
        console.log(data);
    });
    socket.on('productList', data => {
        socketServer.emit('updatedProducts', data);
    });
});
