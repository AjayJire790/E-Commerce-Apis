//1.Import Expresss
import express from "express";
import productRouter from "./src/features/product/product.route.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.route.js";
import authorizer from "./src/middleware/basicAuth.middleware.js";
//2.Create Server
const server = express();

server.use(bodyParser.json());
//for all request related to product, redirect to product  routes.
server.use("/api/products", authorizer, productRouter);

//for all request related to user routes.
server.use("/api/users", userRouter);

//3.Default request handler
server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce APIs");
});

//4.Server Specify
server.listen(3000, () => {
  console.log("Server is listenning on port 3000");
});
