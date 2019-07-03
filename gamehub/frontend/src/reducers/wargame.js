import { GET_WAR_GAMEPLAY,MAKE_NEW_GAME, GET_WAR_ACTIVEGAMES, GET_ACTIVEPLAYERS } from '../actions/types.js'

const initialState = {

  gameplay: [],
  games:[],
  count:0,
  activeplayers:[]
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WAR_GAMEPLAY:

      return {
        ...state,
        gameplay: action.payload
      }
    case GET_WAR_ACTIVEGAMES:

      return {
        ...state,
        games: action.payload
      }
    case 'INCRASE_COUNT':

    return {
      ...state,
      count: action.payload
    }

    case GET_ACTIVEPLAYERS:
      return {
        ...state,
        activeplayers: action.payload
      }

    default:
      return state;
  }
}