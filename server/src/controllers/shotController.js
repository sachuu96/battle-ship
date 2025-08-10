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
