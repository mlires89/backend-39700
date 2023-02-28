import {Router,json} from "express";

const cartsRouter = Router();
cartsRouter.use(json());

cartsRouter.get("/",(req,res)=>{
    res.send("carritos")
})

export default cartsRouter;