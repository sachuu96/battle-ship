import { prisma } from "../db.js";

export const create = async () => {
  try {
    const game = await prisma.game.create({ data: { status: "IN_PROGRESS" } });
    if (!game) throw { statusCode: 400, message: "game not created" };
    return game;
  } catch (error) {
    console.error("Error while creating game:", error);
    throw error;
  }
};

export const filterById = async (filter) => {
  try {
    const players = await prisma.game.findUnique({ where: filter });
    if (!players)
      throw { statusCode: 400, message: `player(s) not found : ${{ filter }}` };
    return players;
  } catch (error) {
    console.error("Error while filtering player(s):", error);
    throw error;
  }
};
