import express from "express";
import { create as createGame } from "../service/gameService.js";
import { create as createPlayer } from "../service/playerService.js";
import { create as createShip } from "../service/shipService.js";
import {
  create as createCell,
  getShipCoordinates,
} from "../service/cellService.js";

const gameRouter = express.Router();

gameRouter.post("/", async (req, res) => {
  const game = await createGame();
  const firstPlayer = await createPlayer(game.id);
  const secondPlayer = await createPlayer(game.id);

  // assuming first player is the bot player - therefore create ships for that player
  const shipTypes = ["battle", "destroyer", "destroyer"];
  const shipsOfBotPlayer = await Promise.all(
    shipTypes.map(async (type) => {
      return await createShip({
        type,
        playerId: firstPlayer.id,
        gameId: game.id,
      });
    })
  );

  // console.log('shipsOfBotPlayer-',shipsOfBotPlayer)
  // const shipsOfBotPlayer = await createShips(firstPlayer.id, game.id);

  // create ship cordinates - cells
  for (const [index, ship] of shipsOfBotPlayer.entries()) {
    const coords = getShipCoordinates(ship.type, index);
    for (const [x, y] of coords) {
      await createCell(x, y, firstPlayer.id, ship.id);
    }
  }

  // TODO: send this as an encrypted token
  res.send({ playerId: secondPlayer.id, gameId: game.id }).status(200);
});

// TODO: When checking game status - player id and game id are already in the token
// get count of cells -  group by ship id where status is marked as "hit"
// if the ship type is "battle" cell count should be 4
// if the ship type is "destroyer" cell count should be at least one - assuming one hit is enough to sync a destroyer ship

// when above conditions met - set the status of ship to "sunk"
// if the given player's all the ship's status are "sunk" - that player looses (other player wins)
export default gameRouter;
