import React, { Component, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getGamePlay, getNewGame, setGame, getActiveGames } from '../../actions/defaultgame'
import { defaultgame, cards, getcookie } from './datahelpers.js'
import { addTurn } from '../../actions/defaultgame'
import Activeplayers from '../layout/Activeplayers'
import Activegames from '../layout/Activegames'
import Loaders from '../layout/Loaders'
import Spinner from 'react-bootstrap/Spinner'


var chatSocket = new WebSocket(
  'ws://' + window.location.host +
  '/ws/defaultgame/turns/');


export class Defaultgame extends Component {


  state = {
    gameplay: [],
    loading: false,
    name: 'defaultgame',

  }

  onClick1 = (e) => {
    var lead = { "round_id": 13, "action": 99 }
    chatSocket.send(JSON.stringify({

      'message': lead
    }));
  }

  componentDidUpdate() {
    chatSocket.onmessage = (e) => {
      // var data = JSON.parse(e.data);
      // var message = data['message'];
      this.props.getActiveGames(this.state.name)
      getcookie((id) => {
        this.props.getGamePlay(this.state.name, id)
      })

    };
  }


  componentDidMount() {
    console.log("in")
    getcookie((id) => {
      this.props.getGamePlay(this.state.name, id)
    })



    this.props.getActiveGames(this.state.name)
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
    // if (!this.state.loading) {
    //   setTimeout(
    //     function () {
    //       this.setState({ loading: true });
    //     }
    //       .bind(this),
    //     1500
    //   );
    //   return <Loaders />
    // }

    // console.log(this.props.gameplay)
    const playercards = []
    const playerpoints = []
    let newprizecard = ""


    let gameblock =
      <div className="col-12 col-md-10 bg-alternate-2 " style={{ height: "52em" }} >
        <Loaders />
      </div>


    const data = this.props.gameplay.players ? defaultgame(this.props.gameplay) : null
    console.log(data)



    if (data && data.gameplay && data.gameplay.players) {
      if (data.gameplay.prizeCard) {
        newprizecard = <img key={data.gameplay.prizeCard} src={require(`../images/cards/${data.gameplay.prizeCard}D.png`)} />
      }

      for (var player in data.gameplay.players) {

        const current = <div className="playingcard">
          {
            data.gameplay.players[player][0].map(action => {
              if (this.props.user.user.username && player == this.props.user.user.username) {
                return <img key={action + player} onClick={(e) => { addTurn(e) }}
                  id={action} src={require(`../images/cards/${action}C.png`)} />
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

        if (Object.keys(data.gameplay.players).length > 1) {

          gameblock = <div className="col-12 col-md-10 bg-alternate-2 " style={{ height: "52em" }} >
            <div className="player1name">
              <p className="logo" >{Object.keys(data.gameplay.players)[0]}</p>
            </div>
            {playercards[0]}
            <div className="playingcard middlebox">
              {/* <img className="aces" src={require("../images/aces.png")} /> */}
              <div>
                <button onClick={test} className="btn btn-danger btn-lg rules">{Object.keys(data.gameplay.players)[0]}</button>
                {newprizecard}
              </div>
              <div>
                <button onClick={test} className="btn btn-success btn-lg leader text-dark">Prize</button>
                {newprizecard}
              </div>
              <div>
                <button onClick={test} className="btn btn-danger btn-lg rules">{Object.keys(data.gameplay.players)[1]}</button>
                {newprizecard}
              </div>



              <table className="table table-borderless table-dark  text-center" style={{ width: "25%", marginTop: "10%" }}>
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
              <p className="logo " >{Object.keys(data.gameplay.players)[1]}</p>
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
      console.log(turn)
      this.props.addTurn(this.state.name, turn)
      chatSocket.send(JSON.stringify({
        'message': "message"
      }));
      console.log(e.target.id)
    }
    console.log(this.props.gameplay)

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
  activegames: state.defaultgame.activegames
})

export default connect(mapStateToProps, { getNewGame, getGamePlay, addTurn, setGame, getActiveGames })(Defaultgame)


{/* <img className="card-img-top card-images game-images" src="{game.img}" alt="Card image cap" />
          <div className="card-body ">
            <h4 className="card-title  ">game.nam</h4>
            <p className="card-text ">"game.description</p>
            <article className="d-flex justify-content-between">
              <button className="btn btn-dark btn-lg">PLAY</button>
              <button className=" btn btn-dark btn-lg">Rules</button>
            </article>
          </div> */}
{/* <img className="card-img-top card-images " src="game.img" alt="Card image cap" /> */ }
{/* <div className="card-body ">
            <h4 className="card-title  ">"game.name"</h4>
            <p className="card-text ">"game.descriptio"</p>
            <article className="d-flex justify-content-between">
              <button className="btn btn-dark btn-lg">PLAY</button>
              <button className=" btn btn-dark btn-lg">Rules</button>
            </article>
          </div> */}
{/* </div> */ }
// const data = null
// console.log(data)
{/* <img className="card-img-top card-images game-images" src="{game.img}" alt="Card image cap" />
          <div className="card-body ">
            <h4 className="card-title  ">game.nam</h4>
            <p className="card-text ">"game.description</p>
            <article className="d-flex justify-content-between">
              <button className="btn btn-dark btn-lg">PLAY</button>
              <button className=" btn btn-dark btn-lg">Rules</button>
            </article>
          </div> */}
{/* <div key="game.url" className="col-12 col-md-10 bg-common game-top-div " style={{ height: "57em" }}> */ }
{/* 
        <div className=" col-12 col-md-11 bg-alternate-2 " style={{ height: "50em" }}>
          <div className="playingcard"> */}

{/* {player1cards[0]} */ }
{/* </div>
          <div className="playingcard">
            <img className="aces" src={require("../images/aces.png")} /> */}

{/* {newprizecard} */ }

{/* <table className="table table-borderless table-dark  text-center" style={{ width: "25%" }}>
              <thead className="text-dark login" style={{ background: "red" }}>
                <tr>
                  <th scope="col">Player</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              <tbody className="bg-light text-dark table-shadow ">
                <tr> */}
{/* <td>{player1name}</td> */ }
{/* <td>{player1points}</td> */ }
{/* </tr>
                <tr> */}
{/* <td>{player2name}</td> */ }
{/* <td>{player2points}</td> */ }
{/* </tr>
              </tbody>
            </table> */}

{/* </div>

          <div className="playingcard"> */}

{/* {player1cards[1]} */ }
{/* </div>
        </div>


        <button>New Game</button>
        <p>Game Name</p>
        <button>Rules</button> */}







    // static propTypes = {
  //   leads: PropTypes.array.isRequired,
  //   getLeads: PropTypes.func.isRequired,
  //   deleteLead: PropTypes.func.isRequired
  // // }

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
  // onClick = (e) => {
  //   let { name, email, message } = this.state
  //   name = e.target.id
  //   console.log(e.target.id)
  //   const lead = { name, email, message }
  //   this.props.addLead(lead)


  // }
    // let gamelayout = []
    // const player1cards = []
    // const player2cards = []
    // const player1points = 0
    // const player2points = 0
    // const test = [1, 2, 3, 4]
    // const newprizecard = <img onClick={(e) => { this.onClick1(e) }} key="asd" name="fhgh" src={require("../images/blackBack.png")} />

    // console.log(data)

    // if (data) {
    //   let gameplay = data.gameplay.players
    //   let current = []
    //   for (var player in gameplay) {
    //     current = gameplay[player].map((action, index) => {
    //       for (var i = 1; i <= 13; i++) {
    //         if (action != i) {
    //           return (
    //             <img key={action + player + index} src={require("../images/blackBack.png")} />
    //           )
    //         }
    //       }
    //     })

    // gamelayout.push(<div key={player} className="row">{current}</div>)
    // test.map(turn => {
    // player1cards.push(current)

    // })
    //   }
    // }
    // console.log(gamelayout)