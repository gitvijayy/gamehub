import axios from 'axios'
import { returnErrors } from './messages'
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types.js'


export const loadUser = () => (dispatch, getState) => {

  dispatch({ type: USER_LOADING })
  // get token from state

  const token = getState().auth.token
  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  //if token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }
  axios.get('/api/auth/user', config).then(res => {
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status))
    dispatch({
      type: AUTH_ERROR
    })
  })
}

/////Login User
export const login = (username, password) => (dispatch) => {
  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  //if token, add to headers config
  //Request body
  const body = JSON.stringify({
    username, password
  })
  axios.post('/api/auth/login', body, config).then(res => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
  }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status))
    dispatch({
      type: LOGIN_FAIL
    })
  })
}

/////Register User
export const register = ({ username, password, email }) => (dispatch) => {
  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  //if token, add to headers config
  //Request body
  const body = JSON.stringify({ username, email, password })
  axios.post('/api/auth/register', body, config).then(res => {
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status))
    dispatch({
      type: REGISTER_FAIL
    })
  })
}

//LOGout User
export const logout = () => (dispatch, getState) => {
  //user loading
  // get token from state
  const token = getState().auth.token
  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  //if token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`
  }
  axios.post('/api/auth/logout/', null, config).then(res => {
    dispatch({
      type: LOGOUT_SUCCESS
    })
  }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status))
  })
}