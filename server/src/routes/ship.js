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

    const createdShips = await Promise.all(
      ships.map(async (ship) => {
        const { id } = await createShip({ playerId, gameId, type: ship.type });

        const createdCells = await Promise.all(
          ship.coordinates.map(async ([x, y]) => {
            return createCell(x, y, playerId, id);
          })
        );

        return { shipId: id, cells: createdCells };
      })
    );

    res.status(200).send({ createdShips });
  } catch (error) {
    console.error(`Error while creating ships`, error);
    // TODO: sending 500 status is good - do the same for rest of the places
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Internal Server Error" });
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
    // TODO: sending 500 status is good - do the same for rest of the places
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
});
// shipRouter.post("/:playerId", async (req, res) => {
//   try {
//     const playerId = parseInt(req.params.playerId);
//     const ships = req.body.ships;
//     const { validationError } = shipCreationSchema.validate({
//       playerId,
//       ships,
//     });
//     if (validationError) {
//       throw { message: error, statusCode: 400 };
//     }
//     const gameId = req.session;

//     // create ship cordinates - cells
//     const createdShips = await Promise.all(
//       ships.map(async (ship) => {
//         const { id } = await createShip({ playerId, gameId, type: ship.type });

//         const createdCells =  await Promise.all(
//             ship.coordinates.map(async ([xCordinate, yCordinate])=>{
//                 return createCell(xCordinate, yCordinate, playerId, id);
//             })
//         )
//         return { shipId: id, cells: createdCells };
//       })
//     );

//     res.send({ createdShips }).status(200);
//   } catch (error) {
//     console.error(`Error while creating ships`, error);
//     throw error;
//   }
// });

export default shipRouter;
