import { GET_GAMEPLAY } from '../actions/types.js'

const initialState = {
  // gameid: 10,
  // status: 'Active',
  // players: ['vijay', 'yajiv'],
  // rounds: [1, 2, 3, 4],
  // prizecards: [8, 9, 10, 11],
  // turns: [[1, 2], [2, 2], [3, 3], [4, 4]],
  gameplay: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GAMEPLAY:
      // console.log(action.payload)

      return {
        ...state,
        gameplay: action.payload
      }

    default:
      return state;
  }
}