import { filter } from "../service/playerService.js";
import { filterCell } from "../service/cellService.js";
import { create as createShot } from "../service/shotService.js";

import { shotStatus } from "../const.js";


export async function createShotHandler({ gameId, playerId, xCoordinate, yCoordinate }) {
  try {
    const playersOfCurrentGame = await filter({ gameId });
    const opponentId = playersOfCurrentGame.filter(
      (player) => player.id !== playerId
    )[0].id;

    // option 1 - TODO: query cell table and update cell status (hit) if there is a record availabe WHERE X == xCoordinate AND  Y == yCoordinate AND gameID == gameId && playerID == playerId
    // when all the cells' status WHERE playerID == playerId  - game ends (update game status to completed)

    // TODO: in front end I should mark cell status in my ship board - ShipBoard component should re-render for this API call

    // Option 2 - get all shots where status is 'hit' AND playerid is opponent's playerId


    // fetch cell details where player id is oponent's id
    const cell = await filterCell({
      X: xCoordinate,
      Y: yCoordinate,
      ownedByPlayerId: opponentId,
    });

    const shotData = {
      status: cell ? shotStatus.HIT : shotStatus.MISSED,
      playerId,
      cellId: cell ? cell.id : null,
      cellCoordinates: { x: xCoordinate, y: yCoordinate },
    };

    return await createShot(shotData);
  } catch (error) {
    throw error;
  }
}
