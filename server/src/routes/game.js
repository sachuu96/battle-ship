import express from "express";
import { createGameWithPlayersAndShips } from "../service/gameService.js";

const gameRouter = express.Router();

gameRouter.post("/", async (req, res) => {
  const game = await createGameWithPlayersAndShips();
  res.send(game).status(200);
});

export default gameRouter;
