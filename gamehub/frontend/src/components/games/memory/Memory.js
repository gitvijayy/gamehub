import React, { Component, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getGamePlay, getNewGame, setGame, getActiveGames, addTurn } from '../../../actions/goofspiel.js'
import { goofspielGamePlay, cards, getcookie, animate, memoryCards } from './datahelpers.js'
// import { addTurn } from '../../actions/defaultgame'
import Activeplayers from '../../layout/Activeplayers'
import Activegames from '../../layout/Activegames'
import Loaders from '../../layout/Loaders'
import Loader2 from '../../layout/Loaders'
import Spinner from 'react-bootstrap/Spinner'
import { ANIMATION_STATUS } from '../../../actions/types'
import { StyleSheet, css } from 'aphrodite';
// import { fadeIn } from 'react-animations'
// import { bounceInUp, bounceInDown, fadeOutLeft, fadeOutRight } from 'react-animations'
// import { styles } from './datahelpers'
// import { cssAnimations } from './datahelpers'
import Loader from 'react-loader-spinner'
// import { styles } from 'react-animations/lib/swing';
import { styles } from './datahelpers'
import { cssAnimations } from '../goofspiel/datahelpers.js';



var chatSocket = ""

let flip = ""



export class Memory extends Component {

  state = {
    name: 'memory'



  }


  componentDidUpdate() {

    chatSocket.onmessage = (e) => {
      var data = JSON.parse(e.data);
      var message = data['message'];

      getcookie((id) => {

        if (message == "new game") {
          this.props.getActiveGames()
        }

        this.props.getGamePlay(this.state.name, id)
      })


    }

  }


  componentDidMount() {

    getcookie((id) => {
      chatSocket = new WebSocket(
        'ws://' + window.location.host +
        `/ws/games/${id}/`);
      this.props.getGamePlay(this.state.name, id)
    })


  }

  render() {

    let gameblock =
      <Fragment>
        <h1 className="logo" style={{ position: "absolute", top: "250px", left: "38%" }}>Waiting for player...</h1>
        <Loaders />
        <h1 className="logo" style={{ position: "absolute", top: "500px", left: "38%" }}>Waiting for player...</h1>
      </Fragment>


    let spinner = (<Spinner animation="border" role="status" style={{ marginRight: "7%" }}> <span className="sr-only">Loading...</span></Spinner>)

    let player1Spinner = ""
    let player2Spinner = ""
    let player1Name = ""
    let player2Name = ""
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



      gameblock =

        (< Fragment >
          <div className="memorycard" style={{ marginTop: "1%" }}>
            {
              cards.map((action, index) => {

                let faceupCards = data.gameplay.faceupCards
                let turns = data.gameplay.turns
                let flipCards = turns.length % 2 == 0 ? [turns[turns.length - 2], turns[turns.length - 1]] : [turns[turns.length - 1], -1]

                flip = ""
                players = Object.keys(data.gameplay.playerdata)

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
            <div>
              <h3 className={css(styles.pointsMemory)}>2 Points</h3>
              <h5 className={css(styles.pointsMemory)}>15 Chances</h5>
              <button className="btn btn-danger btn-lg rules" style={{ marginTop: 0 }}>{player1Spinner}{players[0]}</button>

            </div>

            <div>
              <p className="logo">Memory</p>



              {/* <img src={require(`../../images/memory-icon.png`)} /> */}
            </div>

            <div>
              <h3 className={css(styles.pointsMemory)}>2 Points</h3>
              <h5 className={css(styles.pointsMemory)}>15 Chanes</h5>
              <button className="btn btn-danger btn-lg rules" style={{ marginTop: 0 }}>{player2Spinner}{players[1]}</button>
            </div>
          </div>

        </Fragment >



        )


    }

    return (
      <section key="game.url" className="bg-common game-top-div d-flex justify-content-center"
        style={{ height: "57em" }} >
        <div key="{game.url}jm" className="col-12 col-md-2 bg-common game-top-div game-cards bg-alternate-2">
          <Activeplayers />
          <button className="btn btn-success btn-lg leader text-dark">Leaderboard</button>
          <button className="btn btn-success btn-lg leader text-dark">Archive</button>
        </div>

        <div className="col-12 col-md-10 bg-alternate-2 " style={{ height: "52em" }} >

          {gameblock}





        </div>

        <div key="{game.url}j" className="col-12 col-md-2 bg-common game-top-div game-cards  bg-alternate-2"
          style={{
            display: "flex", flexDirection: "column",
            justifyContent: "space-evenly"
          }}>
          <Activegames gamename={this.state.name} setSocket={setSocket} />
          <div>
            <button onClick={() => { newGame(2) }} className="btn btn-success btn-lg leader text-dark">2 Player Game</button>
            <button onClick={() => { newGame(1) }} className="btn btn-success btn-lg leader text-dark">1 Player Game</button>
            <button className="btn btn-danger btn-lg rules">Rules</button>
          </div>
        </div>



      </section >
    )
  }
}






const mapStateToProps = state => ({
  gameplay: state.goofspiel.gameplay,
  user: state.auth,
  newgame: state.goofspiel.newgame[0],
  animation: state.goofspiel.memoryAnimation
})

export default connect(mapStateToProps, { getNewGame, getGamePlay, addTurn, setGame, getActiveGames })(Memory)
