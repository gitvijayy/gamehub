import axios from 'axios'
import { createMessage, returnErrors } from './messages'
import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS, GET_GAMEPLAY, ADD_TURN, GET_WAR_GAMEPLAY, ADD_WAR_TURN } from './types'

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

export const getWarGamePlay = (state) => (dispatch, getState) => {
    // let abc = defaultgame(123)
    console.log(state.props.gameplay)
    console.log(getState())
    // console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHello')
    // console.log("in")
    
    axios.get('/api/war/games/37/', tokenConfig(getState)).then(res => {
  
      dispatch({
        type: GET_WAR_GAMEPLAY,
        payload: res.data
      })
    }).catch(err => dispatch(
      returnErrors(err.response.data, err.response.status)
    ))
  
  }

  export const addWarTurn = (round) => (dispatch, getState) => {
    console.log('I am inside the warTurn')
    console.log('this is the rounds : ' + round)
    axios.post(`/api/war/turns/`, {'round_id': round}, tokenConfig(getState)).then(res => {
      // dispatch(createMessage({ leadAdded: "Lead Added" }))
      // dispatch({
      //   type: ADD_LEAD,
      //   payload: res.data
      // })
      console.log('made post request')
  
      axios.get('/api/war/games/37/', tokenConfig(getState)).then(res => {
  
        // chatSocket.send(JSON.stringify({
        //   'message': res.data
        // }));
  
        console.log('made get request')
        // chatSocket.onmessage = function (e) {
        //   var data = JSON.parse(e.data);
        //   var message = data['message'];
        //   console.log("in")
        // document.querySelector('#chat-log').value += (message + '\n');
        dispatch({
          type: GET_WAR_GAMEPLAY,
          payload: res.data
        })

      }).catch(err => dispatch(
        returnErrors(err.response.data, err.response.status)
      ))
  
    }).catch(err => dispatch(
      returnErrors(err.response.data, err.response.status)
    ))
  }