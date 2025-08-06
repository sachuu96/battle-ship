import { prisma } from "../db.js";

export const create = async (gameId) => {
  try {
    const player = await prisma.player.create({
        data:{
            gameId
        }
    });
    if (!player) throw { statusCode: 400, message: `player not created : ${{gameId}}` };
    return player;
  } catch (error) {
    console.error("Error while creating player:", error);
    throw error;
  }
};