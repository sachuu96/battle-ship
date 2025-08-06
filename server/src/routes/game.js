import express from "express";
import { create as createGame } from "../service/gameService.js";
import { create as createPlayer } from '../service/playerService.js';
import { create as createShips} from '../service/shipService.js';
import { create as createCell } from '../service/cellService.js';

const gameRouter = express.Router();

gameRouter.post("/", async (req, res) => {
  const game = await createGame();
  const firstPlayer = await createPlayer(game.id);
  const secondPlayer = await createPlayer(game.id);
  
  // assuming first player is the bot player - therefore create ships for that player
  const shipsOfBotPlayer = await createShips(firstPlayer.id, game.id);

  shipsOfBotPlayer.map(async (ship,index)=>{
    if(ship.type === 'battle'){
      // TODO : come up with a better logic (util function) for bot player's ship placement
      // need to have 4 cells
      await createCell( 5, 0, firstPlayer.id, ship.id);
      await createCell( 5, 1, firstPlayer.id, ship.id);
      await createCell( 5, 2, firstPlayer.id, ship.id);
      await createCell( 5, 3, firstPlayer.id, ship.id);

    }
    else{
      // TODO : come up with a better logic (util function) for bot player's ship placement
      // need to have 3 cells
      await createCell( index+1, 0, firstPlayer.id, ship.id);
      await createCell( index+1, 1, firstPlayer.id, ship.id);
      await createCell( index+1, 2, firstPlayer.id, ship.id);
    }
  })
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
