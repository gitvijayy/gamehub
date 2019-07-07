import axios from 'axios'
import { createMessage, returnErrors } from './messages'
import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS, GET_GAMEPLAY, ADD_TURN, GET_WAR_GAMEPLAY, MAKE_NEW_GAME, GET_WAR_ACTIVEGAMES, GET_ACTIVEPLAYERS } from './types'

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

export const getWarGamePlay = (gameId) => (dispatch, getState) => {

  axios.get(`/api/war/games/${gameId}/`, tokenConfig(getState)).then(res => {

    dispatch({
      type: GET_WAR_GAMEPLAY,
      payload: res.data
    })
  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))

}

export const addWarTurn = (round, callback) => (dispatch, getState) => {
  console.log('I am inside the warTurn')
  console.log('this is the rounds : ' + round)
  axios.post(`/api/war/turns/`, { 'round_id': round }, tokenConfig(getState)).then(res => {
    callback()


  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))
}

export const makeNewGame = (state) => (dispatch, getState) => {
  console.log('got into makeNewGame')

  axios.post('/api/war/games/', {}, tokenConfig(getState)).then(res => {
    console.log('made a new game')
    console.log(res)
    dispatch({
      type: MAKE_NEW_GAME,
      payload: res.data
    })
    state()
  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))
}

export const getWarActivegames = (state) => (dispatch, getState) => {

  axios.get('/api/war/activegames/', tokenConfig(getState)).then(res => {

    dispatch({
      type: GET_WAR_ACTIVEGAMES,
      payload: res.data
    })
    state()
  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))
}

export const getActivePlayers = () => (dispatch, getState) => {

  // axios.get(`/api/${game}/activegames/`, tokenConfig(getState)).then(res => {
  axios.get(`/api/activeplayers/`, tokenConfig(getState)).then(res => {

    dispatch({
      type: GET_ACTIVEPLAYERS,
      payload: res.data
    })
  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))

}