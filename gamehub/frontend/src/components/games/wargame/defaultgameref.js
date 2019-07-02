import React, { Component, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getGamePlay, getNewGame, setGame, getActiveGames } from '../../actions/defaultgame'
import { defaultgame, cards } from './datahelpers.js'
import { addTurn } from '../../actions/defaultgame'
import Activeplayers from '../layout/Activeplayers'
import Activegames from '../layout/Activegames'
import Loaders from '../layout/Loaders'
import Spinner from 'react-bootstrap/Spinner'
// var chatSocket = new WebSocket(
//   'ws://' + window.location.host +
//   '/ws/defaultgame/turns/');
export class Defaultgame extends Component {
  state = {
    gameplay: [],
    loading: false,
    name: 'defaultgame',
  }
  onClick1 = (e) => {
    // var lead = { "round_id": 13, "action": 99 }
    // chatSocket.send(JSON.stringify({
    //   'message': lead
    // }));
  }
  componentDidUpdate() {
    // chatSocket.onmessage = (e) => {
    //   var data = JSON.parse(e.data);
    //   var message = data['message'];
    //   this.props.getActiveGames(this.state.name)
    // };
  }
  componentDidMount() {
    let gameid = document.cookie.split("=")[1]
    this.props.getGamePlay(this.state.name, gameid)
    // this.props.setGame(this.state.name)
    this.props.getActiveGames(this.state.name)
  }
  render() {
    console.log(this.props.activegames)
    const newGame = () => {
      this.props.getNewGame(this.state.name, () => {
        document.cookie = `gameid=${this.props.newgame.id}`
        // let gameid = document.cookie.split("=")[1]
        // this.setState({ gameid: this.props.newgame.id })
        // const gameplay = this.props.getGamePlay(this.state.name, this.props.newgame.id)
        // this.setState({ gameplay: gameplay })
        var lead = { "round_id": 13, "action": 99 }
        chatSocket.send(JSON.stringify({
          'message': lead
        }));
      })
    }
    const test = () => {
    }
   
    const playercards = []
    const data = this.props.gameplay.players ? defaultgame(this.props.gameplay) : null
    console.log(data)
    if (data && data.gameplay && data.gameplay.players) {
      for (var player in data.gameplay.players) {
        const current = <div className="playingcard">
          {
            data.gameplay.players[player][0].map(action => {
              return <img key={action + player} src={require(`../images/cards/${action}C.png`)} />
            })}
        </div>
        playercards.push(current)
        console.log("inasda")
      }
    }
    console.log(data)
    console.log(playercards)
    return (
      <section key="game.url" className="bg-common game-top-div d-flex justify-content-center"
        style={{ height: "57em" }} >
        <div key="{game.url}jm" className="col-12 col-md-2 bg-common game-top-div game-cards  bg-alternate-2">
          <Activeplayers />
          <button className="btn btn-success btn-lg leader text-dark">Leaderboard</button>
          <button className="btn btn-success btn-lg leader text-dark">Archive</button>
        </div>
        <div className="col-12 col-md-10 bg-alternate-2 " style={{ height: "52em" }} >

        {/* <div className="playingcard"> */}
 {/* player 1 cards  */}

          {/* <div className="playingcard"> */}
          {/* {player1cards[0]} */}
          {/* </div> */}
          {playercards[0]}

{/* player 1 cards  */}

{/* </div> */}

          <div className="playingcard">
            <img className="aces" src={require("../images/aces.png")} />

            {/* <img className="aces" src={require("../images/aces.png")} /> */}

{/* middlesection */}

            {/* {newprizecard} */}





            <table className="table table-borderless table-dark  text-center" style={{ width: "25%" }}>
              <thead className="text-dark login" style={{ background: "red" }}>
                <tr>
                  <th scope="col">Player</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              <tbody className="bg-light text-dark table-shadow ">
                <tr>
                  {/* <td>{player1name}</td> */}
                  {/* <td>{player1points}</td> */}
                </tr>
                <tr>
                  {/* <td>{player2name}</td> */}
                  {/* <td>{player2points}</td> */}
                </tr>
              </tbody>
            </table>




            
          </div>

          {/* <div className="playingcard"> */}
        {/* player 2 cards  */}  
          {playercards[1]}
          {/* <div className="playingcard"> */}
          {/* {player1cards[1]} */}
          {/* </div> */}
           {/* player 2 cards  */}
{/* </div> */}


        </div>
       





        <div key="{game.url}j" className="col-12 col-md-2 bg-common game-top-div game-cards  bg-alternate-2"
          style={{
            display: "flex", flexDirection: "column",
            justifyContent: "space-evenly"
          }}>
          <Activegames gamename={this.state.name} activegames={this.props.activegames} />
          <div>
            <button onClick={() => { newGame() }} className="btn btn-success btn-lg leader text-dark">New Game</button>
            <button onClick={test} className="btn btn-danger btn-lg rules">Rules</button>
          </div>
        </div>
      </section >
    )
  }
}
const mapStateToProps = state => ({
  gameplay: state.defaultgame.gameplay,
  user: state.auth,
  newgame: state.defaultgame.newgame[0],
  activegames: state.defaultgame.activegames
})
export default connect(mapStateToProps, { getNewGame, getGamePlay, addTurn,  getActiveGames })(Defaultgame)
