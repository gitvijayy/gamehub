import axios from 'axios'
import { createMessage, returnErrors } from './messages'
import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS, GET_GAMEPLAY, ADD_TURN } from './types'



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

export const getGamePlay = () => (dispatch, getState) => {
  // let abc = defaultgame(123)
  console.log("in")
  axios.get('/api/defaultgame/games/1/', tokenConfig(getState)).then(res => {

    dispatch({
      type: GET_GAMEPLAY,
      payload: res.data
    })
  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))

}


// export const addTurn = (turn) => (dispatch, getState) => {
//   axios.post(`/api/defaultgame/turns`, turn, tokenConfig(getState)).then(res => {
//     // // dispatch(createMessage({ leadAdded: "Lead Added" }))
//     // dispatch({
//     //   type: ADD_TURN,
//     //   payload: res.data
//     // })

//     axios.get('/api/defaultgame/games/1/', tokenConfig(getState)).then(res => {

//       chatSocket.send(JSON.stringify({
//         'message': res.data
//       }));
//       chatSocket.onmessage = function (e) {
//         var data = JSON.parse(e.data);
//         var message = data['message'];
//         // document.querySelector('#chat-log').value += (message + '\n');
//         dispatch({
//           type: GET_GAMEPLAY,
//           payload: message
//         })
//       };


//     }).catch(err => dispatch(
//       returnErrors(err.response.data, err.response.status)
//     ))


export const addTurn = (turn) => (dispatch, getState) => {
  axios.post(`/api/defaultgame/turns/`, turn, tokenConfig(getState)).then(res => {
    // dispatch(createMessage({ leadAdded: "Lead Added" }))
    // dispatch({
    //   type: ADD_LEAD,
    //   payload: res.data
    // })


    axios.get('/api/defaultgame/games/1/', tokenConfig(getState)).then(res => {

      // chatSocket.send(JSON.stringify({
      //   'message': res.data
      // }));


      // chatSocket.onmessage = function (e) {
      //   var data = JSON.parse(e.data);
      //   var message = data['message'];
      //   console.log("in")
      // document.querySelector('#chat-log').value += (message + '\n');
      dispatch({
        type: GET_GAMEPLAY,
        payload: res.data
      })
      // };


    }).catch(err => dispatch(
      returnErrors(err.response.data, err.response.status)
    ))

  }).catch(err => dispatch(
    returnErrors(err.response.data, err.response.status)
  ))
}






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


