export const defaultgame = (payload) => {
  let playerActions = { roundid: [], prizeCard: [], players: {} }
  let players = payload.players.map(value => {
    playerActions.players[value.player.username] = []
    return value.player.username
  })
  console.log(playerActions)
  let rounds = []


  payload.rounds.forEach(value => {
    let action = []
    value.turns.forEach((element, index) => {

      if (index < 2) {
        playerActions.players[players[index]].push(element.action)
      }
    })
    playerActions.roundid.push(value.id)
    playerActions.prizeCard.push(value.prizeCard)

  })



  // console.log(playerActions)






  return {

    playerActions: playerActions
  }
}