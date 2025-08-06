import express from "express";

const shipRouter = express.Router();

import { shipCreationSchema } from "../schemaValidation.js";
import { create as createShip } from "../service/shipService.js";
import { create as createCell } from "../service/cellService.js";

shipRouter.post("/:playerId", async (req, res) => {
  try {
    const playerId = parseInt(req.params.playerId);
    const ships = req.body.ships;
    const { validationError } = shipCreationSchema.validate({
      playerId,
      ships,
    });
    if (validationError) {
      throw { message: error, statusCode: 400 };
    }
    // TODO: decrypt if needed.
    const gameId = parseInt(req.headers.session);

    // create ship cordinates - cells
    const createdShips = await Promise.all(
      ships.map(async (ship) => {
        const { id } = await createShip({ playerId, gameId, type: ship.type });

        const createdCells =  await Promise.all(
            ship.coordinates.map(async ([xCordinate, yCordinate])=>{
                return createCell(xCordinate, yCordinate, playerId, id);
            })
        )
        return { shipId: id, cells: createdCells };
      })
    );

    res.send({ createdShips }).status(200);
  } catch (error) {
    console.error(`Error while creating ships`, error);
    throw error;
  }
});

export default shipRouter;
