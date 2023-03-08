import express from "express";
import {engine} from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import __dirname from "./utils.js"; 

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname+"../public"));
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);
app.use("/", viewsRouter);

const httpServer= app.listen(8080,()=>{
    console.log("Servidor escuchando en el puerto 8080")
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("nuevo cliente conectado");
    // socket.on("chat-message", (data) => {
        
    // });
});