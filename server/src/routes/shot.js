import express from "express";
import { shotCreationSchema } from "../schemaValidation.js";
import { filterCell } from "../service/cellService.js";
import {
  create as createShot,
  getShotCount,
  getAllShots,
} from "../service/shotService.js";
import { filter as filterPlayer } from "../service/playerService.js";

const shotRouter = express.Router();

shotRouter.post("/:playerId", async (req, res) => {
  try {
    const playerId = parseInt(req.params.playerId);
    const xCoordinate = parseInt(req.body.x);
    const yCoordinate = parseInt(req.body.y);
    const { validationError } = shotCreationSchema.validate({
      playerId,
      xCoordinate,
      yCoordinate,
    });
    if (validationError) {
      throw { message: error, statusCode: 400 };
    }

    const gameId = req.session;

    // get oponent's player id
    const playersOfCurrentGame = await filterPlayer({ gameId });

    const opponentId = playersOfCurrentGame.filter(
      (player) => player.id !== playerId
    )[0].id;

    // fetch cell details where player id is oponent's id
    const cell = await filterCell({
      X: xCoordinate,
      Y: yCoordinate,
      ownedByPlayerId: opponentId,
    });

    const shotData = {
      status: cell ? "hit" : "missed",
      playerId,
      cellId: cell ? cell.id : null,
      cellCoordinates: { x: xCoordinate, y: yCoordinate },
    };

    const shot = await createShot(shotData);
    res.send({ status: shot.status, x: xCoordinate, y: yCoordinate }).status(200);
  } catch (error) {
    console.error(`Error while creating ships`, error);
    throw error;
  }
});

shotRouter.get("/:playerId/count", async (req, res) => {
  try {
    const playerId = parseInt(req.params.playerId);
    // TODO: Do I need this as a query?
    // const status = req.query.status;

    const shots = await getShotCount(playerId);
    res.send(shots).status(200);
  } catch (error) {
    console.error("error while counting hits:", error);
    throw error;
  }
});

shotRouter.get("/:playerId", async (req, res) => {
  try {
    const playerId = parseInt(req.params.playerId);

    const shots = await getAllShots(playerId);
    res.send(shots).status(200);
  } catch (error) {
    console.error("error while fetching shots:", error);
    throw error;
  }
});

export default shotRouter;
