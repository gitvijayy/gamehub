import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getCookies } from '../games/goofspiel/datahelpers'
var chatSocket = ""

// chatSocket = new WebSocket(
//   'ws://' + window.location.host +
//   `/ws/games/chatbox/`);
export class Chat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      currentMessage: "",
      mount: this.props.messages
    }

  }

  componentDidUpdate() {
    chatSocket.onmessage = (e) => {
      var data = JSON.parse(e.data);
      var message = data['message'];
      let mess = this.state.messages.reverse()

      this.setState({
        messages: [message, ...mess]
      })

    }


    // document.getElementById("scrollToBottom").scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {


    chatSocket = new WebSocket(
      'ws://' + window.location.host +
      `/ws/games/chatbox/`);
  }




  onKeyDown = (e, user) => {

    this.setState({
      currentMessage: e.target.value
    })

    console.log(this.state.currentMessage)

    if (e.keyCode == 13) {
      let message = {
        "name": user,
        "message": e.target.value
      }

      e.target.value = ""
      chatSocket.send(JSON.stringify({
        'message': message
      }));

    }

  }

  render() {

    let user;

    if (this.props.user && this.props.user.username) {
      user = this.props.user.username
    }

    const messages = this.state.messages.map((message, index) => {
      return (
        <Fragment key={index}>
          <b>@{message.name}</b>
          <br />
          <p>{message.message}</p>

        </Fragment>
      )
    })


    return (
      <Fragment>
        <h3 className="text-center logo">Chat</h3>
        <div
          className="text-center pre-scrollable" style={{ height: "250px", maxHeight: "250px", marginBottom: "5%" }}>

          {messages}

        </div>

        <input
          className="bg-dark text-light form-control"
          name='content'
          style={{ resize: "none", marginBottom: "5%" }}
          placeholder='ENTER to Submit'
          onKeyDown={(e) => { this.onKeyDown(e, user) }}

        />

      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(Chat)
