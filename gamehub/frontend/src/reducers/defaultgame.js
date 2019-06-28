import { GET_GAMEPLAY, GET_NEWGAME, SET_GAME, GET_ACTIVEGAMES } from '../actions/types.js'
import { getNewGame } from '../actions/defaultgame.js';

const initialState = {

  gameplay: [],
  newgame: [],
  name: "",
  activegames: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GAMEPLAY:
      // console.log(action.payload)

      return {
        ...state,
        gameplay: action.payload
      }

    case GET_NEWGAME:
      // console.log(action.payload)

      return {
        ...state,
        newgame: [action.payload]
      }

    case SET_GAME:
      // console.log(action.payload)
      return {
        ...state,
        name: [action.payload]
      }

    case GET_ACTIVEGAMES:
      console.log("amhere", action.payload)
      return {
        ...state,
        activegames: action.payload
      }


    default:
      return state;
  }
}

//!for referance
/*import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from '../actions/types.js'

const initialState = {
  leads: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEADS:
      // console.log(action.payload)
      return {
        ...state,
        leads: action.payload
      }
    case DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter(lead => lead.id !== action.payload)
      }
    case ADD_LEAD:
      return {
        ...state,
        leads: [...state.leads, action.payload]
      }
    default:
      return state;
  }
} */