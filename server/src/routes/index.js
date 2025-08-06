import express from "express";
const router = express.Router();

import userRouter from "./user.js";
import gameRouter from "./game.js";

router.use("/users", userRouter);
router.use("/games", gameRouter);

export default router;
