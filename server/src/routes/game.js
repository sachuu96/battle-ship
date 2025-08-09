import express from "express";
import { create as createGame, filterById } from "../service/gameService.js";
import { create as createPlayer } from "../service/playerService.js";

const gameRouter = express.Router();

gameRouter.post("/", async (req, res) => {
  try {
    const game = await createGame();
    const players = await Promise.all([
      await createPlayer(game.id),
      await createPlayer(game.id),
    ]);

    res.send({ players, gameId: game.id }).status(200);
  } catch (error) {
    console.error("error while creating game:", error);
    throw error;
  }
});

// TODO: check if this is actually needed
gameRouter.get("/", async (req, res) => {
  try {
    const gameId = parseInt(req.headers.session);
    if (!gameId) res.send(null).status(200);
    const game = await filterById({ id: gameId });
    res.send(game).status(200);
  } catch (error) {
    console.error("error while fetching game details:", error);
    throw error;
  }
});

export default gameRouter;
