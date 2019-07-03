import React from 'react'

export const convertNumberToCard = (number) => {
    return PictureDictionary[number]
}

export const fetchDeckImage = (color) => {
    return DeckDictionary[color]
}

const PictureDictionary = [
    require('../../images/cards/2C.png'),
    require('../../images/cards/3C.png'),
    require('../../images/cards/4C.png'),
    require('../../images/cards/5C.png'),
    require('../../images/cards/6C.png'),
    require('../../images/cards/7C.png'),
    require('../../images/cards/8C.png'),
    require('../../images/cards/9C.png'),
    require('../../images/cards/10C.png'),
    require('../../images/cards/11C.png'),
    require('../../images/cards/12C.png'),
    require('../../images/cards/13C.png'),
    require('../../images/cards/1C.png'),
    require('../../images/cards/2D.png'),
    require('../../images/cards/3D.png'),
    require('../../images/cards/4D.png'),
    require('../../images/cards/5D.png'),
    require('../../images/cards/6D.png'),
    require('../../images/cards/7D.png'),
    require('../../images/cards/8D.png'),
    require('../../images/cards/9D.png'),
    require('../../images/cards/10D.png'),
    require('../../images/cards/11D.png'),
    require('../../images/cards/12D.png'),
    require('../../images/cards/13D.png'),
    require('../../images/cards/1D.png'),
    require('../../images/cards/2H.png'),
    require('../../images/cards/3H.png'),
    require('../../images/cards/4H.png'),
    require('../../images/cards/5H.png'),
    require('../../images/cards/6H.png'),
    require('../../images/cards/7H.png'),
    require('../../images/cards/8H.png'),
    require('../../images/cards/9H.png'),
    require('../../images/cards/10H.png'),
    require('../../images/cards/11H.png'),
    require('../../images/cards/12H.png'),
    require('../../images/cards/13H.png'),
    require('../../images/cards/1H.png'),
    require('../../images/cards/2S.png'),
    require('../../images/cards/3S.png'),
    require('../../images/cards/4S.png'),
    require('../../images/cards/5S.png'),
    require('../../images/cards/6S.png'),
    require('../../images/cards/7S.png'),
    require('../../images/cards/8S.png'),
    require('../../images/cards/9S.png'),
    require('../../images/cards/10S.png'),
    require('../../images/cards/11S.png'),
    require('../../images/cards/12S.png'),
    require('../../images/cards/13S.png'),
    require('../../images/cards/1S.png'),

]

const DeckDictionary = {
    green : require('../../images/cards/green_back.png'), 
    purple : require('../../images/cards/purple_back.png'),
    yellow : require('../../images/cards/yellow_back.png'),
    red : require('../../images/cards/red_back.png'),
}

export const getcookie = (cb) => {
    document.cookie.split(";").forEach(cookie => {
      name = cookie.split("=")[0].trim()
      if (name == "gameid") {
        cb(cookie.split("=")[1])
      }
    })
  }

