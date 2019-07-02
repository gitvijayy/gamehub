
export const cards = () => {
  let suits = ["C", "H", "S", "D"]
  let cardnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

  return {
    suits: suits,
    cardnumbers: cardnumbers

  }
}

export const defaultgame = (payload) => {

  let gameplay = {
    gameid: 0,
    roundid: 0,
    prizeCard: 0,
    players: {},
    playerpoints: {},
    current: [0, 0],
    animate: false,
    suits: [],
    previous: [0, 0, 0]
  }

  let players = payload.players.map(value => {
    gameplay.players[value.player.username] = []
    gameplay.playerpoints[value.player.username] = 0
    return value.player.username
  })

  let cards1 = cards()
  let cards2 = cards()
  gameplay.suits = cards1.suits

  if (payload.rounds) {
    payload.rounds.forEach((value, index) => {
      let player1action = 0
      let player2action = 0


      if (value.turns[0] && value.turns[0].action) {
        let cardPlayed = cards1.cardnumbers.indexOf(value.turns[0].action)
        if (cardPlayed > -1) {
          cards1.cardnumbers.splice(cardPlayed, 1)
        }
        player1action = value.turns[0].action
        gameplay.animate = false

      }

      if (value.turns[1] && value.turns[1].action) {
        let cardPlayed = cards2.cardnumbers.indexOf(value.turns[1].action)
        if (cardPlayed > -1) {
          cards2.cardnumbers.splice(cardPlayed, 1)
        }
        player2action = value.turns[1].action
        gameplay.animate = true
      }

      if (player1action > player2action && player2action) {
        gameplay.playerpoints[players[0]] += value.prizeCard
      } else if (player2action > player1action) {
        gameplay.playerpoints[players[1]] += value.prizeCard
      }

      if (index == (payload.rounds.length - 1)) {
        gameplay.current[0] = player1action
        gameplay.current[1] = player2action

      }

      if ((payload.rounds.length - 2) >= 0 && index == (payload.rounds.length - 2)) {
        gameplay.previous[0] = player1action
        gameplay.previous[1] = player2action
        gameplay.previous[2] = value.prizeCard
      }

      gameplay.roundid = value.id
      gameplay.prizeCard = value.prizeCard
    })
  }

  gameplay.players[players[0]] ? gameplay.players[players[0]].push(cards1.cardnumbers) : false
  gameplay.players[players[1]] ? gameplay.players[players[1]].push(cards2.cardnumbers) : false
  gameplay.gameid = payload.id

  return {
    gameplay

  }
}

export const getcookie = (cb) => {
  document.cookie.split(";").forEach(cookie => {
    name = cookie.split("=")[0].trim()
    if (name == "gameid") {
      cb(cookie.split("=")[1])
    }
  })
}





