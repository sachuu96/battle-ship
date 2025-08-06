import { prisma } from "../db.js";

export const create = async ({playerId, gameId, type}) => {
  try {
    const ship = await prisma.ship.create({
      data: {
        type,
        playerId,
        gameId,
        isSunk: false,
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

// export const create = async (playerId, gameId) => {
//   try {
//     // TODO: set these to shared constants - enums may be
//     const shipTypes = ["battle", "destroyer", "destroyer"];
//     const ships = await Promise.all(
//       shipTypes.map((type) => {
//         return prisma.ship.create({
//           data: {
//             type,
//             playerId,
//             gameId,
//             isSunk: false,
//           },
//         });
//       })
//     );

//     if (!ships || ships.length === 0)
//       throw {
//         statusCode: 400,
//         message: `ships not created : ${{ gameId }} : ${{ playerId }}`,
//       };
//     return ships;
//   } catch (error) {
//     console.error("Error while creating ships:", error);
//     throw error;
//   }
// };
