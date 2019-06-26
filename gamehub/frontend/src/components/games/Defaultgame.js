import React, { Component, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getGamePlay } from '../../actions/defaultgame'
import { defaultgame, cards } from './datahelpers.js'
import { addTurn } from '../../actions/defaultgame'

var chatSocket = new WebSocket(
  'ws://' + window.location.host +
  '/ws/defaultgame/turns/');


export class Defaultgame extends Component {
  // static propTypes = {
  //   leads: PropTypes.array.isRequired,
  //   getLeads: PropTypes.func.isRequired,
  //   deleteLead: PropTypes.func.isRequired
  // // }

  state = {
    gamedata: []
  }

  onClick1 = (e) => {
    console.log("inonclick")
    console.log(e.target.name)
    console.log(this.state.testing)
    var lead = { "round_id": 13, "action": 99 }
    // this.props.addTurn(lead)

    chatSocket.send(JSON.stringify({

      'message': lead
    }));
  }


  componentDidUpdate() {
    chatSocket.onmessage = (e) => {
      var data = JSON.parse(e.data);
      var message = data['message'];
      // console.log(this.state.testing)
      this.setState({ testing: 234 })
      console.log(this.state.testing)
      // console.log(this.state.testing)
      // console.log()
      // //mapStateToProps()
      // this.props.gameplay.rounds[message.round_id - 1].turns.push(message.action)
      // this.props.getGamePlay()
      // document.querySelector('#chat-log').value += (message + '\n');
      // dispatch({
      //   type: GET_GAMEPLA      //   payload: message
      // })
      // console.log(this.props.gameplay)
      // console.log(gameplay)
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
    // console.log(this.props.gameplay)

    const data = this.props.gameplay.players ? defaultgame(this.props.gameplay) : null
    console.log(data)
    // const data = this.props.gameplay.players ? defaultgame(this.props.gameplay) : null
    let gamelayout = []
    const player1cards = []
    const player2cards = []
    const player1points = 0
    const player2points = 0
    const player1name = ""
    const player2name = ""
    const test = [1, 2, 3, 4]
    const newprizecard = <img onClick={(e) => { this.onClick1(e) }} key="asd" name="fhgh" src={require("../images/blackBack.png")} />

    // console.log(data)

    if (data) {
      let gameplay = data.gameplay.players
      let current = []
      for (var player in gameplay) {
        current = gameplay[player].map((action, index) => {
          return (
            // <p key={action + player + index}>{action}</p>
            <img key={action + player + index} src={require("../images/blackBack.png")} />
          )
        })

        // gamelayout.push(<div key={player} className="row">{current}</div>)
        // test.map(turn => {
        player1cards.push(current)

        // })
      }
    }
    // console.log(gamelayout)
    return (
      < section className="col-12 col-md-8 row" >

        <div className=" col-12 col-md-11 bg-alternate-2 ">
          <div className="playingcard">

            {player1cards[0]}
          </div>
          <div className="playingcard">
            <img className="aces" src={require("../images/aces.png")} />

            {newprizecard}

            <table className="table table-borderless table-dark  text-center" style={{ width: "25%" }}>
              <thead className="text-dark login" style={{ background: "red" }}>
                <tr>
                  <th scope="col">Player</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              <tbody className="bg-light text-dark table-shadow ">
                <tr>
                  <td>{player1name}</td>
                  <td>{player1points}</td>
                </tr>
                <tr>
                  <td>{player2name}</td>
                  <td>{player2points}</td>
                </tr>
              </tbody>
            </table>

          </div>

          <div className="playingcard">

            {player1cards[1]}
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  gameplay: state.defaultgame.gameplay,
  user: state.auth
})

export default connect(mapStateToProps, { getGamePlay, addTurn })(Defaultgame)



