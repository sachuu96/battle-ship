import {
  create as createGame,
  filterGame,
} from "../service/gameService.js";
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

export async function filterGamesHandler(req, res, next) {
  try {
    const { status } = req.query;
    const id = req.session;

    const filter = {
      id,
      ...(status !== undefined && { status }),
    };

    const game = await filterGame(filter);

    res.send(game).status(200);
  } catch (error) {
    next(error);
  }
}
