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
