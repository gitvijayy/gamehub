import React, { Component, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getGamePlay, getNewGame, setGame, getActiveGames } from '../../actions/defaultgame'
import { defaultgame, cards, getcookie, animate } from './datahelpers.js'
import { addTurn } from '../../actions/defaultgame'
import Activeplayers from '../layout/Activeplayers'
import Activegames from '../layout/Activegames'
import Loaders from '../layout/Loaders'
import Spinner from 'react-bootstrap/Spinner'
import { ANIMATION_STATUS } from '../../actions/types'

var chatSocket = new WebSocket(
  'ws://' + window.location.host +
  '/ws/defaultgame/turns/');

export class Defaultgame extends Component {



  state = {
    gameplay: [],
    loading: false,
    name: 'defaultgame',
    animate: false
  }

  // animate = () => {

  //   if (this.props.gameplay.gameplay) {
  //     console.log("asdasdadsadasdada")
  //     console.log(this.props.gameplay.gameplay.animate)
  //     this.setState({ animate: this.props.gameplay.gameplay.animate })

  //     if (this.props.gameplay.gameplay.animate) {
  //       setTimeout(
  //         function () {
  //           this.setState({ animate: false });
  //         }
  //           .bind(this),
  //         5000
  //       );
  //       return <Loaders />
  //     }
  //   }



  // }



  componentDidUpdate() {
    chatSocket.onmessage = (e) => {
      // var data = JSON.parse(e.data);
      // var message = data['message'];

      getcookie((id) => {
        this.props.getActiveGames(this.state.name)
        this.props.getGamePlay(this.state.name, id)
      })

    };
  }

  componentDidMount() {


    getcookie((id) => {
      this.props.getGamePlay(this.state.name, id)
      this.props.getActiveGames(this.state.name)
    })
  }

