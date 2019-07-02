import axios from 'axios'
import { createMessage, returnErrors } from './messages'
import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS, GET_GAMEPLAY, ADD_TURN, GET_WAR_GAMEPLAY, MAKE_NEW_GAME,GET_WAR_ACTIVEGAMES } from './types'

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
    // let abc = defaultgame(123)
    // const roundId = state.props.gameplay.status? state.props.gameplay.: null
    // console.log(state)
    // console.log(getState())
    // console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHello')
    // console.log("in")
    
    axios.get(`/api/war/games/${gameId}/`, tokenConfig(getState)).then(res => {
  
      dispatch({
        type: GET_WAR_GAMEPLAY,
        payload: res.data
      })
    }).catch(err => dispatch(
      returnErrors(err.response.data, err.response.status)
    ))
  
  }

  export const addWarTurn = (round,callback) => (dispatch, getState) => {
    console.log('I am inside the warTurn')
    console.log('this is the rounds : ' + round)
    axios.post(`/api/war/turns/`, {'round_id': round}, tokenConfig(getState)).then(res => {
      callback()
      // dispatch(createMessage({ leadAdded: "Lead Added" }))
      // dispatch({
      //   type: ADD_LEAD,
      //   payload: res.data
      // })
      // console.log('made post request')
      // axios.get(`/api/war/games/${game_id}/`, tokenConfig(getState)).then(res => {
  
        // chatSocket.send(JSON.stringify({
        //   'message': res.data
        // }));
  
        // console.log('made get request')
        // chatSocket.onmessage = function (e) {
        //   var data = JSON.parse(e.data);
        //   var message = data['message'];
        //   console.log("in")
        // document.querySelector('#chat-log').value += (message + '\n');
      //   dispatch({
      //     type: GET_WAR_GAMEPLAY,
      //     payload: res.data
      //   })

      // }).catch(err => dispatch(
      //   returnErrors(err.response.data, err.response.status)
      // ))
  
    }).catch(err => dispatch(
      returnErrors(err.response.data, err.response.status)
    ))
  }

export const makeNewGame = (state) => (dispatch,getState) => {
  console.log('got into makeNewGame')

  axios.post('/api/war/games/', {} , tokenConfig(getState)).then(res => {
    console.log('made a new game')
    console.log(res)
    dispatch({
      type:MAKE_NEW_GAME,
      payload:res.data
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
    
  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))

  

}