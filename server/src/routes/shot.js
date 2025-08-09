import express from "express";
import { shotCreationSchema } from "../schemaValidation.js";
import { getShotCount, getAllShots } from "../service/shotService.js";
import { createShotHandler } from "../controllers/shotController.js";

const shotRouter = express.Router();

shotRouter.post("/:playerId", async (req, res, next) => {
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
      next({ message: error, statusCode: 400 });
    }

    const gameId = req.session;

    const shot = await createShotHandler({ gameId, playerId , xCoordinate, yCoordinate});
    res
      .send({ status: shot.status, x: xCoordinate, y: yCoordinate })
      .status(200);
  } catch (error) {
    console.error(`Error while creating ships`, error);
    next(error);
  }
});

shotRouter.get("/:playerId/count", async (req, res) => {
  try {
    const playerId = parseInt(req.params.playerId);

    const shots = await getShotCount(playerId);
    // TODO: when hit count (of shot table) is 10 update the game status to COMPLETED
    res.send(shots).status(200);
  } catch (error) {
    console.error("error while counting hits:", error);
    next(error);
  }
});

shotRouter.get("/:playerId", async (req, res) => {
  try {
    const playerId = parseInt(req.params.playerId);

    const shots = await getAllShots(playerId);
    res.send(shots).status(200);
  } catch (error) {
    console.error("error while fetching shots:", error);
    next(error);
  }
});

export default shotRouter;
