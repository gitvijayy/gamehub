
export const cards = () => {
  let suits = ["C", "H", "S", "D"]
  let cardnumbers = [1, 2, 3, 4, 5, 6, 7, 4, 9, 10, 11, 12, 13]
  let cardmap = [...cardnumbers, ...cardnumbers, ...cardnumbers, ...cardnumbers]

  return {
    suits: suits,
    cardnumbers: cardnumbers,
    cardmap: cardmap
  }
}

export const defaultgame = (payload) => {

  let gameplay = { roundid: 1, prizeCard: 0, players: {}, playersbalance: {}, playerpoints: {} }

  let players = payload.players.map(value => {
    gameplay.players[value.player.username] = []
    return value.player.username
  })

  let cards1 = cards()
  let cards2 = cards()


  if (payload.rounds) {
    payload.rounds.forEach((value, index) => {



      if (value.turns[0] && value.turns[0].action) {
        let mappedCard1 = cards1.cardmap[value.turns[0].action - 1]
        let cardPlayed = cards1.cardnumbers.indexOf(mappedCard1)
        if (cardPlayed > -1) {
          cards1.cardnumbers.splice(cardPlayed, 1)
        }
      }

      if (value.turns[1] && value.turns[1].action) {
        let mappedCard2 = cards2.cardmap[value.turns[1].action - 1]
        let cardPlayed = cards2.cardnumbers.indexOf(mappedCard2)
        if (cardPlayed > -1) {
          cards2.cardnumbers.splice(cardPlayed, 1)
        }
      }


      gameplay.roundid = value.id
      gameplay.prizeCard = value.prizeCard

    })
  }


  // gameplay.players.forEach(player=>{
  //   player.push()
  // })

  gameplay.players[players[0]] ? gameplay.players[players[0]].push(cards1.cardnumbers) : false
  gameplay.players[players[1]] ? gameplay.players[players[1]].push(cards2.cardnumbers) : false


  return {
    gameplay: gameplay,
    cards: cards()
  }
}





