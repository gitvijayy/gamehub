import { combineReducers } from 'redux'

import errors from './errors'
import messages from './messages'
import auth from './auth'

import wargame from './wargame'

import goofspiel from './goofspiel'
export default combineReducers({
  // leads,
  errors,
  messages,
  auth,

  wargame,
  goofspiel
})

