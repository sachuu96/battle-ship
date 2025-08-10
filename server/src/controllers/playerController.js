import { filter } from "../service/playerService.js";

export async function getPlayersHandler(req, res, next) {
  try {
    const gameId = req.session;

    const players = await filter({ gameId });
    // get opponent's player id
    const formattedPlayers = players.map((player,index)=>{
      return {
        ...player,
        opponentId: index === 0 ? players[1].id : players[0].id
      }
    })
    res.send(formattedPlayers).status(200);
  } catch (error) {
    next(error);
  }
}
