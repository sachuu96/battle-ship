import { prisma } from "../db.js";

export const create = async ({Xcoordinate, YCoordinate, playerId, shipId}) => {
  try {
    const cell = await prisma.cell.create({
      data: {
        X: Xcoordinate,
        Y: YCoordinate,
        ownedByPlayerId: playerId,
        shipId,
      },
    });
    if (!cell)
      throw {
        statusCode: 400,
        message: `cell not created : ${{ Xcoordinate }} : ${{ YCoordinate }} : ${{
          playerId,
        }} : ${{ shipId }}`,
      };
    return cell;
  } catch (error) {
    console.error("Error while creating cell:", error);
    throw error;
  }
};

export const filterCell = async (filter) => {
  try {
    const cell = await prisma.cell.findUnique({
      where: { X_Y_ownedByPlayerId:  filter  },
    });
    return cell;
  } catch (error) {
    console.error("Error while fetching cell:", error);
    throw error;
  }
};
