import { prisma } from "../db.js";

export const createGame = async () => {
  try {
    const game = await prisma.game.create();
    if (!game) throw { statusCode: 400, message: "game not created" };
    return game;
  } catch (error) {
    console.error("Error while creating game:", error);
    throw error;
  }
};

// TODO: properly wrap this in a try catch block 
// CHECK: what will happen if one if the db call failed?
export const createGameWithPlayersAndShips = async () => {
    return await prisma.$transaction(async (tx) => {
      // Create Game
      const game = await tx.game.create({
        data: {},
      });
  
      const shipTypes = ['battle', 'destroyer', 'destroyer'];
  
      const players = await Promise.all(
        Array.from({ length: 2 }).map(async () => {
          const player = await tx.player.create({
            data: {
              gameId: game.id,
            },
          });
  
          // Create 3 ships for the player
          await Promise.all(
            shipTypes.map((type) =>
              tx.ship.create({
                data: {
                  type,
                  gameId: game.id,
                  playerId: player.id,
                },
              })
            )
          );
  
          return player;
        })
      );
  
      return {
        game,
        players,
      };
    });
  };