import { prisma } from "../db.js";

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    if (!users) throw { statusCode: 400, message: "no users found" };
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
