import { Router } from "express";
import productModel from "../dao/models/product.model.js";

const router = Router();

import {ProductManager} from "../dao/index.js";
const manager = new ProductManager("express-server/src/productos.json");


router.get("/", async (req, res) => {
  const productos = await manager.getProducts();
  res.render("home", {productos});
});

router.get("/real-time-products", async (req, res) => {
  const productos = await manager.getProducts();
  res.render("real_time_products", {productos});
});

router.get("/products", async (req, res) => {
  const productos = await productModel.paginate(
    {},
    {
      limit: 10,
      lean: true,
      page: page ?? 1,
    }
  );

  res.render("products", {productos});
});

export default router;
