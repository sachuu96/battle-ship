import { filter } from "../service/playerService.js";

export async function getPlayersHandler(req, res, next) {
  try {
    const gameId = req.session;

    const players = await filter({ gameId });
    res.send(players).status(200);
  } catch (error) {
    next(error);
  }
}
