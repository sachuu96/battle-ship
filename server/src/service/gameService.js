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
