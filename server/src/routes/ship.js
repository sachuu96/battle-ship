import express from "express";

const shipRouter = express.Router();

import { shipCreationSchema } from "../schemaValidation.js";
import {
  create as createShip,
  getPlayerShipsWithCoordinates,
} from "../service/shipService.js";
import { create as createCell } from "../service/cellService.js";

shipRouter.post("/:playerId", async (req, res) => {
  try {
    const playerId = parseInt(req.params.playerId);
    const inputShips = req.body.ships;

    // Convert coordinate objects { x, y } to tuples [x, y] as numbers
    const ships = inputShips.map((ship) => ({
      type: ship.type,
      coordinates: ship.coordinates.map((coord) => [
        parseInt(coord.x, 10),
        parseInt(coord.y, 10),
      ]),
    }));

    // Validate after transformation
    const { validationError } = shipCreationSchema.validate({
      playerId,
      ships,
    });

    if (validationError) {
      throw { message: validationError.message, statusCode: 400 };
    }

    const gameId = req.session;

    await Promise.all(
      ships.map(async (ship) => {
        const { id } = await createShip({ playerId, gameId, type: ship.type });

        const createdCells = await Promise.all(
          ship.coordinates.map(async ([x, y]) => {
            return createCell({
              Xcoordinate: x,
              YCoordinate: y,
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
