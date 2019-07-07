import { StyleSheet, css } from 'aphrodite';
import { bounceInUp, bounceInDown, fadeOutLeft, fadeOutRight, zoomIn, zoomOut, flipInY, hinge } from 'react-animations'

export const cards = () => {
  let suits = ["C", "H", "S", "D"]
  let cardnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

  return {
    suits: suits,
    cardnumbers: cardnumbers

  }
}

export const goofspielGamePlay = (payload) => {
  let gameplay = {
    name: payload.name,
    gameid: payload.id,
    roundid: 0,
    prizeCard: 0,
    players: {},
    playerpoints: {},
    current: [0, 0],
    animate: false,
    suits: [],
    //player1 player2 prizecard
    previous: [0, 0, 0],
    status: payload.status,
    winner: ""
  }


  let players = payload.game.map(value => {
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
        gameplay.animate = "turn"
      }

      if (player1action > player2action && player2action) {
        gameplay.playerpoints[players[0]] += value.prizeCard
      } else if (player2action > player1action) {
        gameplay.playerpoints[players[1]] += value.prizeCard
      }

      if (gameplay.playerpoints[players[0]] > gameplay.playerpoints[players[1]]) {
        gameplay.winner = players[0] + " Won"
      }

      if (gameplay.playerpoints[players[1]] > gameplay.playerpoints[players[0]]) {
        gameplay.winner = players[1] + " Won"
      }

      if (gameplay.playerpoints[players[0]] == gameplay.playerpoints[players[1]]) {
        gameplay.winner = "Its A Draw"
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


  if (payload.rounds && payload.rounds[0].turns && !payload.rounds[0].turns.length && payload.status == "Active") {
    gameplay.animate = "startgame"
  }

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

export const getCookies = (cb) => {
  let cookies = {}
  document.cookie.split(";").forEach(cookie => {
    name = cookie.split("=")[0].trim()
    cookies[name] = cookie.split("=")[1];

  })
  cb(cookies)
}

export const styles = StyleSheet.create({

  fadeOutLeft: {
    animationName: fadeOutLeft,
    animationDuration: '4s',

  },
  fadeOutRight: {
    animationName: fadeOutRight,
    animationDuration: '4s',
  },
  zoomIn: {
    animationName: zoomIn,
    animationDuration: '1s',

  },
  flipInY: {
    animationName: flipInY,
    animationDuration: '1s',

  },
  zoomOut: {
    animationName: zoomOut,
    animationDuration: '4s',

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
    width: "80px",
    marginLeft: "20%",
    marginTop: "10%",
  },
  betblockSpinner: {
    marginTop: "30%",
    marginLeft: "22%",
    height: "4rem",
    width: "4rem"
  },
  zoomInOnly: {
    animationName: zoomIn,
    animationDuration: '2s',

  },
  zoomOutOnly: {
    animationName: zoomIn,
    animationDuration: '2s',

  },

  bounceInUp1: {
    animationName: bounceInUp,
    animationDuration: '2s'
  },
  bounceInDown1: {
    animationName: bounceInDown,
    animationDuration: '2s'
  },

  hinge: {
    animationName: hinge,
    animationDuration: '2s'
  }

})

export const cssAnimations = {
  fadeOutLeft: css(styles.fadeOutLeft, styles.betblock),
  fadeOutRight: css(styles.fadeOutRight, styles.betblock),
  bounceInUp: css(styles.bounceInUp, styles.betblock),
  bounceInDown: css(styles.bounceInDown, styles.betblock),
  zoomIn: css(styles.zoomIn, styles.betblock),
  zoomOut: css(styles.zoomOut, styles.betblock),
  flipInY: css(styles.flipInY, styles.betblock),
  betblockSpinner: css(styles.betblockSpinner),
  zoomInOnly: css(styles.zoomInOnly),
  zoomOutOnly: css(styles.zoomOutOnly),
  flipInY1: css(styles.flipInY),
  hinge: css(styles.hinge, styles.betblock),
}





