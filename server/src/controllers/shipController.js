import { getShipCoordinates, create as createShip } from "../service/shipService.js";
import { create as createCell } from "../service/cellService.js";
import { validateShipCells } from "../util.js";

export async function getPlayerShipsWithCoordinates({ gameId, playerId }) {
  try {
    const shipCoordinates = await getShipCoordinates({ gameId, playerId });
    const flattenShipCoordinates = shipCoordinates.flatMap((ship) =>
      ship.Cell.map((cell) => ({
        shipId: ship.id,
        x: cell.X,
        y: cell.Y,
      }))
    );
    return flattenShipCoordinates;
  } catch (error) {
    throw error;
  }
}

export async function createShipHandler({ inputShips, playerId, gameId }) {
  try {
    for (const ship of inputShips) {
      if (!validateShipCells(ship.coordinates)) {
        throw {
          statusCode: 400,
          message: `Invalid placement for ship type '${ship.type}': cells must be aligned either horizontally or vertically and be adjacent. Make sure cells are not overlaped`,
        };
      }
    }

    await Promise.all(
      inputShips.map(async (ship) => {
        const { id } = await createShip({ playerId, gameId, type: ship.type });

        const createdCells = await Promise.all(
          ship.coordinates.map(async ({ x, y }) => {
            return createCell({
              Xcoordinate: parseInt(x),
              YCoordinate: parseInt(y),
              playerId,
              shipId: id,
            });
          })
        );

        return { shipId: id, cells: createdCells };
      })
    );

    return await getPlayerShipsWithCoordinates({
      playerId,
      gameId,
    });
  } catch (error) {
    throw error;
  }
}
