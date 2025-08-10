import { filter } from "../service/playerService.js";
import { filterCell } from "../service/cellService.js";
import { create as createShot, getHitCount } from "../service/shotService.js";
import { updateGameStatus } from "../service/gameService.js";

import { shotStatus } from "../const.js";

export async function createShotHandler({
  gameId,
  playerId,
  xCoordinate,
  yCoordinate,
}) {
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

    // check shot count of plater id
    const hitCount = await getHitCount(playerId);
    if (hitCount === 10) {
      await updateGameStatus(gameId);
    }
    return await createShot(shotData);
  } catch (error) {
    throw error;
  }
}
