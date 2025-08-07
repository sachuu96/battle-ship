// TODO: POST - recieve cordinate sets for 3 ships from the player - game id and player id are already in the token
// generate 3 ships and 10 cells based on use input - do request body validation

// TODO: PUT - player id is in token
// check if user given X and Y cordinates have a ship_id
// if yes - mark the cell as "hit"
// if no - mark the cell as "miss"
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
