import { prisma } from "../db.js";

export const create = async () => {
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
  try {
    // return await prisma.$transaction(async (tx) => {
    //   // Create Game
    //   const game = await tx.game.create({
    //     data: {},
    //   });
    
    //   const shipTypes = ["battle", "destroyer", "destroyer"];
    
    //   const players = await Promise.all(
    //     Array.from({ length: 2 }).map(async (_, playerIndex) => {
    //       const player = await tx.player.create({
    //         data: {
    //           gameId: game.id,
    //         },
    //       });
    
    //       // Create 3 ships for the player
    //       await Promise.all(
    //         shipTypes.map((type, shipIndex) => {
    //           // Additional properties only for the first player (bot player) (index 0) 
    //           if (playerIndex === 0 && type === "battle") {
    //             return tx.ship.create({
    //               data: {
    //                 type,
    //                 gameId: game.id,
    //                 playerId: player.id,
    //                 // Add extra properties for first player's ships here (if model supports)
    //                 // For example:
    //                 Cell: {
    //                   create: [
    //                     { X: shipIndex * 2, Y: 0, status: "intact" },
    //                     { X: shipIndex * 2 + 1, Y: 0, status: "intact" },
    //                   ],
    //                 },
    //               },
    //             });
    //           } else {
    //             return tx.ship.create({
    //               data: {
    //                 type,
    //                 gameId: game.id,
    //                 playerId: player.id,
    //               },
    //             });
    //           }
    //         })
    //       );
    
    //       return player;
    //     })
    //   );
    
    //   return players[1].id;
    // });

    const players = await prisma.$transaction(async (tx) => {
      // Create Game
      const game = await tx.game.create({
        data: {},
      });

      const shipTypes = ["battle", "destroyer", "destroyer"];

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
      
      return players;
    });

    // assuming first player is always the bot player - create ship arrangment for that player

    return players;
  } catch (error) {
    console.error("Error while creating game:", error);
    throw error;
  }
};
