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
let mappedCards = ["1C", "1H", "1S", "1D", "2C", "2H", "2S", "2D", "3C", "3H", "3S", "3D", "4C", "4H", "4S",
  "4D", "5C", "5H", "5S", "5D", "6C", "6H", "6S", "6D", "7C", "7H", "1C", "1H", "1S", "1D", "2C", "2H", "2S", "2D", "3C", "3H", "3S", "3D", "4C", "4H", "4S",
  "4D", "5C", "5H", "5S", "5D", "6C", "6H", "6S", "6D", "7C", "7H"]
let flipSource = [0, 0]


export class Memory extends Component {

  state = {
    name: 'memory',
    turns: [],
    flip: "",
    src: [require(`../../images/blackBack.png`), require(`../../images/blackBack.png`)]


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
      setTimeout(() => {
        if (flipSource[0] != 0) {

          // this.setState({

          // })
          this.setState({
            flip: css(styles.flipInY),
            src: [flipSource[0], flipSource[1]]

          })
          setTimeout(() => {
            this.setState({
              src: [require(`../../images/blackBack.png`), require(`../../images/blackBack.png`)],
              flip: css(styles.zoomIn)
            })
          }, 500);
        }
      }, 500);

    };




  }
  // chatSocket.onmessage = (e) => {
  //   // var data = JSON.parse(e.data);
  //   // var message = data['message'];
  //   getcookie((id) => {
  //     // this.props.getActiveGames(this.state.name)
  //     // this.props.getGamePlay(this.state.name, id)
  //   })
  // };


  componentDidMount() {


    getcookie((id) => {
      chatSocket = new WebSocket(
        'ws://' + window.location.host +
        `/ws/games/${id}/`);
      this.props.getGamePlay(this.state.name, id)
      //this.props.getActiveGames(this.state.name)
    })

    setTimeout(() => {

      if (flipSource[0] != 0) {

        this.setState({
          flip: css(styles.flipInY)
        })
        this.setState({

          src: [flipSource[0], flipSource[1]]
        })
        setTimeout(() => {
          this.setState({
            src: [require(`../../images/blackBack.png`), require(`../../images/blackBack.png`)],
            flip: css(styles.zoomIn)
          })
        }, 500);
      }
    }, 500);

  }






  render() {

    let gameblock =

      <Loaders />


    let spinner = (<Spinner animation="border" role="status" style={{ marginRight: "7%" }}>
      <span className="sr-only">Loading...</span>
    </Spinner>)

    const setSocket = (id) => {
      chatSocket = new WebSocket(
        'ws://' + window.location.host +
        `/ws/games/${id}/`);
    }

    const newGame = () => {
      let game = {
        "name": "Memory"
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

    let faceupCards = [0, 0]

    let data = this.props.gameplay


    if (data && data.gameplay && data.gameplay.cards) {
      let cards = data.gameplay.cards



      gameblock =
        (<div className="memorycard">
          {

            cards.map((action, index) => {

              let faceupCards = data.gameplay.faceupCards
              let turns = data.gameplay.turns
              let flipCards = turns.length % 2 == 0 ? [turns[turns.length - 2], turns[turns.length - 1]] : [turns[turns.length - 1], -1]


              flip = ""

              if (!faceupCards.includes(index)) {

                if (index == flipCards[0]) {

                  flipSource[0] = require(`../../images/cards/${action}.png`)


                  return <img onClick={(e) => {
                    playerSelection(e)
                  }} key={index} id={index} name={action} className={this.state.flip}
                    src={this.state.src[0]} />
                }

                if (index == flipCards[1]) {

                  flipSource[1] = require(`../../images/cards/${action}.png`)

                  return <img onClick={(e) => {
                    playerSelection(e)
                  }} key={index} id={index} name={action} className={this.state.flip}
                    src={this.state.src[1]} />
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


                // if (index == cards.length - 1 || index == cards.length - 2) {
                //   return <img key={index} id={index} name={action} className={this.state.flip} src={this.state.src} />
                // }
                // if (faceupCards.indexOf(index) == faceupCards.length - 1) {
                //   // flip = (cssAnimations.flipInY1)
                //   return <img key={index} id={index} name={action} className={this.state.flip} src={this.state.src} />
                // }
                return <img key={index} id={index} name={action} className={"this.state.flip"} src={require(`../../images/cards/${action}.png`)} />
              }
            })
          }

        </div>)


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

          <div className="playingcard middlebox">

            <div>
              <h3 className={css(styles.pointsMemory)}>2 Points</h3>
              <h5 className={css(styles.pointsMemory)}>15 Chances</h5>
              <button className="btn btn-danger btn-lg rules">{spinner}Vijay</button>

            </div>

            <div>
              <p className="logo">Memory</p>
              {/* <img src={require(`../../images/memory-icon.png`)} /> */}
            </div>

            <div>
              <h3 className={css(styles.pointsMemory)}>2 Points</h3>
              <h5 className={css(styles.pointsMemory)}>15 Chances</h5>
              <button className="btn btn-danger btn-lg rules">{spinner}Yajiv</button>

            </div>

          </div>

        </div>



        <div key="{game.url}j" className="col-12 col-md-2 bg-common game-top-div game-cards  bg-alternate-2"
          style={{
            display: "flex", flexDirection: "column",
            justifyContent: "space-evenly"
          }}>
          <Activegames gamename={this.state.name} setSocket={setSocket} />
          <div>
            <button onClick={() => { newGame() }} className="btn btn-success btn-lg leader text-dark">New Game</button>
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
  // activegames: state.goofspiel.activegames,
  // animate: state.goofspiel.animate
  // gameid:getcookie()
})

export default connect(mapStateToProps, { getNewGame, getGamePlay, addTurn, setGame, getActiveGames })(Memory)



// if (this.props.user && this.props.user.user
              //   && this.props.user.user.username
              //   && player == this.props.user.user.username) {
              //   return <img key={action + player} onClick={(e) => { addTurn(e) }}
              //     id={action} src={require(`../../images//cards/${action}${data.gameplay.suits[suit]}.png`)} />
              // } else {
              // let value = index