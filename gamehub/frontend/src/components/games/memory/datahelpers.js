import { StyleSheet, css } from 'aphrodite';
import { bounceInUp, bounceInDown, fadeOutLeft, fadeOutRight, zoomIn, zoomOut, flipInY, flipOutY } from 'react-animations'
import { delay } from 'q';

export const cards = () => {
  let suits = ["C", "H", "S", "D"]
  let cardnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

  return {
    suits: suits,
    cardnumbers: cardnumbers

  }
}

export const memoryCards = () => {

  let cards1 = cards()
  let cardsMapped = []
  cards1.cardnumbers.forEach(card => {
    cardsMapped.push(`${card}${cards1.suits[0]}`)
    cardsMapped.push(`${card}${cards1.suits[1]}`)
    cardsMapped.push(`${card}${cards1.suits[2]}`)
    cardsMapped.push(`${card}${cards1.suits[3]}`)
  })
  // cards1.suits.forEach(suit => {
  //   cards1.cardnumbers.forEach(card => {
  //     cardsMapped.push(`${card}${suit}`)
  //   })
  return cardsMapped
}

export const getcookie = (cb) => {

  document.cookie.split(";").forEach(cookie => {
    name = cookie.split("=")[0].trim()
    if (name == "gameid") {
      cb(cookie.split("=")[1])
    }
  })
}

export const styles = StyleSheet.create({

  fadeOutLeft: {
    animationName: fadeOutLeft,
    animationDuration: '3s',

  },
  fadeOutRight: {
    animationName: fadeOutRight,
    animationDuration: '3s',
  },
  zoomIn: {
    animationName: zoomIn,
    animationDuration: '1s',

  },
  flipInY: {
    animationName: flipInY,
    animationDuration: '1s',

  },
  flipOutY: {
    animationName: flipOutY,
    animationDuration: '1s',

  },
  zoomOut: {
    animationName: zoomOut,
    animationDuration: '3s',

  },
  bounceInUp: {
    animationName: bounceInUp,
    animationDuration: '1s'
  },
  bounceInDown: {
    animationName: bounceInDown,
    animationDuration: '1s'
  },
  betblock: {
    width: "7%",
    marginLeft: "20%",
    marginTop: "10%",
  },
  betblockSpinner: {
    marginTop: "30%",
    marginLeft: "20%",
    height: "4rem",
    width: "4rem"
  },
  zoomInOnly: {
    animationName: zoomIn,
    animationDuration: '2s',

  },
  zoomOutOnly: {
    animationName: zoomIn,
    animationDuration: '2s'

  },
  pointsMemory: {
    marginLeft: "19%",
    fontWeight: "bold",

  }

})

export const memoryGamePlay = (payload) => {
  console.log(payload)
  let cards;
  let gameplay = {
    name: payload.name,
    gameid: payload.id,
    roundid: 0,
    playerdata: {},
    faceupCards: [],
    turnPlayer: [],
    turns: [],
    previous: [0, 0],
    status: payload.status,
    cards: []

  }


  let players = payload.game.map(value => {

    gameplay.playerdata[value.player.username] = {
      points: 0,
      chances: 0
    }
    return value.player.username
  })


  if (payload.extras) {
    cards = payload.extras.split("[")[1].split("]")[0].replace(/'/g, "").replace(/ /g, "").split(",")
  }

  if (payload.memoryrounds) {
    payload.memoryrounds.forEach(round => {
      gameplay.roundid = round.id
      if (round.turns && round.turns[0]) {

        gameplay.turns.push(round.turns[0].action)
        if (round.turns[1]) {
          gameplay.turns.push(round.turns[1].action)
          console.log(cards[round.turns[1].action])
          if (cards[round.turns[0].action] == cards[round.turns[1].action]) {
            gameplay.faceupCards.push(round.turns[0].action)
            gameplay.faceupCards.push(round.turns[1].action)
          }
        }

        gameplay.turnPlayer.push(round.turns[0].player.username)
      }

    })
  }

  // if (gameplay.turns[0]) {
  //   for (var i = 0; i < gameplay.turns.length; i += 2) {
  //     console.log(i)

  //     if (cards[gameplay.turns[i]] == cards[gameplay.turns[i + 1]]) {
  //       gameplay.faceupCards.push(turns[i])
  //       gameplay.faceupcards.push(turns[i + 1])
  //     }
  //     console.log(gameplay.faceupCards)
  //   }

  if (gameplay.turns.length % 2 == 1) {
    gameplay.faceupCards.push(gameplay.turns[gameplay.turns.length - 1])
  }


  // }

  console.log("cant get here")


  gameplay.cards = cards
  return {
    gameplay
  }

}






