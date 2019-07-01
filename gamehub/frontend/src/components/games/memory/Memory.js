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



var chatSocket = ""

let flip = ""
let mappedCards = ["1C", "1H", "1S", "1D", "2C", "2H", "2S", "2D", "3C", "3H", "3S", "3D", "4C", "4H", "4S",
  "4D", "5C", "5H", "5S", "5D", "6C", "6H", "6S", "6D", "7C", "7H", "1C", "1H", "1S", "1D", "2C", "2H", "2S", "2D", "3C", "3H", "3S", "3D", "4C", "4H", "4S",
  "4D", "5C", "5H", "5S", "5D", "6C", "6H", "6S", "6D", "7C", "7H"]

export class Memory extends Component {

  state = {
    name: 'memory',
    turns: [0, 51, 0, 26, 1, 27, 2, 27, 2, 28, 7],
    flip: "",
    src: ""
  }


  componentDidUpdate() {
    chatSocket.onmessage = (e) => {
      // var data = JSON.parse(e.data);
      // var message = data['message'];
      getcookie((id) => {
        this.props.getActiveGames()
        this.props.getGamePlay(this.state.name, id)
      })
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
    this.setState({
      flip: css(styles.flipInY)
    })
    this.setState({
      src: require(`../../images/cards/2D.png`)
    })
    setTimeout(() => {
      this.setState({
        src: require(`../../images/blackBack.png`),
        flip: css(styles.zoomIn)
      })
    }, 1000);

    getcookie((id) => {
      chatSocket = new WebSocket(
        'ws://' + window.location.host +
        `/ws/games/${id}/`);
      this.props.getGamePlay(this.state.name, id)
      this.props.getActiveGames(this.state.name)
    })

  }






  render() {

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
        // this.props.getNewGame(this.state.name, (id) => {
        // console.log(this.props.newgame)
        // id = this.props.newgame.id
        document.cookie = `gameid=${id}`
        chatSocket.send(JSON.stringify({
          'message': "message"
        }));
      })
    }

    const playerSelection = (e) => {
      e.target.src = require(`../../images/cards/${mappedCards[e.target.id]}.png`)
      e.target.className = css(styles.flipInY)
      chatSocket.send(JSON.stringify({
        'message': "message"
      }));


    }

    let faceupCards = []


    for (var i = 0; i < this.state.turns.length; i += 2) {

      if (mappedCards[this.state.turns[i]] == mappedCards[this.state.turns[i + 1]]) {
        faceupCards.push(this.state.turns[i])
        faceupCards.push(this.state.turns[i + 1])
      }
    }

    if (this.state.turns.length % 2 == 1) {
      faceupCards.push(this.state.turns[this.state.turns.length - 1])
    }

    let spinner = (<Spinner animation="border" role="status" style={{ marginRight: "7%" }}>
      <span className="sr-only">Loading...</span>
    </Spinner>)


    const current =
      (<div className="memorycard">
        {
          mappedCards.map((action, index) => {
            // if (this.props.user && this.props.user.user
            //   && this.props.user.user.username
            //   && player == this.props.user.user.username) {
            //   return <img key={action + player} onClick={(e) => { addTurn(e) }}
            //     id={action} src={require(`../../images//cards/${action}${data.gameplay.suits[suit]}.png`)} />
            // } else {
            // let value = index
            flip = ""
            if (!faceupCards.includes(index)) {
              return <img onClick={(e) => {
                playerSelection(e)
              }} key={index} id={index} name={action} className={flip}
                src={require(`../../images/blackBack.png`)} />
            }

            if (faceupCards.includes(index)) {
              if (faceupCards.indexOf(index) == faceupCards.length - 1) {
                // flip = (cssAnimations.flipInY1)
                return <img key={index} id={index} name={action} className={this.state.flip} src={this.state.src} />
              }
              return <img key={index} id={index} name={action} className={"this.state.flip"} src={require(`../../images/cards/${mappedCards[index]}.png`)} />
            }
          })
        }

      </div>)

    return (
      <section key="game.url" className="bg-common game-top-div d-flex justify-content-center"
        style={{ height: "57em" }} >
        <div key="{game.url}jm" className="col-12 col-md-2 bg-common game-top-div game-cards bg-alternate-2">
          <Activeplayers />
          <button className="btn btn-success btn-lg leader text-dark">Leaderboard</button>
          <button className="btn btn-success btn-lg leader text-dark">Archive</button>
        </div>

        <div className="col-12 col-md-10 bg-alternate-2 " style={{ height: "52em" }} >

          {current}

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
  // gameplay: state.goofspiel.gameplay,
  // user: state.auth,
  // newgame: state.goofspiel.newgame[0],
  // activegames: state.goofspiel.activegames,
  // animate: state.goofspiel.animate
  // gameid:getcookie()
})

export default connect(mapStateToProps, { getNewGame, getGamePlay, addTurn, setGame, getActiveGames })(Memory)
