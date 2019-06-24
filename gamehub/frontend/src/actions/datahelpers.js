export const defaultgame = (payload) => {

  let players = payload.players.map(value => {
    return value.player.username
  })
  let playerActions = []
  let rounds = []
  payload.rounds.forEach(value => {
    let action = []
    value.turns.forEach(element => {
      action.push(element.action)
    })
    rounds.push({ id: value.id, prizeCard: value.prizeCard })
    playerActions.push(action)
  })
  let data = {
    gameid: payload.id,
    status: payload.status,
    players: players,
    rounds: rounds,
    playerActions: playerActions
  }
  return data
}