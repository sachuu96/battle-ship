import { prisma } from "../db.js";

export const create = async (payload) => {
  console.log("payload---", payload);
  try {
    const shot = await prisma.shot.create({ data: payload });
    if (!shot) throw { statusCode: 400, message: "shot not created" };
    return shot;
  } catch (error) {
    console.error("Error while creating shot:", error);
    throw error;
  }
};
