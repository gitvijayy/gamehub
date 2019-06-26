
export const cards = () => {
  let suits = ["C", "H", "S", "D"]
  let cardnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  let cardmap = [...cardnumbers, ...cardnumbers, ...cardnumbers, ...cardnumbers]

  return {
    suits: suits,
    cardnumbers: cardnumbers,
    cardmap: cardmap
  }
}

export const defaultgame = (payload) => {
  let gameplay = { roundid: [], prizeCard: [], players: {} }
  let players = payload.players.map(value => {
    gameplay.players[value.player.username] = []
    return value.player.username
  })
  console.log(gameplay)
  let rounds = []


  payload.rounds.forEach(value => {
    let action = []
    value.turns.forEach((element, index) => {

      if (index < 2) {
        gameplay.players[players[index]].push(element.action)
      }
    })
    gameplay.roundid.push(value.id)
    gameplay.prizeCard.push(value.prizeCard)

  })
  return {

    gameplay: gameplay,
    cards: cards()
  }
}


