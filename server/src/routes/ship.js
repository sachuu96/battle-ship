import express from "express";

const shipRouter = express.Router();

import { shipCreationSchema } from "../schemaValidation.js";
import {
  getPlayerShipsWithCoordinates,
  createShipHandler,
} from "../controllers/shipController.js";

shipRouter.post("/:playerId", async (req, res, next) => {
  try {
    const playerId = parseInt(req.params.playerId);
    const inputShips = req.body.ships;
    const gameId = req.session;

    const { validationError } = shipCreationSchema.validate({
      playerId,
      inputShips,
    });

    if (validationError) {
      return res.status(400).json({ error: validationError.message });
    }

    const shipPlacementCoordinates = await createShipHandler({
      playerId,
      gameId,
      inputShips,
    });

    res.status(200).send({ shipPlacementCoordinates });
  } catch (error) {
    console.error(`Error while creating ships`, error);
    next(error);
  }
});

shipRouter.get("/:playerId", async (req, res, next) => {
  try {
    const playerId = parseInt(req.params.playerId);
    const gameId = req.session;
    const shipPlacementCoordinates = await getPlayerShipsWithCoordinates({
      playerId,
      gameId,
    });
    res.status(200).send({ shipPlacementCoordinates });
  } catch (error) {
    console.error(`Error while creating ships`, error);
    next(error);
  }
});

export default shipRouter;
