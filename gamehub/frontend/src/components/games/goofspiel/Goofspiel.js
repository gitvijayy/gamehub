import React, { Component, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getGamePlay, getNewGame, setGame, getActiveGames, addTurn, getActivePlayers } from '../../../actions/goofspiel.js'
import { goofspielGamePlay, cards, getcookie, animate, getCookies } from './datahelpers.js'
// import { addTurn } from '../../actions/defaultgame'
import Activeplayers from '../../layout/Activeplayers'
import Activegames from '../../layout/Activegames'
import Loaders from '../../layout/Loaders'
import Loader2 from '../../layout/Loaders'
import Spinner from 'react-bootstrap/Spinner'
import { ANIMATION_STATUS } from '../../../actions/types'
// import { StyleSheet, css } from 'aphrodite';
// import { fadeIn } from 'react-animations'
// import { bounceInUp, bounceInDown, fadeOutLeft, fadeOutRight } from 'react-animations'
// import { styles } from './datahelpers'
import { cssAnimations } from './datahelpers'
import Rules from '../../layout/Rules'
import Chat from '../../layout/Chat'
import Loader from 'react-loader-spinner'
import { css } from 'aphrodite';
// import { styles } from 'react-animations/lib/swing';

import { styles } from './datahelpers'

var chatSocket = ""


export class Goofspiel extends Component {


  constructor(...args) {
    super(...args);

    this.state = {
      name: 'goofspiel',

      modalShowRules: false,
      gamename: 'Goofspiel',
      rules: ["Each player receives a suit of 13 cards to play against each other",
        "A third suit of cards is designated as the prize cards players have to bid for",
        "Each card is worth their face value. A's are worth 1 point, J's are worth 11 points, Q's are worth 12 points, K's are worth 13 points",
        "On each turn, a prize card is revealed from the prize suit",
        "Each player then play a card to bid for the prize card. The player with the higher bidding card collects the prize card",
        "The game ends when there are no more prize cards available for bidding",
        "When the game ends, the player with the highest number of prize cards points wins"],
      messages: []


    }


  }



  componentDidUpdate() {
    chatSocket.onmessage = (e) => {
      var data = JSON.parse(e.data);
      var message = data['message'];
      getcookie((id) => {
        this.props.getActivePlayers()
        this.props.getActiveGames(this.state.name)
        this.props.getGamePlay(this.state.name, id)
      })

      if (message.type == "Chat") {
        this.setState({
          messages: [...this.state.messages, message]
        })
      }


    };
  }

  componentDidMount() {

    getcookie((id) => {
      chatSocket = new WebSocket(
        'ws://' + window.location.host +
        `/ws/games/${id}/`);
      this.props.getGamePlay(this.state.name, id)
      this.props.getActiveGames()
    })
  }

