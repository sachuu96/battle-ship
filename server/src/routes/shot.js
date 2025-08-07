import express from "express";
import { shotCreationSchema } from "../schemaValidation.js";
import { filterCell } from "../service/cellService.js";
import { create as createShot, getHitCount } from "../service/shotService.js";
import { filter as filterPlayer } from "../service/playerService.js";

const shotRouter = express.Router();

shotRouter.post("/:playerId", async (req, res) => {
  try {
    const playerId = parseInt(req.params.playerId);
    const xCordinate = parseInt(req.body.x);
    const yCordinate = parseInt(req.body.y);
    const { validationError } = shotCreationSchema.validate({
      playerId,
      xCordinate,
      yCordinate,
    });
    if (validationError) {
      throw { message: error, statusCode: 400 };
    }
    // TODO: decrypt if needed.
    const gameId = parseInt(req.headers.session);

    // get oponent's player id
    const playersOfCurrentGame = await filterPlayer({ gameId });

    const opponentId = playersOfCurrentGame.filter(
      (player) => player.id !== playerId
    )[0].id;

    // fetch cell details where player id is oponent's id
    const cell = await filterCell({
      X: xCordinate,
      Y: yCordinate,
      ownedByPlayerId: opponentId,
    });

    const shotData = {
      status: cell ? "hit" : "missed",
      playerId,
      cellId: cell ? cell.id : null,
    };

    const shot = await createShot(shotData);

    res.send(shot).status(200);
  } catch (error) {
    console.error(`Error while creating ships`, error);
    throw error;
  }
});

shotRouter.get("/:playerId", async (req, res) => {
  try {
    const playerId = parseInt(req.params.playerId);
    const status = req.query.status;

    const count = await getHitCount(playerId,status);
    res.send(count).status(200);
  } catch (error) {
    console.error("error while counting hits:", error);
    throw error;
  }
});
// TODO: When checking game status - player id and game id are already in the token
// get count of cells -  group by ship id where status is marked as "hit"
// if the ship type is "battle" cell count should be 4
// if the ship type is "destroyer" cell count should be at least one - assuming one hit is enough to sync a destroyer ship

// when above conditions met - set the status of ship to "sunk"
// if the given player's all the ship's status are "sunk" - that player looses (other player wins)
export default shotRouter;
