import {Router,json} from "express";

const productsRouter = Router();
productsRouter.use(json());

import ProductManager from "../ProductManager.js";
const manager = new ProductManager("express-server/src/productos.json");


productsRouter.get("/", async (req,res)=>{
    const {limit} = req.query;
    const productos = await manager.getProducts();
    if (limit){
        res.send(productos.slice(0,limit));
    }else{
        res.send(productos)
    }    
})

productsRouter.get("/:id", async (req,res)=>{
    const {id} = req.params;
    const idProd = parseInt(id);
    const producto = await manager.getProductById(idProd);
    if (producto){
        res.send(producto);
    }else{
        res.send(`Producto con id: ${id} no encontrado`)
    }    
})


export default productsRouter;