  render() {

    let user1;
    if (this.props.user && this.props.user.user && this.props.user.user.username) {
      user1 = this.props.user.username
    }



    const setSocket = (id) => {
      chatSocket = new WebSocket(
        'ws://' + window.location.host +
        `/ws/games/${id}/`);
    }

    const newGame = () => {
      let game = {
        "name": "Goofspiel",
        "no_of_players": 2
      }
      this.props.getNewGame(game, (id) => {
        // this.props.getNewGame(this.state.name, (id) => {
        // console.log(this.props.newgame)
        // id = this.props.newgame.id
        // chatSocket = new WebSocket(
        //   'ws://' + window.location.host +
        //   `/ws/games/${id}/`);
        document.cookie = `gameid=${id}`
        chatSocket.send(JSON.stringify({
          'message': "message"
        }));
      })
    }

    let onKeyDown = (e, user) => {

      if (e.keyCode == 13) {
        let message = {
          "name": user,
          "message": e.target.value,
          "type": "Chat"
        }

        e.target.value = ""
        chatSocket.send(JSON.stringify({
          'message': message
        }));

      }

    }

    /////////////////////////////////////////////////////////////
    const data = this.props.gameplay


    const playercards = [], playerpoints = []
    let newprizecard = "", player1Name = "", player2Name = ""
    let roundid = 0;
    let player1bet = <img className="playerbet" key={"p1"} src={require(`../../images/bet2.png`)} />
    let player2bet = <img className="playerbet" key={"p2"} src={require(`../../images/bet2.png`)} />
    let player1bet1 = ""
    let player2bet1 = ""
    // let spinner = (<Spinner animation="border" role="status" className={cssAnimations.betblockSpinner}>

    //   <span className="sr-only">Loading...</span>
    // </Spinner>)

    let spinner = (<Spinner animation="border" role="status" style={{ marginRight: "7%" }}>

      <span className="sr-only">Loading...</span>
    </Spinner>)
    // let gameblock =
    //   <div className="col-12 col-md-10 bg-alternate-2 " style={{ height: "52em" }} >
    //     <Loaders />
    //   </div>

    let gameblock;



    getcookie((id) => {
      if (id > 0) {
        gameblock =
          <div className="col-12 col-md-10 bg-alternate-2 " style={{ height: "52em" }} >
            <h1 className="logo" style={{ position: "absolute", top: "250px", left: "38%" }}>Waiting for player...</h1>
            <Loaders />
            <h1 className="logo" style={{ position: "absolute", top: "500px", left: "38%" }}>Waiting for player...</h1>
          </div>
      } else {
        gameblock =
          <div className="col-12 col-md-10 bg-alternate-2 " style={{ height: "52em" }} >
            <h1 className="logo" style={{ position: "absolute", top: "250px", left: "40%" }}>Start New Game...</h1>
            <Loaders />
            <h1 className="logo" style={{ position: "absolute", top: "500px", left: "38%" }}>Select Active Game...</h1>
          </div>
      }
    })

    if (data.gameplay && data.gameplay.status && data.gameplay.status == "Game Over") {
      gameblock =
        <div className="col-12 col-md-10 bg-alternate-2 " style={{ height: "52em" }} >

          <h1 className="logo" style={{ position: "absolute", top: "250px", left: "43%" }}>{data.gameplay.winner}</h1>

          <Loaders />

          <h1 className="logo" style={{ position: "absolute", top: "500px", left: "43%" }}>Game Over</h1>

        </div >
    }




    ////////////////////////////////////////////////////////////////


    if (data && data.gameplay && data.gameplay.players) {
      if (data.gameplay.prizeCard) {
        newprizecard = <img className={cssAnimations.zoomIn} key={data.gameplay.prizeCard} src={require(`../../images/cards/${data.gameplay.prizeCard}D.png`)} />
      }
      if (data.gameplay.current[0]) {
        player1bet = <img className={cssAnimations.bounceInDown} key={"p1"} src={require(`../../images/blackBack.png`)} />
      }
      if (data.gameplay.current[1]) {
        player1bet = <img className="prizecard" key={"p1"} src={require(`../../images/blackBack.png`)} />
      }

      let suit = -1

      for (var player in data.gameplay.players) {
        suit++

        /////////////////
        const current =
          (<div className="playingcard playingcard1">
            {
              data.gameplay.players[player][0].map((action, index) => {
                if (this.props.user && this.props.user.user
                  && this.props.user.user.username
                  && player == this.props.user.user.username) {
                  return <img key={action + player} onClick={(e) => { addTurn(e) }}
                    id={action} src={require(`../../images/cards/${action}${data.gameplay.suits[suit]}.png`)} />
                } else {
                  return <img key={action + player}
                    src={require(`../../images/blackBack.png`)} />
                }
              })}
          </div>)
        ////////////


        playercards.push(current)

        const points =
          (<tr key={player}>
            <td>{player}</td>
            <td>{data.gameplay.playerpoints[player]}</td>
          </tr>)

        playerpoints.push(points)

        // if (!data.gameplay.current[0]) {
        //   player1bet = spinner
        // } else if (!data.gameplay.current[1]) {
        //   player2bet = spinner
        // }
        if (!data.gameplay.current[0]) {
          player1bet1 = spinner
        } else if (!data.gameplay.current[1]) {
          player2bet1 = spinner
        }

        roundid = Object.keys(data.gameplay.players)[0].length
        if (this.props.animate && this.props.animate == "turn") {
          let anime = ""
          roundid = Object.keys(data.gameplay.players)[0].length - 1
          if (data.gameplay.previous[0] > data.gameplay.previous[1]) {
            anime = cssAnimations.fadeOutLeft
          } else if (data.gameplay.previous[0] < data.gameplay.previous[1]) {
            anime = cssAnimations.fadeOutRight
          } else {
            anime = cssAnimations.zoomOut
          }
          if (data.gameplay.previous[0]) {
            player1bet = <img className={cssAnimations.flipInY} key={"p1"}
              src={require(`../../images/cards/${data.gameplay.previous[0]}H.png`)} />
          }

          if (data.gameplay.previous[1]) {
            player2bet = <img className={cssAnimations.bounceInUp} key={"p2"}
              src={require(`../../images/cards/${data.gameplay.previous[1]}C.png`)} />
          }
          if (data.gameplay.previous[2]) {
            newprizecard = <img className={anime} key={data.gameplay.prizeCard}
              src={require(`../../images/cards/${data.gameplay.previous[2]}D.png`)} />
          }
        }


        if (Object.keys(data.gameplay.players).length > 1 && data.gameplay.status != "Game Over") {

          player1Name = <p className="logo text-white" style={{ position: "absolute" }} >{Object.keys(data.gameplay.players)[0]}</p>
          player2Name = <p className="logo text-white" style={{ position: "absolute", top: "925px" }} >{Object.keys(data.gameplay.players)[1]}</p>
          gameblock = <div className="col-12 col-md-10 bg-alternate-2 " style={{ height: "52em" }} >
            {/* <div className="player1name">
              <p className="logo" >{Object.keys(data.gameplay.players)[0]}</p>
            </div> */}
            {playercards[0]}
            <div className="playingcard middlebox">
              {/* <img className="aces" src={require("../images/aces.png")} /> */}
              <div>
                <button className="btn btn-danger btn-lg rules">{player1bet1}{Object.keys(data.gameplay.players)[0]}</button>
                {player1bet}
                {/* {playerbets[0]} */}
              </div>
              <div>
                <button className="btn btn-success btn-lg leader text-dark" style={{ height: "65px" }}>Round {roundid}<br />Prize</button>
                {newprizecard}
              </div>
              <div>
                <button className="btn btn-danger btn-lg rules">{player2bet1}{Object.keys(data.gameplay.players)[1]}</button>
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
            {/* <div className="player2name">
              <p className="logo" >{Object.keys(data.gameplay.players)[1]}</p>
            </div> */}
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

    if (this.props.animate && this.props.animate == "startgame") {

      gameblock =
        <div className="col-12 col-md-10 bg-alternate-2 " style={{ height: "52em" }} >
          <h1 className="logo" style={{ position: "absolute", top: "250px", left: "38%" }}>Player Connected...</h1>
          <Loaders />
          <h1 className="logo" style={{ position: "absolute", top: "500px", left: "38%" }}>Starting New Game...</h1>
        </div>

    }

    let modalClose = () => this.setState({ modalShowLogin: false, modalShowRules: false });
    return (

      <section key="game.url" className="bg-common game-top-div d-flex justify-content-center"

        style={{ height: "57em" }} >

        <div key="{game.url}j" className="col-12 col-md-2 bg-common game-top-div game-cards  bg-alternate-2"
          style={{
            display: "flex", flexDirection: "column",
            justifyContent: "none"
          }}>
          <Activegames gamename={this.state.name} setSocket={setSocket} />
          <div style={{ marginTop: "10%" }}>
            <button onClick={() => { newGame() }} className="btn btn-success btn-lg leader text-dark">New Game</button>
            <button role="button" onClick={() => this.setState({ modalShowRules: true })}
              className="btn btn-danger btn-lg rules">Rules</button>




          </div>



        </div>




        {player1Name}
        {gameblock}
        {player2Name}
        <div key="{game.url}jm" style={{ justifyContent: "none" }} className="col-12 col-md-2 bg-common game-top-div game-cards bg-alternate-2">
          <Activeplayers />
          <div style={{ marginTop: "20%" }}>
            {/* <button className="btn btn-success btn-lg leader text-dark">Leaderboard</button>
            <button className="btn btn-success btn-lg leader text-dark">Archive</button> */}
            <Chat messages={this.state.messages} onKeyDown={onKeyDown} />
          </div>
        </div>


        <Rules show={this.state.modalShowRules} onHide={modalClose} gamename={this.state.gamename} rules={this.state.rules} />
      </section >

    )
  }
}
const mapStateToProps = state => ({
  gameplay: state.goofspiel.gameplay,
  user: state.auth,
  newgame: state.goofspiel.newgame[0],
  activegames: state.goofspiel.activegames,
  animate: state.goofspiel.animate
  // gameid:getcookie()
})

export default connect(mapStateToProps, { getNewGame, getGamePlay, addTurn, setGame, getActiveGames, getActivePlayers })(Goofspiel)
