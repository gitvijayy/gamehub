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

// export const memoryCards = () => {

//   let cards1 = cards()
//   let cardsMapped = []
//   cards1.cardnumbers.forEach(card => {
//     cardsMapped.push(`${card}${cards1.suits[0]}`)
//     cardsMapped.push(`${card}${cards1.suits[1]}`)
//     cardsMapped.push(`${card}${cards1.suits[2]}`)
//     cardsMapped.push(`${card}${cards1.suits[3]}`)
//   })
//   // cards1.suits.forEach(suit => {
//   //   cards1.cardnumbers.forEach(card => {
//   //     cardsMapped.push(`${card}${suit}`)
//   //   })
//   return cardsMapped
// }

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






