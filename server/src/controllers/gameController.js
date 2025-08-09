import { create as createGame, filterById } from "../service/gameService.js";
import { create as createPlayer } from "../service/playerService.js";

export async function createGameHandler(req, res, next) {
  try {
    const game = await createGame();
    const players = await Promise.all([
      await createPlayer(game.id),
      await createPlayer(game.id),
    ]);

    res.send({ players, gameId: game.id }).status(200);
  } catch (error) {
    next(error);
  }
}

export async function getGameHandler(req, res, next) {
  try {
    const gameId = parseInt(req.headers.session);
    if (!gameId) res.send(null).status(200);
    const game = await filterById({ id: gameId });

    res.send(game).status(200);
  } catch (error) {
    next(error);
  }
}
