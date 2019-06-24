import axios from 'axios'
import { createMessage, returnErrors } from './messages'

import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS, GET_GAMEPLAY } from './types'


//GET LEADS
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


export const getLeads = () => (dispatch, getState) => {


  axios.get('/api/leads/', tokenConfig(getState)).then(res => {

    dispatch({
      type: GET_LEADS,
      payload: res.data
    })
  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))

}

export const deleteLead = (id) => (dispatch, getState) => {
  axios.delete(`/api/leads/${id}`, tokenConfig(getState)).then(res => {
    dispatch(createMessage({ leadDeleted: "Lead Deleted" }))
    dispatch({
      type: DELETE_LEAD,
      payload: id
    })

  }).catch(err => console.log(err))
}

export const addLead = (lead) => (dispatch, getState) => {
  axios.post(`/api/leads/`, lead, tokenConfig(getState)).then(res => {
    dispatch(createMessage({ leadAdded: "Lead Added" }))
    dispatch({
      type: ADD_LEAD,
      payload: res.data
    })

  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))
}





// {
//   const errors = {
//     msg: err.response.data,
//     status: err.response.status
//   }
//   dispatch({
//     type: GET_ERRORS,
//     payload: errors
//   })
// }