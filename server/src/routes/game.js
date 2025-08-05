import express from "express";
import { createGame } from "../service/gameService.js";

const gameRouter = express.Router();

gameRouter.post("/", async (req, res) => {
  const game = await createGame();
  res.send(game).status(200);
});

export default gameRouter;
