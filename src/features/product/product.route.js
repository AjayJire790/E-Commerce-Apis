//1.Import Express
import express, { Router } from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middleware/fileupload.middleware.js";

//2.Initilize Express router
const productRouter = express.Router();

const productController = new ProductController();

//localhost:3000:/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productRouter.post("/rate", productController.rateProduct);

productRouter.get("/filter", productController.filterProducts);

productRouter.get("/", productController.getAllProducts);

productRouter.post(
  "/",
  upload.single("imageUrl"),
  productController.addProduct
);
productRouter.get("/:id", productController.getOneProduct);
//All the paths to controller methods
export default productRouter;
