import express from "express";

const shipRouter = express.Router();

import { shipCreationSchema } from "../schemaValidation.js";
import {
  create as createShip,
  getPlayerShipsWithCoordinates,
} from "../service/shipService.js";
import { create as createCell } from "../service/cellService.js";
import { validateShipCells } from "../util.js";

shipRouter.post("/:playerId", async (req, res) => {
  try {
    const playerId = parseInt(req.params.playerId);
    const inputShips = req.body.ships;

    const { validationError } = shipCreationSchema.validate({
      playerId,
      inputShips,
    });

    if (validationError) {
      return res.status(400).json({ error: validationError.message });
    }

    for (const ship of inputShips) {

      if (!validateShipCells(ship.coordinates)) {
        return res.status(400).json({
          error: `Invalid placement for ship type '${ship.type}': cells must be aligned either horizontally or vertically and be adjacent.`,
        });
      }
    }

    const gameId = req.session;

    await Promise.all(
      inputShips.map(async (ship) => {
        const { id } = await createShip({ playerId, gameId, type: ship.type });

        const createdCells = await Promise.all(
          ship.coordinates.map(async ({x, y}) => {
            return createCell({
              Xcoordinate: parseInt(x), 
              YCoordinate: parseInt(y),
              playerId,
              shipId: id,
            });
          })
        );

        return { shipId: id, cells: createdCells };
      })
    );

    const shipPlacementCoordinates = await getPlayerShipsWithCoordinates({
      playerId,
      gameId,
    });

    res.status(200).send({ shipPlacementCoordinates });
  } catch (error) {
    console.error(`Error while creating ships`, error);
    throw error;
  }
});


shipRouter.get("/:playerId", async (req, res) => {
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
    throw error;
  }
});

export default shipRouter;