  render() {

    const newGame = () => {
      this.props.getNewGame(this.state.name, () => {
        document.cookie = `gameid=${this.props.newgame.id}`
        // var lead = { "round_id": 13, "action": 99 }
        chatSocket.send(JSON.stringify({
          'message': "message"
        }));
      })


    }


    const test = () => {
    }

    const data = this.props.gameplay





    // console.log(this.props.gameplay)
    const playercards = []
    const playerpoints = []
    let newprizecard = ""
    let player1bet = <img className="playerbet" key={"p1"} src={require(`../images/bet2.png`)} />
    let player2bet = <img className="playerbet" key={"p2"} src={require(`../images/bet2.png`)} />
    // let playerbets = [<img className="playerbet" key={"p1"} src={require(`../images/bet2.png`)} />,
    // <img className="playerbet" key={"p2"} src={require(`../images/bet2.png`)} />]


    let gameblock =
      <div className="col-12 col-md-10 bg-alternate-2 " style={{ height: "52em" }} >
        <Loaders />
      </div>

    //console.log(this.props.gameplay)
    // const data = this.props.gameplay.players ? defaultgame(this.props.gameplay) : null


    // if (data && data.gameplay && data.gameplay.animate) {
    //   console.log("asdasdasdad")
    //   this.setState({ animate: data.gameplay.animate })
    //   setTimeout(() => {
    //     this.setState({ animate: false })
    //     // data.gameplay.animate = false
    //   },
    //     5000);

    // }


    console.log(data)
    // console.log(this.props.gameplay)
    if (data && data.gameplay && data.gameplay.players) {



      //console.log(data.gameplay.animate)





      if (data.gameplay.prizeCard) {
        newprizecard = <img className="prizecard" key={data.gameplay.prizeCard} src={require(`../images/cards/${data.gameplay.prizeCard}D.png`)} />
      }

      if (data.gameplay.current[0]) {
        player1bet = <img className="prizecard" key={"p1"} src={require(`../images/cards/${data.gameplay.current[0]}H.png`)} />
      }

      if (data.gameplay.current[1]) {
        player2bet = <img className="prizecard" key={"p2"} src={require(`../images/cards/${data.gameplay.current[1]}C.png`)} />
      }

      if (!data.gameplay.current[1] && !data.gameplay.current[0]) {
        player2bet = <img className="prizecard" key={"p2"} src={require(`../images/blackBack.png`)} />
      }








      let suit = -1
      let playerindex = 0
      for (var player in data.gameplay.players) {

        // if (this.props.user && this.props.user.user
        //   && this.props.user.user.username
        //   && player == this.props.user.user.username) {

        //   if (data.gameplay.current[playerindex]) {
        //     playerbets[playerindex] = <img className="prizecard" key={"p2"} src={require(`../images/blackBack.png`)} />
        //   }
        // }

        // playerindex++


        suit++
        const current = <div className="playingcard">
          {
            data.gameplay.players[player][0].map((action, index) => {
              if (this.props.user && this.props.user.user
                && this.props.user.user.username
                && player == this.props.user.user.username) {
                return <img key={action + player} onClick={(e) => { addTurn(e) }}
                  id={action} src={require(`../images/cards/${action}${data.gameplay.suits[suit]}.png`)} />
              } else {
                return <img key={action + player}
                  src={require(`../images/blackBack.png`)} />
              }

            })}

        </div>

        playercards.push(current)
        const points = <tr key={player}>
          <td>{player}</td>
          <td>{data.gameplay.playerpoints[player]}</td>

        </tr>

        playerpoints.push(points)

        if (this.props.animate) {
          player1bet = <img className="prizecard" key={"p1"} src={require(`../images/cards/${data.gameplay.previous[0]}H.png`)} />
          player2bet = <img className="prizecard" key={"p2"} src={require(`../images/cards/${data.gameplay.previous[1]}C.png`)} />
          newprizecard = <img className="prizecard" key={data.gameplay.prizeCard} src={require(`../images/cards/${data.gameplay.previous[2]}D.png`)} />
        }

        if (Object.keys(data.gameplay.players).length > 1 && data.gameplay.status != "Game Over") {


          gameblock = <div className="col-12 col-md-10 bg-alternate-2 " style={{ height: "52em" }} >
            <div className="player1name">
              <p className="logo" >{Object.keys(data.gameplay.players)[0]}</p>
            </div>
            {playercards[0]}
            <div className="playingcard middlebox">
              {/* <img className="aces" src={require("../images/aces.png")} /> */}
              <div>
                <button onClick={test} className="btn btn-danger btn-lg rules">{Object.keys(data.gameplay.players)[0]}</button>
                {player1bet}
                {/* {playerbets[0]} */}
              </div>
              <div>
                <button onClick={test} className="btn btn-success btn-lg leader text-dark">Prize</button>
                {newprizecard}
              </div>
              <div>
                <button onClick={test} className="btn btn-danger btn-lg rules">{Object.keys(data.gameplay.players)[1]}</button>
                {player2bet}
                {/* {playerbets[1]} */}
              </div>

              <table className="table table-borderless table-dark  text-center" style={{ width: "25%", marginTop: "2%" }}>
                <p className="logo" style={{ marginTop: "10%", marginLeft: "29%" }}>Goofspiel</p>
                <thead className="text-dark login" style={{ background: "red" }}>

                  <tr>
                    <th scope="col">Player</th>

                    <th scope="col">Points</th>

                  </tr>
                </thead>
                <tbody className="bg-light text-dark table-shadow ">
                  {playerpoints}
                </tbody>
              </table>
            </div>
            {playercards[1]}
            <div className="player2name">
              <p className="logo" >{Object.keys(data.gameplay.players)[1]}</p>
            </div>
          </div>
        }
      }
    }

    const addTurn = (e) => {
      let turn = {
        round_id: data.gameplay.roundid,
        action: e.target.id
      }
      // console.log(turn)
      this.props.addTurn(this.state.name, turn, () => {
        chatSocket.send(JSON.stringify({
          'message': "message"
        }));
      })

    }


    return (

      <section key="game.url" className="bg-common game-top-div d-flex justify-content-center"
        style={{ height: "57em" }} >
        <div key="{game.url}jm" className="col-12 col-md-2 bg-common game-top-div game-cards bg-alternate-2">
          <Activeplayers />
          <button className="btn btn-success btn-lg leader text-dark">Leaderboard</button>
          <button className="btn btn-success btn-lg leader text-dark">Archive</button>
        </div>
        {gameblock}
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
  activegames: state.defaultgame.activegames,
  animate: state.defaultgame.animate
})

export default connect(mapStateToProps, { getNewGame, getGamePlay, addTurn, setGame, getActiveGames })(Defaultgame)

