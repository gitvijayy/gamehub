// actions.js
import { createAction } from 'redux-actions';

export const actionsTypes = {
  CONNECTING: 'SOCKET_CONNECTING',
  OPENED: 'SOCKET_OPENED',
  MESSAGED: 'SOCKET_MESSAGED',
  ERROR: 'SOCKET_ERROR',
  CLOSED: 'SOCKET_CLOSED',
};

export default {
  connect: createAction(actionsTypes.CONNECTING),
  open: createAction(actionsTypes.OPENED),
  message: createAction(actionsTypes.MESSAGED),
  error: createAction(actionsTypes.ERROR),
  close: createAction(actionsTypes.CLOSED),
};
// life/actions.js
import { createAction } from 'redux-actions';

export const actionsTypes = {
  NEW_STATE: 'GAME_NEW_STATE',
};

export default {
  newState: createAction(actionsTypes.NEW_STATE),
};