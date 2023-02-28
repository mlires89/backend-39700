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
    const idProd = Number(req.params.id);
    const producto = await manager.getProductById(idProd);
    if (producto){
        res.send(producto);
    }else{
        res.send(`Producto con id: ${id} no encontrado`)
    }    
})

productsRouter.post("/",  async (req,res)=>{
    const productData = {
        ...req.params.body,
        status:"true",
        thumbnails:[],
    }
    
    if(!req.params.body.title || !req.params.body.description || !req.params.body.code || !req.params.body.price || !req.params.body.stock || !req.params.body.stock){

        return res.status(400).send({error:"Missing parameters"});
    }

    await manager.addProduct(productData);
    res.status(201).res.send("producto agregado");

})


productsRouter.put("/:id", async (req,res)=>{
    const idProd = Number(req.params.id);
    const productData = {
        ...req.params.body,
        id:idProd,
    }
    await manager.updateProduct(productData);
    res.send(`producto id: ${idProd} actualizado`)

})

productsRouter.delete("/:id", async (req,res)=>{
    
    const idProd = Number(req.params.id);
    await manager.deleteProducto(idProd);
    res.send(`producto con id:${idProd} eliminado`);

})


export default productsRouter;