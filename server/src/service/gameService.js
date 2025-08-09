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
    const game = await prisma.game.findUnique({ where: filter });
    if (!game)
      throw { statusCode: 400, message: `game not found : filter=${ filter }` };
    return players;
  } catch (error) {
    console.error("Error while fetcing game):", error);
    throw error;
  }
};
