//1.Import Express
import express from "express";
import UserController from "./user.controller.js";

//2.Initialize Express rounter
const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.signUp);
userRouter.post("/signin", userController.signIn);

export default userRouter;
