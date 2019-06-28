import axios from 'axios'
import { createMessage, returnErrors } from './messages'
import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS, GET_GAMEPLAY, ADD_TURN, GET_NEWGAME, SET_GAME, GET_ACTIVEGAMES } from './types'
import { defaultgame, cards, getcookie } from '../components/games/datahelpers'


//GET LEADS
const tokenConfig = (getState) => {
  const token = getState().auth.token
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }
  return config
}

export const getGamePlay = (game, gameid, cb) => (dispatch, getState) => {
  // let abc = defaultgame(123)
  // console.log("in")
  axios.get(`/api/${game}/games/${gameid}/`, tokenConfig(getState)).then(res => {
    // ${ gameid }

    //let data = defaultgame(res.data)


    dispatch({
      type: GET_GAMEPLAY,
      payload: defaultgame(res.data)
    })



    // res.data

  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))



}

export const getActiveGames = (game) => (dispatch, getState) => {
  // let abc = defaultgame(123)
  // console.log("in")
  axios.get(`/api/${game}/activegames/`, tokenConfig(getState)).then(res => {

    dispatch({
      type: GET_ACTIVEGAMES,
      payload: res.data
    })
  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))

}

export const getNewGame = (game, cb) => (dispatch, getState) => {
  axios.post(`/api/${game}/games/`, null, tokenConfig(getState)).then(res => {

    dispatch({
      type: GET_NEWGAME,
      payload: res.data
    })

    cb()

  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))

}


export const addTurn = (game, turn, cb) => (dispatch, getState) => {
  axios.post(`/api/${game}/turns/`, turn, tokenConfig(getState)).then(res => {

    // axios.get('/api/defaultgame/games/1/', tokenConfig(getState)).then(res => {

    //   dispatch({
    //     type: GET_GAMEPLAY,
    //     payload: res.data
    //   })

    // }).catch(err => dispatch(
    //   returnErrors(err.response.data, err.response.status)
    // ))
    cb()

  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))
}


export const setGame = (game) => (dispatch, getState) => {
  // let abc = defaultgame(123)
  // console.log("in")
  // axios.get(`/api/${game}/games/${gameid}/`, tokenConfig(getState)).then(res => {

  dispatch({
    type: SET_GAME,
    payload: game
  })
  // }).catch(err => dispatch(
  //   returnErrors(err.response.data, err.response.status)
  // ))

}





// export const addLead = (lead) => (dispatch, getState) => {
//   axios.post(`/api/leads/`, lead, tokenConfig(getState)).then(res => {
//     dispatch(createMessage({ leadAdded: "Lead Added" }))
//     dispatch({
//       type: ADD_LEAD,
//       payload: res.data
//     })

//   }).catch(err => dispatch(
//     returnErrors(err.response.data, err.response.status)
//   ))
// }






//   }).catch(err => dispatch(
//     returnErrors(err.response.data, err.response.status)
//   ))
// }


// var roomName = {{ room_name_json }};








// chatSocket.onclose = function (e) {
//   console.error('Chat socket closed unexpectedly');
// };

// document.querySelector('#chat-message-input').focus();
// document.querySelector('#chat-message-input').onkeyup = function (e) {
//   if (e.keyCode === 13) {  // enter, return
//     document.querySelector('#chat-message-submit').click();
//   }
// };

// document.querySelector('#chat-message-submit').onclick = function (e) {
//   var messageInputDom = document.querySelector('#chat-message-input');
//   var message = messageInputDom.value;
//   chatSocket.send(JSON.stringify({
//     'message': message
//   }));

//   messageInputDom.value = '';
// };

{/* <body>
  <textarea id="chat-log" cols="100" rows="20"></textarea><br />
  <input id="chat-message-input" type="text" size="100" /><br />
  <input id="chat-message-submit" type="button" value="Send" />
</body>
  <script>
    var roomName = {{ room_name_json }};
  
    var chatSocket = new WebSocket(
      'ws://' + window.location.host +
      '/ws/chat/' + roomName + '/');
  
  chatSocket.onmessage = function (e) {
    var data = JSON.parse(e.data);
    var message = data['message'];
    document.querySelector('#chat-log').value += (message + '\n');
  };

  chatSocket.onclose = function (e) {
      console.error('Chat socket closed unexpectedly');
    };
  
    document.querySelector('#chat-message-input').focus();
  document.querySelector('#chat-message-input').onkeyup = function (e) {
    if (e.keyCode === 13) {  // enter, return
      document.querySelector('#chat-message-submit').click();
    }
  };

  document.querySelector('#chat-message-submit').onclick = function (e) {
    var messageInputDom = document.querySelector('#chat-message-input');
    var message = messageInputDom.value;
    chatSocket.send(JSON.stringify({
      'message': message
  }));

  messageInputDom.value = '';
};
</script> */}








/*//!for referance

import axios from 'axios'
import { createMessage, returnErrors } from './messages'

import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS, GET_GAMEPLAY } from './types'


//GET LEADS
const tokenConfig = (getState) => {
  const token = getState().auth.token
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }
  return config
}


export const getLeads = () => (dispatch, getState) => {


  axios.get('/api/leads/', tokenConfig(getState)).then(res => {

    dispatch({
      type: GET_LEADS,
      payload: res.data
    })
  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))

}

export const deleteLead = (id) => (dispatch, getState) => {
  axios.delete(`/api/leads/${id}`, tokenConfig(getState)).then(res => {
    dispatch(createMessage({ leadDeleted: "Lead Deleted" }))
    dispatch({
      type: DELETE_LEAD,
      payload: id
    })

  }).catch(err => console.log(err))
}

export const addLead = (lead) => (dispatch, getState) => {
  axios.post(`/api/leads/`, lead, tokenConfig(getState)).then(res => {
    dispatch(createMessage({ leadAdded: "Lead Added" }))
    dispatch({
      type: ADD_LEAD,
      payload: res.data
    })

  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))
}
*/


