import React, { Component, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getGamePlay, getNewGame, setGame, getActiveGames, addTurn, getActivePlayers } from '../../../actions/goofspiel.js'
import { goofspielGamePlay, cards, getcookie, animate, memoryCards } from './datahelpers.js'
// import { addTurn } from '../../actions/defaultgame'
import Activeplayers from '../../layout/Activeplayers'
import Activegames from '../../layout/Activegames'
import Loaders from '../../layout/Loaders'
import Loader2 from '../../layout/Loaders'
import Spinner from 'react-bootstrap/Spinner'
import { ANIMATION_STATUS } from '../../../actions/types'
import { StyleSheet, css } from 'aphrodite';
import Rules from '../../layout/Rules'
import Chat from '../../layout/Chat'

import Loader from 'react-loader-spinner'

import { styles } from './datahelpers'
import { cssAnimations } from '../goofspiel/datahelpers.js';
var chatSocket = ""
let flip = ""
export class Memory extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      name: 'memory',
      modalShowRules: false,
      gamename: 'Memory',
      rules: ["Turn over any two cards.",
        "If the two cards suit and number match, its a pair. you win a point", "Watch and remember during the other players turn.",
        "A players turn is not over until they are unable to make a matching pair.",
        "The game continues in this fashion until all the cards are played.",
        "The game is over when all the cards have been matched.",
        "The player with the most matches wins."],
      messages: []
    }

  }

  componentDidUpdate() {
    chatSocket.onmessage = (e) => {
      var data = JSON.parse(e.data);
      var message = data['message'];


      if (message.type != "Chat") {

        getcookie((id) => {
          if (message == "new game") {
            this.props.getActiveGames()
          }
          this.props.getActivePlayers()
          this.props.getGamePlay(this.state.name, id)
        })
      }
    }
  }

  componentDidMount() {
    this.setState({
      messages: ["mounted"]
    })
    getcookie((id) => {
      chatSocket = new WebSocket(
        'ws://' + window.location.host +
        `/ws/games/${id}/`);
      this.props.getGamePlay(this.state.name, id)
    })
  }

  render() {




    let gameblock;

    getcookie((id) => {

      if (id > 0) {
        gameblock =
          <Fragment>
            <h1 className="logo" style={{ position: "absolute", top: "250px", left: "38%" }}>Waiting for player...</h1>
            <Loaders />
            <h1 className="logo" style={{ position: "absolute", top: "500px", left: "38%" }}>Waiting for player...</h1>
          </Fragment>
      } else {
        gameblock =
          <Fragment>
            <h1 className="logo" style={{ position: "absolute", top: "250px", left: "40%" }}>Start New Game...</h1>
            <Loaders />
            <h1 className="logo" style={{ position: "absolute", top: "500px", left: "38%" }}>Select Active Game...</h1>
          </Fragment>
      }

    })

    let spinner = (<Spinner animation="border" role="status" style={{ marginRight: "7%" }}> <span className="sr-only">Loading...</span></Spinner>)
    let player1Spinner = ""
    let player2Spinner = ""

    let players = []

    const setSocket = (id) => {
      chatSocket = new WebSocket(
        'ws://' + window.location.host +
        `/ws/games/${id}/`);
    }

    const newGame = (total) => {
      let game = {
        "name": "Memory",
        "no_of_players": total
      }
      this.props.getNewGame(game, (id) => {
        document.cookie = `gameid=${id}`
        chatSocket.send(JSON.stringify({
          'message': "new game"
        }));
      })
    }

    const playerSelection = (e) => {
      let turn = {
        round_id: data.gameplay.roundid,
        action: e.target.id
      }
      this.props.addTurn(this.state.name, turn, () => {
        chatSocket.send(JSON.stringify({
          'message': "add turn"
        }));
      })
    }

    let data = this.props.gameplay

    if (data && data.gameplay && data.gameplay.cards && data.gameplay.status == "Active") {
      let cards = data.gameplay.cards
      players = Object.keys(data.gameplay.playerdata)

      let player2block = ""

      gameblock =
        (< Fragment >
          <div className="memorycard" style={{ marginTop: "3%" }}>
            {
              cards.map((action, index) => {
                let faceupCards = data.gameplay.faceupCards
                let turns = data.gameplay.turns
                let players = Object.keys(data.gameplay.playerdata)
                let flipCards = turns.length % 2 == 0 ? [turns[turns.length - 2], turns[turns.length - 1]] : [turns[turns.length - 1], -1]
                flip = ""

                if (data.gameplay.playerdata[players[0]] && data.gameplay.playerdata[players[0]].turn) {
                  player1Spinner = spinner
                } else {
                  player2Spinner = spinner
                }

                if (!data.gameplay.turns.length) {
                  player1Spinner = spinner
                  player2Spinner = ""
                }
                // }
                if (!faceupCards.includes(index)) {
                  if (index == flipCards[0] && this.props.animation && this.props.animation.flip) {
                    return <img onClick={(e) => {
                      playerSelection(e)
                    }} key={index} id={index} name={action} className={this.props.animation.flip}
                      src={this.props.animation.src[0]} />
                  }
                  if (index == flipCards[1] && this.props.animation && this.props.animation.flip) {
                    return <img onClick={(e) => {
                      playerSelection(e)
                    }} key={index} id={index} name={action} className={this.props.animation.flip}
                      src={this.props.animation.src[1]} />
                  }
                  return <img onClick={(e) => {
                    playerSelection(e)
                  }} key={index} id={index} name={action} className={flip}
                    src={require(`../../images/blackBack.png`)} />
                }

                if (faceupCards.includes(index)) {
                  if (index == flipCards[0] || index == flipCards[1]) {
                    return <img key={index} id={index} name={action} className={css(styles.flipInY)} src={require(`../../images/cards/${action}.png`)} />
                  }
                  return <img key={index} id={index} name={action} className={"this.state.flip"} src={require(`../../images/cards/${action}.png`)} />
                }

              })
            }
          </div>



          <div className="playingcard middlebox">
            <div >
              <h3 className={css(styles.pointsMemory)}>{data.gameplay.playerdata[players[0]].points} Point</h3>
              <h5 className={css(styles.pointsMemory)}>{data.gameplay.playerdata[players[0]].chances} Chance</h5>
              <button className="btn btn-danger btn-lg rules" style={{ marginTop: 0 }}>{player1Spinner}{players[0]}</button>
            </div>
            <div>
              <p className="logo" style={{ marginLeft: "15%" }}>Memory</p>
              <img style={{ width: "150px", boxShadow: "none", paddingBottom: "25px" }} src={require(`../../images/aces.png`)} />
            </div>
            {players[1] && < div >
              <h3 className={css(styles.pointsMemory)}>{data.gameplay.playerdata[players[1]].points} Point</h3>
              <h5 className={css(styles.pointsMemory)}>{data.gameplay.playerdata[players[1]].chances} Chance</h5>
              <button className="btn btn-danger btn-lg rules" style={{ marginTop: 0 }}>{player2Spinner}{players[1]}</button>
            </div >}
          </div>






        </Fragment >
        )




      if (this.props.animation && this.props.animation.animate && this.props.animation.animate == "startgame") {

        gameblock =
          <Fragment>
            <h1 className="logo" style={{ position: "absolute", top: "250px", left: "38%" }}>Starting New Game...</h1>
            <Loaders />
            <h1 className="logo" style={{ position: "absolute", top: "500px", left: "38%" }}>Starting New Game...</h1>
          </Fragment>

      }




    }
    let modalClose = () => this.setState({ modalShowLogin: false, modalShowRules: false });
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    return (

      <section key="game.url" className="bg-common game-top-div  justify-content-center"
        style={{ height: "57em" }} >

        <div key="{game.url}j" className="col-12 col-md-2 bg-common game-top-div game-cards bg-alternate-2">
          <Activegames gamename={this.state.name} setSocket={setSocket} />
          <div>
            <button onClick={() => { newGame(2) }} className="btn btn-success btn-lg leader text-dark">2 Player Game</button>
            <button onClick={() => { newGame(1) }} className="btn btn-success btn-lg leader text-dark">1 Player Game</button>
            <button role="button" onClick={() => this.setState({ modalShowRules: true })}
              className="btn btn-danger btn-lg rules">Rules</button>
          </div>

        </div>

        <div className="col-12 col-md-10 bg-alternate-2 " style={{ height: "52em" }} >
          {gameblock}

        </div>



        <div key="{game.url}jm" className="col-12 col-md-2 bg-common game-top-div game-cards bg-alternate-2">
          <Activeplayers />
          <div style={{ marginTop: "10%" }}>
            <Chat messages={this.state.messages} />

          </div>
        </div>

        <Rules show={this.state.modalShowRules} onHide={modalClose} gamename={this.state.gamename} rules={this.state.rules} />
      </section >
    )
    ////////////////////////////////////////////////////////////////////////////////////////   
  }
}
const mapStateToProps = state => ({
  gameplay: state.goofspiel.gameplay,
  user: state.auth,
  newgame: state.goofspiel.newgame[0],
  animation: state.goofspiel.memoryAnimation
})
export default connect(mapStateToProps, { getNewGame, getGamePlay, addTurn, setGame, getActiveGames, getActivePlayers })(Memory)

