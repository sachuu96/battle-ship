import { prisma } from "../db.js";

export const create = async (payload) => {
  try {
    const shot = await prisma.shot.create({ data: payload });
    if (!shot) throw { statusCode: 400, message: "shot not created" };
    return shot;
  } catch (error) {
    console.error("Error while creating shot:", error);
    throw error;
  }
};

export const getHitCount = async (playerId, status) => {
  try {
    const hitCount = await prisma.shot.count({
      where: {
        playerId,
        status,
      },
    });
    return hitCount;
  } catch (error) {
    console.error("Error while counting hits:", error);
    throw error;
  }
};

export const getAllShots = async (playerId) => {
  try {
    const shots = await prisma.shot.findMany({
      where: {
        playerId,
      },
    });
    const formattedShots = shots.map(({ status, cellCordinates: { x, y } }) => {
      return { status, x, y };
    });
    return formattedShots;
  } catch (error) {
    console.error("Error while fetching shots:", error);
    throw error;
  }
};
