//1.Import Expresss
import express from "express";

//2.Create Server
const server = express();

//3.Default request handler
server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce APIs");
});

//4.Server Specify
server.listen(3000, () => {
  console.log("Server is listenning on port 3000");
});
