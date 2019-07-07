import axios from 'axios'
import { createMessage, returnErrors } from './messages'
import { GET_GAMEPLAY, ADD_TURN, GET_NEWGAME, SET_GAME, GET_ACTIVEGAMES, ANIMATION_STATUS, MEMORY_ANIMATION, GET_ACTIVEPLAYERS } from './types'
import { goofspielGamePlay, cards, getcookie } from '../components/games/goofspiel/datahelpers'
import { memoryGamePlay } from '../components/games/memory/datahelpers'
import { logout } from './auth'

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
    console.log(res.data)
    if (game == "goofspiel") {

      data = goofspielGamePlay(res.data)
    }

    if (game == "memory") {

      data = memoryGamePlay(res.data)
    }

    dispatch({

      type: GET_GAMEPLAY,
      payload: data
    })

    if (game == "goofspiel" && data.gameplay.animate) {

      dispatch({
        type: ANIMATION_STATUS,
        payload: data.gameplay.animate
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

    if (game == "memory" && data.gameplay.memoryAnimation.animate) {



      if (data.gameplay.memoryAnimation.animate == "turn") {
        console.log("in turn")

        dispatch({
          type: MEMORY_ANIMATION,
          payload: data.gameplay.memoryAnimation
        })
        setTimeout(
          function () {
            dispatch({
              type: MEMORY_ANIMATION,
              payload: data.gameplay.animationReturn
            })
          }
          ,
          1000
        );

      }

      if (data.gameplay.memoryAnimation.animate == "startgame") {
        console.log("in start game")

        dispatch({
          type: MEMORY_ANIMATION,
          payload: data.gameplay.memoryAnimation
        })
        setTimeout(
          function () {
            dispatch({
              type: MEMORY_ANIMATION,
              payload: data.gameplay.animationReturn
            })
          }
          ,
          1000
        );
      }


    }

  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))

}

export const getActiveGames = (game) => (dispatch, getState) => {

  axios.get(`/api/activegames/`, tokenConfig(getState)).then(res => {

    dispatch({
      type: GET_ACTIVEGAMES,
      payload: res.data
    })
  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))

}

export const getNewGame = (game, cbGameplay) => (dispatch, getState) => {

  axios.post(`/api/games/`, game, tokenConfig(getState)).then(res => {
    dispatch({
      type: GET_NEWGAME,
      payload: res.data
    })

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


export const logoutUserStatus = () => (dispatch, getState) => {
  axios.post(`/api/activeplayers/`, null, tokenConfig(getState)).then(res => {

  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))
}



export const getActivePlayers = () => (dispatch, getState) => {

  axios.get(`/api/activeplayers/`, tokenConfig(getState)).then(res => {

    dispatch({
      type: GET_ACTIVEPLAYERS,
      payload: res.data
    })
  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))

}


