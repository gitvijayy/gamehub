import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}
const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)


// import { WebSocketHandler, store } from 'channels-redux';
// const webSocketHandler = new WebSocketHandler(store);
// webSocketHandler.subscribeAll();

export default store