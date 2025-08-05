import express from "express";
import { getAllUsers } from "../service/userService.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.send(users).status(200);
});

export default userRouter;
