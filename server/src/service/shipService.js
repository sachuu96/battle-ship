import { prisma } from "../db.js";

export const create = async ({ playerId, gameId, type }) => {
  try {
    const ship = await prisma.ship.create({
      data: {
        type,
        playerId,
        gameId,
        isSunk: false, // TODO: check if this property is actually needed
      },
    });

    if (!ship)
      throw {
        statusCode: 400,
        message: `ship not created : ${{ gameId }} : ${{ playerId }}`,
      };
    return ship;
  } catch (error) {
    console.error("Error while creating ship:", error);
    throw error;
  }
};

function flattenShipCoordinates(shipPlacementCoordinates) {
  return shipPlacementCoordinates.flatMap(ship =>
    ship.Cell.map(cell => ({
      shipId: ship.id,
      x: cell.X,
      y: cell.Y
    }))
  );
}

export async function getPlayerShipsWithCoordinates({playerId, gameId}) {
  const shipPlacement = await prisma.ship.findMany({
    where: {
      playerId,
      gameId,
    },
    select: {
      id: true,
      Cell: {
        select: {
          X: true,
          Y: true,
        },
      },
    },
  });
  return flattenShipCoordinates(shipPlacement)
}
// TODO: may be remove bot player concept and allow for ship placement based on player id