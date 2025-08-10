import { prisma } from "../db.js";
import { gameStatus } from "../const.js";

export const create = async () => {
  try {
    const game = await prisma.game.create({
      data: { status: gameStatus.IN_PROGRESS },
    });
    if (!game) throw { statusCode: 400, message: "game not created" };
    return game;
  } catch (error) {
    console.error("Error while creating game:", error);
    throw error;
  }
};

export const filterGame = async (filter) => {
  try {
    const games = await prisma.game.findMany({
      where: Object.keys(filter).length ? filter : undefined,
    });

    return games;
  } catch (error) {
    console.error("Error while fetcing game):", error);
    throw error;
  }
};

export const updateGameStatus = async (gameId) => {
  try {
    const updatedGame = await prisma.game.update({
      where: { id: gameId },
      data: { status: gameStatus.COMPLETED },
    });

    return updatedGame;
  } catch (error) {
    console.error("Error while updating game status:", error);
    throw error;
  }
};
