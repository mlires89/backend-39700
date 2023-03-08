import { Router } from "express";

const router = Router();

import ProductManager from "../ProductManager.js";
const manager = new ProductManager("express-server/src/productos.json");


router.get("/", async (req, res) => {
  const productos = await manager.getProducts();
  res.render("home", {productos});
});

export default router;
