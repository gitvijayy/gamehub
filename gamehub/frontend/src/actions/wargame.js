import axios from 'axios'
import { createMessage, returnErrors } from './messages'
import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS, GET_GAMEPLAY, ADD_TURN, GET_WAR_GAMEPLAY } from './types'

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

export const getWarGamePlay = () => (dispatch, getState) => {
    // let abc = defaultgame(123)
    console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHello')
    console.log("in")
    axios.get('/api/war/games/37/', tokenConfig(getState)).then(res => {
  
      dispatch({
        type: GET_WAR_GAMEPLAY,
        payload: res.data
      })
    }).catch(err => dispatch(
      returnErrors(err.response.data, err.response.status)
    ))
  
  }