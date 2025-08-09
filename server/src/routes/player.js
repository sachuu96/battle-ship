import express from "express";
const playerRouter = express.Router();

import { filter } from "../service/playerService.js";

playerRouter.get("/", async (req, res) => {
  try {
    const gameId = req.session;

    const players = await filter({ gameId });
    res.send(players).status(200);
  } catch (error) {
    console.error("error while counting hits:", error);
    throw error;
  }
});

export default playerRouter;
