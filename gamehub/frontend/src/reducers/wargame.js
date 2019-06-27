import { GET_WAR_GAMEPLAY } from '../actions/types.js'

const initialState = {

  gameplay: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WAR_GAMEPLAY:

      return {
        ...state,
        gameplay: action.payload
      }

    default:
      return state;
  }
}