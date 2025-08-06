import express from "express";
const router = express.Router();

import userRouter from "./user.js";
import gameRouter from "./game.js";
import shipRouter from "./ship.js";
import shotRouter from "./shot.js";

router.use("/users", userRouter);
router.use("/games", gameRouter);
router.use("/ships", shipRouter);
router.use("/shots", shotRouter);

export default router;
