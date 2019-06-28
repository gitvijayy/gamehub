
export const cards = () => {
  let suits = ["C", "H", "S", "D"]
  let cardnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  // let cardmap = [...cardnumbers, ...cardnumbers, ...cardnumbers, ...cardnumbers]

  return {
    suits: suits,
    cardnumbers: cardnumbers
    // cardmap: cardmap
  }
}

export const defaultgame = (payload) => {

  let gameplay = { gameid: 0, roundid: 1, prizeCard: 0, players: {}, playersbalance: {}, playerpoints: {} }

  let players = payload.players.map(value => {
    gameplay.players[value.player.username] = []
    gameplay.playerpoints[value.player.username] = 0
    return value.player.username
  })

  let cards1 = cards()
  let cards2 = cards()
  // let player1points = 0
  // let player2points = 0


  if (payload.rounds) {
    payload.rounds.forEach((value, index) => {
      let player1action = 0
      let player2action = 0


      if (value.turns[0] && value.turns[0].action) {
        // let mappedCard1 = cards1.cardmap[value.turns[0].action - 1]
        let cardPlayed = cards1.cardnumbers.indexOf(value.turns[0].action - 1)
        if (cardPlayed > -1) {
          cards1.cardnumbers.splice(cardPlayed, 1)
        }
        player1action = value.turns[0].action
      }

      if (value.turns[1] && value.turns[1].action) {
        // let mappedCard2 = cards2.cardmap[value.turns[1].action - 1]
        let cardPlayed = cards2.cardnumbers.indexOf(value.turns[1].action - 1)
        if (cardPlayed > -1) {
          cards2.cardnumbers.splice(cardPlayed, 1)
        }
        player1action = value.turns[1].action
      }

      // if (value.turns[0].action > value.turns[1].action) {

      // } else if(value.turns[0].action < value.turns[1].action){

      // }
      if (player1action > player2action) {
        gameplay.playerpoints[players[0]] += value.prizeCard
      } else if (player2action > player1action) {
        gameplay.playerpoints[players[1]] += value.prizeCard
      }



      gameplay.roundid = value.id
      gameplay.prizeCard = value.prizeCard

    })
  }


  // gameplay.players.forEach(player=>{
  //   player.push()
  // })
  // console.log(cards1.cardnumbers)
  gameplay.players[players[0]] ? gameplay.players[players[0]].push(cards1.cardnumbers) : false
  gameplay.players[players[1]] ? gameplay.players[players[1]].push(cards2.cardnumbers) : false
  gameplay.gameid = payload.id
  // gameplay.players[0] ? gameplay.players[0].push(cards1.cardnumbers) : false
  // gameplay.players[1] ? gameplay.players[1].push(cards2.cardnumbers) : false

  return {
    gameplay: gameplay,
    cards: cards()
  }
}





