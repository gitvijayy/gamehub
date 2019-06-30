import axios from 'axios'
import { createMessage, returnErrors } from './messages'
import { GET_GAMEPLAY, ADD_TURN, GET_NEWGAME, SET_GAME, GET_ACTIVEGAMES, ANIMATION_STATUS } from './types'
import { goofspielGamePlay, cards, getcookie } from '../components/games/goofspiel/datahelpers'

const tokenConfig = (getState) => {
  const token = getState().auth.token
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }
  return config
}

export const getGamePlay = (game, gameid, cb) => (dispatch, getState) => {

  let data;
  axios.get(`/api/${game}/games/${gameid}/`, tokenConfig(getState)).then(res => {

    data = goofspielGamePlay(res.data)

    dispatch({
      type: GET_GAMEPLAY,
      payload: data
    })

    if (data.gameplay.animate) {
      dispatch({
        type: ANIMATION_STATUS,
        payload: true
      })
      setTimeout(
        function () {
          dispatch({
            type: ANIMATION_STATUS,
            payload: false
          })
        }
        ,
        2000
      );
    }

  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))

}

export const getActiveGames = (game) => (dispatch, getState) => {

  axios.get(`/api/${game}/activegames/`, tokenConfig(getState)).then(res => {

    dispatch({
      type: GET_ACTIVEGAMES,
      payload: res.data
    })
  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))

}

export const getNewGame = (game, cbGameplay) => (dispatch, getState) => {
  axios.post(`/api/${game}/games/`, null, tokenConfig(getState)).then(res => {

    dispatch({
      type: GET_NEWGAME,
      payload: res.data
    })
    console.log(res.data)
    cbGameplay(res.data.id)

  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))

}


export const addTurn = (game, turn, cbGameplay) => (dispatch, getState) => {
  axios.post(`/api/${game}/turns/`, turn, tokenConfig(getState)).then(res => {

    cbGameplay()

  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))
}


export const setGame = (game) => (dispatch, getState) => {

  dispatch({
    type: SET_GAME,
    payload: game
  })

}

