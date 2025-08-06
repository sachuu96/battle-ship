import { prisma } from "../db.js";

export const create = async (Xcordinate, YCordinate, playerId, shipId) => {
  try {
    const cell = await prisma.cell.create({
        data:{
            X: Xcordinate,
            Y: YCordinate,
            playerId,
            shipId,
            status: 'intact'
        }
    });
    if (!cell) throw { statusCode: 400, message: `cell not created : ${{Xcordinate}} : ${{YCordinate}} : ${{playerId}} : ${{shipId}}` };
    return cell;
  } catch (error) {
    console.error("Error while creating cell:", error);
    throw error;
  }
};


