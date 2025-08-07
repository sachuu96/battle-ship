import express from "express";
const router = express.Router();

import { sessionValidator } from "../middlewares/sessionValidator.js";
import gameRouter from "./game.js";
import shipRouter from "./ship.js";
import shotRouter from "./shot.js";
import playerRouter from "./player.js";

router.use("/games", gameRouter);
router.use("/ships", sessionValidator, shipRouter);
router.use("/shots", sessionValidator, shotRouter);
router.use("/players", sessionValidator, playerRouter);

export default router;
