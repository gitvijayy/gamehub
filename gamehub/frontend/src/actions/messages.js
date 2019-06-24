import { CREATE_MESSAGE, GET_ERRORS } from './types'


//CREAT MESSAGE

export const createMessage = msg => {
  return {
    type: CREATE_MESSAGE,
    payload: msg
  }
}

//Return Errors

export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status }
  }
}