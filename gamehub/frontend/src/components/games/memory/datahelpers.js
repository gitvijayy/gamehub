import { StyleSheet, css } from 'aphrodite';
import { bounceInUp, bounceInDown, fadeOutLeft, fadeOutRight, zoomIn, zoomOut, flipInY, flipOutY, bounceInLeft } from 'react-animations'

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
  },
  bounceInLeft: {
    animationName: bounceInLeft,
    animationDuration: '2s'

  },


})

export const memoryGamePlay = (payload) => {

  let cards;
  let gameplay = {
    name: payload.name,
    gameid: payload.id,
    roundid: 0,
    playerdata: {},
    faceupPlayer: [],
    faceupCards: [],
    turnPlayer: [],
    turns: [],
    previous: [0, 0],
    status: payload.status,
    cards: [],
    memoryAnimation: {
      flip: "",
      src: ["", ""],
      animate: false
    },
    animationReturn: {
      flip: css(styles.zoomIn),
      src: [require(`../../images/blackBack.png`), require(`../../images/blackBack.png`)],
      animate: false
    },



  }


  let players = payload.game.map(value => {
    gameplay.playerdata[value.player.username] = {
      points: 0,
      chances: 0,
      turn: false
    }
    return value.player.username
  })


  if (payload.extras) {
    cards = payload.extras.split("[")[1].split("]")[0].replace(/'/g, "").replace(/ /g, "").split(",")
  }

  if (payload.memoryrounds) {
    payload.memoryrounds.forEach((round, index) => {
      gameplay.roundid = round.id
      if (round.turns && round.turns[0]) {
        gameplay.turns.push(round.turns[0].action)
        if (round.turns[1]) {
          gameplay.turns.push(round.turns[1].action)
          if (cards[round.turns[0].action] == cards[round.turns[1].action]) {
            gameplay.faceupCards.push(round.turns[0].action)
            gameplay.faceupCards.push(round.turns[1].action)
            gameplay.faceupPlayer.push(round.turns[0].player.username)
          }
        }
        gameplay.turnPlayer.push(round.turns[0].player.username)

      }




    })
  }

  if (!gameplay.turns.length) {
    gameplay.memoryAnimation.animate = "startgame"
  }
  if (gameplay.turns.length) {
    let playerTurnCheck = gameplay.turnPlayer[gameplay.turnPlayer.length - 1]
    let lastTurn = [gameplay.turns[gameplay.turns.length - 2], gameplay.turns[gameplay.turns.length - 1]]
    let lastFaceUp = [gameplay.faceupCards[gameplay.faceupCards.length - 2], gameplay.faceupCards[gameplay.faceupCards.length - 1]]



    if (gameplay.turns.length % 2 == 1) {
      gameplay.faceupCards.push(gameplay.turns[gameplay.turns.length - 1])
      gameplay.playerdata[playerTurnCheck].turn = true
    } else {

      if (lastTurn == lastFaceUp) {
        gameplay.playerdata[playerTurnCheck].turn = true

      } else if (players[0] == playerTurnCheck) {

        if (payload.no_of_players > 1) {
          gameplay.playerdata[players[1]].turn = true
        }

      } else {
        gameplay.playerdata[players[0]].turn = true
      }

      if (lastTurn != lastFaceUp) {
        gameplay.memoryAnimation.flip = css(styles.flipInY)
        gameplay.memoryAnimation.src[0] = require(`../../images/cards/${cards[lastTurn[0]]}.png`)
        gameplay.memoryAnimation.src[1] = require(`../../images/cards/${cards[lastTurn[1]]}.png`)
        gameplay.memoryAnimation.animate = "turn"
      }

    }
  }

  if (payload.no_of_players && payload.no_of_players == 1) {

    gameplay.playerdata[players[0]].turn = true
  }

  gameplay.turnPlayer.forEach((value, index) => {

    gameplay.playerdata[value].chances += 1
  })

  gameplay.faceupPlayer.forEach((value => {

    gameplay.playerdata[value].points += 1

  }))


  gameplay.cards = cards


  return {
    gameplay
  }

}


