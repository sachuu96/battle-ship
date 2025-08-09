import { prisma } from "../db.js";

export const create = async (gameId) => {
  try {
    const player = await prisma.player.create({
      data: {
        gameId,
      },
    });
    if (!player)
      throw { statusCode: 400, message: `player not created : gameId=${ gameId }` };
    return player;
  } catch (error) {
    console.error("Error while creating player:", error);
    throw error;
  }
};

export const filter = async (filter) => {
  try {
    const players = await prisma.player.findMany({ where: filter });
    if (!players || players.length === 0)
      throw { statusCode: 400, message: `player(s) not found : filter=${ filter }` };
    return players;
  } catch (error) {
    console.error("Error while filtering player(s):", error);
    throw error;
  }
};
