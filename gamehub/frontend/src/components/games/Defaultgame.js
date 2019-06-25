import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getGamePlay } from '../../actions/defaultgame'
import { defaultgame } from './datahelpers.js'
import { addTurn } from '../../actions/defaultgame'

var chatSocket = new WebSocket(
  'ws://' + window.location.host +
  '/ws/defaultgame/turns/');


export class Defaultgame extends Component {
  // static propTypes = {
  //   leads: PropTypes.array.isRequired,
  //   getLeads: PropTypes.func.isRequired,
  //   deleteLead: PropTypes.func.isRequired
  // }

  onClick = (e) => {
    var lead = { "round_id": 13, "action": 99 }
    this.props.addTurn(lead)

    chatSocket.send(JSON.stringify({

      'message': lead
    }));
  }


  componentDidUpdate() {
    chatSocket.onmessage = (e) => {
      var data = JSON.parse(e.data);
      var message = data['message'];
      console.log("in")

      // console.log()
      // //mapStateToProps()
      this.props.gameplay.rounds[message.round_id - 1].turns.push(message.action)
      // this.props.getGamePlay()
      // document.querySelector('#chat-log').value += (message + '\n');
      // dispatch({
      //   type: GET_GAMEPLA      //   payload: message
      // })
      // console.log(this.props.gameplay)
      console.log(gameplay)
    };
  }

  // onClick = (e) => {
  //   let { name, email, message } = this.state
  //   name = e.target.id
  //   console.log(e.target.id)
  //   const lead = { name, email, message }
  //   this.props.addLead(lead)


  // }

  componentDidMount() {
    this.props.getGamePlay()

  }


  render() {
    console.log(this.props.gameplay)

    const datahelper = this.props.gameplay.players ? defaultgame(this.props.gameplay) : null
    let gamelayout = []

    // console.log(datahelper)

    if (datahelper) {
      let playerActions = datahelper.playerActions.players
      let current = []
      for (var player in playerActions) {
        current = playerActions[player].map((action, index) => {
          return (
            <p key={action + player + index}>{action}</p>
          )
        })

        gamelayout.push(<div key={player} className="row">{current}</div>)


      }
    }
    // console.log(gamelayout)
    return (
      <Fragment>
        <div >
          {gamelayout}

          <button onClick={this.onClick} className="btn btn-primary">Turn</button>

        </div>
        {/* <div className="row">
          {player2}
        </div> */}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  gameplay: state.defaultgame.gameplay
})

export default connect(mapStateToProps, { getGamePlay, addTurn })(Defaultgame)
