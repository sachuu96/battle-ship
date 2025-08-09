import { prisma } from "../db.js";

// export const create = async ({ playerId, gameId, type }) => {
//   try {
//     const ship = await prisma.ship.create({
//       data: {
//         type,
//         playerId,
//         gameId,
//         isSunk: false, // TODO: use this property to mark if the ship is sunk in ship placement board
//       },
//     });

//     if (!ship)
//       throw {
//         statusCode: 400,
//         message: `ship not created : gameId=${gameId} : playerId=${playerId}`,
//       };
//     return ship;
//   } catch (error) {
//     console.error("Error while creating ship:", error);
//     throw error;
//   }
// };

export const createShipsWithCells = async ({ inputShips , playerId , gameId}) => {
  try {
    await Promise.all(
      inputShips.map(async (ship) => {
        const createdShip = await prisma.ship.create({
          data: {
            type: ship.type,
            isSunk: false,
            playerId,
            gameId,
            Cell: {
              create: ship.coordinates.map(({ x, y }) => ({
                X: parseInt(x),
                Y: parseInt(y),
                ownedByPlayerId: playerId,
              })),
            },
          },
          include: { Cell: true },
        });

        return { shipId: createdShip.id, cells: createdShip.Cell };
      })
    );
  } catch (error) {
    throw error;
  }
};

export async function getShipCoordinates({ playerId, gameId }) {
  try {
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
    return shipPlacement;
  } catch (error) {
    console.error(
      `Error while getting ship coordinates ${playerId} ${gameId}:`,
      error
    );
    throw error;
  }
}
