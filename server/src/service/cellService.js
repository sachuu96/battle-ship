import { prisma } from "../db.js";

// TODO: convert the params to single object
export const create = async (Xcordinate, YCordinate, playerId, shipId) => {
  try {
    const cell = await prisma.cell.create({
      data: {
        X: Xcordinate,
        Y: YCordinate,
        ownedByPlayerId: playerId,
        shipId,
      },
    });
    if (!cell)
      throw {
        statusCode: 400,
        message: `cell not created : ${{ Xcordinate }} : ${{ YCordinate }} : ${{
          playerId,
        }} : ${{ shipId }}`,
      };
    return cell;
  } catch (error) {
    console.error("Error while creating cell:", error);
    throw error;
  }
};

// this function is used to create ship placement for bot player
// TODO: come up with a better randomization logic for cordinates
export const getShipCoordinates = (shipType, index) => {
  if (shipType === "battle") {
    // 4 cells in a vertical line
    return [
      [5, 0],
      [5, 1],
      [5, 2],
      [5, 3],
    ];
  } else {
    // 3 cells in a vertical line starting from row = index + 1
    return [
      [index + 1, 0],
      [index + 1, 1],
      [index + 1, 2],
    ];
  }
};

export const filterCell = async (filter) => {
  try {
    const cell = await prisma.cell.findUnique({
      where: { X_Y_ownedByPlayerId:  filter  },
    });
    return cell;
  } catch (error) {
    console.error("Error while filtering cell:", error);
    throw error;
  }
};
