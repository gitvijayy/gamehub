import React from 'react'

export const convertNumberToCard = (number) => {
    return PictureDictionary[number]
}

export const fetchDeckImage = (color) => {
    return DeckDictionary[color]
}

const PictureDictionary = [
    <img src = {require('../../images/cards/1C.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/2C.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/3C.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/4C.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/5C.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/6C.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/7C.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/8C.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/9C.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/10C.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/11C.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/12C.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/13C.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/1D.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/2D.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/3D.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/4D.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/5D.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/6D.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/7D.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/8D.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/9D.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/10D.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/11D.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/12D.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/13D.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/1H.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/2H.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/3H.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/4H.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/5H.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/6H.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/7H.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/8H.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/9H.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/10H.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/11H.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/12H.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/13H.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/1S.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/2S.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/3S.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/4S.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/5S.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/6S.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/7S.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/8S.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/9S.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/10S.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/11S.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/12S.png')} className='card-images'></img>,
    <img src = {require('../../images/cards/13S.png')} className='card-images'></img>,

]

const DeckDictionary = {
    green : <img src = {require('../../images/cards/green_back.png')} className='card-images'></img>,
    purple : <img src = {require('../../images/cards/purple_back.png')} className='card-images'></img>,
    yellow : <img src = {require('../../images/cards/yellow_back.png')} className='card-images'></img>,
    red : <img src = {require('../../images/cards/red_back.png')} className='card-images'></img>,
}

