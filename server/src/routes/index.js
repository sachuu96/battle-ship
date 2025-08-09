import express from "express";
const router = express.Router();

import { sessionValidator } from "../middlewares/sessionValidator.js";

import shipRouter from "./ship.js";
import shotRouter from "./shot.js";

import { createGameHandler, getGameHandler } from "../controllers/gameController.js";
import { getPlayersHandler } from "../controllers/playerController.js";

// game rouets
router.post("/games", createGameHandler);
router.get("/games", getGameHandler);

// player routes
router.get("/players", sessionValidator, getPlayersHandler);

// ship routes
router.use("/ships", sessionValidator, shipRouter);

// shot routes
router.use("/shots", sessionValidator, shotRouter);

export default router;
