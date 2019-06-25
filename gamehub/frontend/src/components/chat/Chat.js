// // var roomName = {{ room_name_json }};

// // var chatSocket = new WebSocket(
// //   'ws://' + window.location.host +
// //   '/ws/chat/' + roomName + '/');

// // chatSocket.onmessage = function (e) {
// //   var data = JSON.parse(e.data);
// //   var message = data['message'];
// //   document.querySelector('#chat-log').value += (message + '\n');
// // };

// // chatSocket.onclose = function (e) {
// //   console.error('Chat socket closed unexpectedly');
// // };

// // document.querySelector('#chat-message-input').focus();
// // document.querySelector('#chat-message-input').onkeyup = function (e) {
// //   if (e.keyCode === 13) {  // enter, return
// //     document.querySelector('#chat-message-submit').click();
// //   }
// // };

// // document.querySelector('#chat-message-submit').onclick = function (e) {
// //   var messageInputDom = document.querySelector('#chat-message-input');
// //   var message = messageInputDom.value;
// //   chatSocket.send(JSON.stringify({
// //     'message': message
// //   }));

// //   messageInputDom.value = '';
// // };


// import initSocketFactory from './initsocket';

// class Chat extends Component {
//   componentDidMount() {
//     this.props.initSocket('ws://localhost:8000');
//   }

//   render() {
//     const { socket, game, initSocket } = this.props;
//     const loading = socket.loading || !game.matrix.length; 2

//     return (
//       <div>
//         {loading && <span>Loading...</span>}
//         {!loading && <Grid matrix={game.matrix} />}
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   initSocket: initSocketFactory(dispatch),
// });

// export default connect(store => store, mapDispatchToProps)(Chat);