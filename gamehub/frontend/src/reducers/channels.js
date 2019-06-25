// // reducer.js
// import { actionsTypes } from '../actions/channels';

// const initialState = {
//   loading: false,
//   connected: false,
//   error: null,
//   message: null,
// };

// const reducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case actionsTypes.CONNECTING:
//       return {
//         ...state,
//         loading: true,
//       };
//     case actionsTypes.OPENED:
//       return {
//         ...state,
//         connected: true,
//         loading: false,
//       };
//     case actionsTypes.MESSAGED:
//       return {
//         ...state,
//         ...payload,
//       };
//     case actionsTypes.ERROR:
//       return {
//         ...state,
//         ...payload,
//         loading: false,
//       };
//     case actionsTypes.CLOSED:
//       return {
//         ...state,
//         loading: false,
//         connected: false,
//       };
//     default:
//       return state;
//   }
// };

// export default reducer;