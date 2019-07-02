import { combineReducers } from 'redux'

import errors from './errors'
import messages from './messages'
import auth from './auth'
import defaultgame from './defaultgame'
import goofspiel from './goofspiel'
import wargame from './wargame'

export default combineReducers({
  // leads,
  errors,
  messages,
  auth,
  defaultgame,
  goofspiel,
  wargame
})

