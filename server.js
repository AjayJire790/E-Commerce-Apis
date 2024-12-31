//1.Import Expresss
import "./env.js";
import express from "express";
import swagger from "swagger-ui-express";
import cors from "cors";
import productRouter from "./src/features/product/product.route.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.route.js";
import cartRouter from "./src/features/cartItems/cartItems.route.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import apiDocs from "./swagger.json" assert { type: "json" };
import { connectToMongoDB } from "./src/config/mongodb.js";

//2.Create Server
const server = express();

//CORS policy configuration
var corsOptions = {
  origin: "http://127.0.0.1:5500", // replace with rontend URL
};

server.use(cors(corsOptions));
//   if (req.method == "OPTIONS") { //   res.header("Access-Control-Allow-Methods", "*"); //   res.header("Access-Control-Allow-Headers", "*"); //   res.header("Access-Control-Allow-Origin", "http://localhost:5500"); // server.use((req, res, next) => {
//     return res.sendStatus(200);
//   }
//   next();
// });
server.use(bodyParser.json());

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

//for all requests related to product, redirect to product  routes.
server.use("/api/products", jwtAuth, productRouter);

//for all requests related to cartItems
server.use("/api/carts", jwtAuth, cartRouter);

//for all requests related to user routes.
server.use("/api/users", userRouter);

//3.Default request handler
server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce APIs");
});

//4.Middlware to handle 404 request
server.use((req, res) => {
  res
    .status(404)
    .send(
      "API not found. Please check our documentation for more information at localhost:3000/api-docs"
    );
});

//5.Server Specify
server.listen(3000, () => {
  console.log("Server is listenning on port 3000");
  connectToMongoDB();
});
