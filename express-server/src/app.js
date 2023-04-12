import express from "express";
import {engine} from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import __dirname from "./utils.js"; 
import mongoose from "mongoose";
import authRouter from "./routes/auth.router.js";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname+"/../public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const httpServer= app.listen(8080,()=>{
    console.log("Servidor escuchando en el puerto 8080")
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("nuevo cliente conectado");
});

app.use((req,res,next)=>{
    req.io =io;
    next();
});


app.use(session({
    store:MongoStore.create({
        mongoUrl:"mongodb+srv://matilires:MatiMongoDB4@cluster0.o8zqbmg.mongodb.net/ecommerce?retryWrites=true&w=majority",
        ttl:60
    }),
    secret: "claveSecreta",
    resave:true,
    saveUninitialized:true,
}))

app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);
app.use('/api/sessions',authRouter);
app.use("/", viewsRouter);



mongoose.connect("mongodb+srv://matilires:MatiMongoDB4@cluster0.o8zqbmg.mongodb.net/ecommerce?retryWrites=true&w=majority").then((conn)=>{
    console.log("DB connected")
})

