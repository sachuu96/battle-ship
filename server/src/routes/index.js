import express from "express";
const router = express.Router();

import userRouter from "./user.js";
import gameRouter from "./game.js";
import shipRouter from "./ship.js";

router.use("/users", userRouter);
router.use("/games", gameRouter);
router.use("/ships", shipRouter);

export default router;
