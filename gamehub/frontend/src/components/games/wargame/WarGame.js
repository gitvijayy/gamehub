import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { convertNumberToCard, fetchDeckImage } from './wargameHelpers'
// import { getGamePlay } from '../../actions/defaultgame'
// import { defaultgame } from './datahelpers.js'
// import { addWarTurn } from '../../../actions/wargame'
import { getWarGamePlay, addWarTurn, makeNewGame, getWarActivegames, getActivePlayers } from '../../../actions/wargame'
import { Activegames } from '../../layout/Activegames'
import Activeplayers from '../../layout/Activeplayers'
import { getcookie } from '../../games/goofspiel/datahelpers'
import WarRules from './warRules'
import WarGameOver from './warGameOver'
import { async } from 'q';
import NewGameWar from './newGameWar'
import WatingGameWar from './waitingGameWar'
import Chat from '../../layout/Chat'
// import auth from '../../../reducers/auth';

const chatSocket = new WebSocket(
    'ws://' + window.location.host +
    '/ws/games/turns/');


export class WarGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            name: 'war',
            rules: false,
            cookie: '',
            messages: []
        }
    }

    onKeyDown = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    addTurn = (e) => {
        const rounds = this.props.gameplay.round
        // console.log('HE WILL TURN')
        const lastRound = rounds[rounds.length - 1]
        // console.log(this.props.count)
        if (lastRound.status === 'tie') {
            if (this.state.count < 3) {
                // console.log('You will not turn!!!!!')
                // this.props.count = 1
                // console.log(this.state.count)
                this.setState({
                    count: this.state.count + 1
                })
                // console.log(this.state.count)
            }
            // this.props.count = 3
            else {
                this.setState({
                    count: 0
                })
                // this.props.count = 3
                this.props.addWarTurn(lastRound.id, () => {
                    chatSocket.send(JSON.stringify({

                        'message': 'kkkkk'
                    }))
                })
            }
        }
        else {
            // console.log(lastRound)
            this.props.addWarTurn(lastRound.id, () => {
                chatSocket.send(JSON.stringify({
                    'message': 'kkkkk'
                }))
            })
        }
        // this.props.getWarGamePlay(game_id)

        // rounds = this.props.gameplay.round
        // this.props.gameplay.round.length-1
        // console.log(rounds)

    }
    addNewGame = (e) => {
        this.props.makeNewGame(() => {
            this.props.getWarActivegames(() => {
                chatSocket.send(JSON.stringify({
                    'message': 'kkkkk'
                }))
            })
        })
        // document.cookie`gameid = ${e.target.id}`
    }

    // startNewGame = (e) => {
    //     this.props.makeNewGame(()=>{
    //         this.props.getWarActivegames()
    //     }).then(
    //         document.cookie `gameid = ${}`
    //     )
    //     document.cookie `gameid = ${e.target.id}`
    // }

    goToGame = (e) => {
        // console.log(e.target.id)
        this.props.getWarGamePlay(e.target.id)
        document.cookie = `gameid = ${e.target.id}`
    }

    componentDidMount() {
        // const game_id= document.cookie.split('=')[1]

        getcookie((id) => {
            this.props.getWarGamePlay(id)
            this.props.getWarActivegames()
            this.props.getActivePlayers()
        })

    }

    componentDidUpdate() {
        chatSocket.onmessage = (e) => {
            //   const game_id= document.cookie.split('=')[1]
            // var data = JSON.parse(e.data);
            //   var message = data['message'];
            //   console.log('I UPDATED')
            //   console.log(message)
            //   this.props.getActiveGames(this.state.name)
            getcookie((id) => {
                this.props.getWarGamePlay(id)
                this.props.getWarActivegames()
            })
        };

        // chatSocket.onopen = () => {
        //     const game_id= document.cookie.split('=')[1]
        //     this.props.getWarGamePlay(game_id)
        // }
    }
    render() {
        const game = this.props.gameplay.status ? this.props.gameplay : null
        const game_id = document.cookie.split(';')[0].split('=')[1]
        console.log('this is the cookie' + game_id)
        // const activeUsers = this.props.activeplayers
        // console.log(activeUsers)
        // console.log(game)
        const gameStatus = game ? game.status : null
        console.log('this is the game status: ' + gameStatus)
        // const myCookies ={}
        //  const getcookies = () =>{
        //     let cookies = {}
        //     document.cookie.split(";").forEach(cookie => {
        //     name = cookie.split("=")[0].trim()
        //     cookies[name] = cookie.split("=")[1];
        //     console.log(cookies)
        //     return cookies
        // })
        // }
        // const cookies = getcookies()
        // const cookies = document.cookies.split(';').forEach(cookie =>{
        //     name = cookie.split("=")[0].trim();
        //     cookies[name] = cookie.split("=")[1];
        // })
        // const cookie = cookies ? cookies[0].gameid: 'no'
        // console.log('this is cookie inside war' + cookie)
        let modalClose = () => this.setState({ rules: false });
        // const getDecks = (game) => {
        //     const decks = game.playerswar.map(player => {
        //         return player.deck_length
        //     })
        //     return decks
        // }
        // const users = game ? getPlayers(game) : 'Loading'
        // const decks = game ? getDecks(game) : 'Loading'
        // console.log(game.round)
        const round = game && game.round.length > 0 ? game.round[game.round.length - 1] : 'Loading'
        // const roundStatus = typeof round === 'string'? round.status : null
        // const roundID = typeof round === 'string'? round: round.id
        // if(roundStatus) {
        //     if(roundStatus === 'tie'){

        //     }
        //     else {
        //     turns = round.turns        
        //     }
        // }
        const turns = typeof round === 'string' ? round : round.turns
        const lastRound = game && game.round.length > 0 ? game.round[game.round.length - 2] : null
        const lastTurns = lastRound ? lastRound.turns : 'Loading'
        // console.log(lastRound)
        // console.log(round)
        console.log(lastTurns)
        const lastuserTurn = this.props.user && typeof lastTurns !== 'string' ? lastTurns.filter(turn => {
            return turn.player.username === this.props.user.username
        }) : lastTurns
        const lastOpponentTurn = this.props.user && typeof lastTurns !== 'string' ? lastTurns.filter(turn => {
            return turn.player.username !== this.props.user.username
        }) : lastTurns
        const userturn = this.props.user && typeof turns !== 'string' ? turns.filter(turn => {
            return turn.player.username === this.props.user.username
        }) : []
        const opponentturn = this.props.user && typeof turns !== 'string' ? turns.filter(turn => {
            return turn.player.username !== this.props.user.username
        }) : []
        const user = game && this.props.user ? game.playerswar.filter(player => {
            return player.player.username === this.props.user.username
        }) : []

        const opponent = game && this.props.user ? game.playerswar.filter(player => {
            return player.player.username !== this.props.user.username
        }) : []


        // console.log(userturn)
        // console.log(opponentturn)
        // console.log(turns);
        // const round = game && game.round.length === 0 ? game.round: 'Loading'
        // console.log(round.length)
        // const player1 = game? `${game.playerswar[0].player.username} and he has ${game.playerswar[0].deck_length} cards left`: 'Loading'
        // const player2statues = game? game.playerswar[1]:null
        // const player2 = player2statues? `${game.playerswar[1].player.username} and he has ${game.playerswar[1].deck_length} cards left`: 'Loading'
        // console.log(users)
        const games = this.props.games.length > 0 ? this.props.games : 'Loading'
        // const gamestest = 'Loading'
        // console.log(games)
        // console.log('this is the cookie_id ' + cookie_id);
        return (
            <Fragment>
                <section key="game.url" className="bg-common game-top-div justify-content-center"
                    style={{ height: "57em" }} >
                    <div key="{game.url}jm" className="col-12 col-md-2 bg-common game-top-div game-cards  bg-alternate-2">
                        <div>
                            <button className='btn btn-dark btn-lg text-white bg-dark'>Active Games</button>
                            <div className='container pre-scrollable' style={{
                                height: '520px',
                                'margin-top': '20%'
                            }}>
                                {typeof games === 'string' ? '' :
                                    games.map(game => {
                                        return (
                                            game.game_id.status === 'New' ? <button className="col-12 alert-warning btn-lg game-top-div" onClick={this.goToGame} id={game.game_id.id} key={game.game_id.id}>War {games.indexOf(game) + 1}</button> :
                                                game.game_id.status === 'Game Over' ? null : <button className="col-12 alert-success btn-lg" onClick={this.goToGame} id={game.game_id.id} key={game.game_id.id}>War{games.indexOf(game) + 1}</button>
                                        )
                                    })}
                            </div>
                        </div>
                        <div>
                            <button onClick={this.addNewGame} className="btn btn-success btn-lg leader text-dark">New Game</button>
                            <button className="btn btn-danger btn-lg rules" onClick={() => this.setState({ rules: true })}>Rules</button>
                        </div>
                        {/* <Activeplayers /> */}
                        {/* <button className="btn btn-success btn-lg leader text-dark">Leaderboard</button>
                        <button className="btn btn-success btn-lg leader text-dark">Archive</button> */}
                    </div>




                    {game_id === '0' ? <NewGameWar /> :
                        gameStatus === 'Game Over' ? <WarGameOver user={user} opponent={opponent} /> :
                            gameStatus === 'New' ? <WatingGameWar /> :
                                // {/* {cookie_id === '0'? console.log('the cookie id is 0'): console.log('the cookie id is ' + cookie_id)} */}
                                <div className="col-12 col-md-10 bg-alternate-2" style={{ height: "52em" }} >

                                    <div className='titles-opponent'>
                                        <p className='opponent-deck-amount'> Cards Left : {opponent.length > 0 ? opponent[0].deck_length : ''}</p>
                                        {/* <button className="btn btn-danger btn-lg rules">Cards Left : 27</button> */}
                                        <p className='player-name'>{opponent.length > 0 ? opponent[0].player.username : 'Waiting for player to join'} {opponent.length > 0 ? opponentturn.length > 0 ? ':Played, waiting' : ':Thinking' : ''}</p>
                                        <img src={require('../../images/male.png')} className='player-icon' />
                                    </div>

                                    <div className="playingcardwar">


                                        <img src={fetchDeckImage('red')} />

                                        {opponentturn[0] ? <img src={convertNumberToCard(opponentturn[0].action - 1)} key={opponentturn[0].id} /> : <div className='empty-cardwar' />}
                                        {lastOpponentTurn[0].action ? <img src={convertNumberToCard(lastOpponentTurn[0].action - 1)} key={lastOpponentTurn[0].id} className='sideCardWar' /> : <div className='empty-cardwar' />}
                                    </div>



                                    <div className="playingcardwar middle">
                                        {/* <div className="middle"> */}
                                        {/* <div className="cardsplayed"> {convertNumberToCard(2)} </div> */}
                                        {/* <img src={require("../../images/dark_soldier.png")} /> */}
                                        <img className="aces" src={require("../../images/warlogo.png")} />
                                        {/* <img src={require("../../images/shouting_soldier.jpg")} /> */}
                                        {/* <div className="cardsplayed"> {convertNumberToCard(11)} </div> */}
                                        {/* </div> */}
                                    </div>


                                    <div className="playingcardwar">
                                        <img src={fetchDeckImage('green')} onClick={(e) => { this.addTurn(e) }} />
                                        {userturn.length > 0 ? <img src={convertNumberToCard(userturn[0].action - 1)} /> : <div className='empty-cardwar' />}
                                        {lastuserTurn[0].action ? <img src={convertNumberToCard(lastuserTurn[0].action - 1)} className='sideCardWar' /> : <div className='empty-cardwar' />}
                                    </div>

                                    <div className='titles-opponent'>
                                        <p className='opponent-deck-amount'> Cards Left : {user.length > 0 ? user[0].deck_length : 'Loading'}</p>
                                        <p className='player-name'>{user.length > 0 ? user[0].player.username : 'Loading'} : {userturn.length === 0 ? 'Your Turn' : 'Waiting for opponent'}</p>
                                        <img src={require('../../images/male.png')} className='player-icon' />
                                    </div>
                                </div>
                    }
                    <div className="col-12 col-md-2 bg-common game-top-div-war game-cards  bg-alternate-2"
                        style={{
                            display: "flex", flexDirection: "column",
                            justifyContent: "space-around"
                        }}>
                        {/* <Activegames gamename={'war'} activegames={this.props.activegames} /> */}

                        {/* <button className='btn btn-dark btn-lg text-white'>Active Games</button>
                            <div className='container pre-scrollable'>
                                {typeof games === 'string' ? <button className=" btn btn-dark btn-lg newgame text-white">No Games</button> :
                                    games.map(game => {
                                        return (
                                            game.game_id.status === 'New' ? <button className="col-12 alert-warning btn-lg game-top-div" onClick={this.goToGame} id={game.game_id.id} key={game.game_id.id}>War {games.indexOf(game) + 1}</button> :
                                            game.game_id.status === 'Game Over' ? null:<button className="col-12 alert-success btn-lg" onClick={this.goToGame} id={game.game_id.id} key={game.game_id.id}>War{games.indexOf(game) + 1}</button>
                                        )
                                    })}
                            </div> */}

                        {/* <Activegames gamename={this.state.name} setSocket={setSocket}/> */}
                        <Activeplayers />
                        <div style={{ marginTop: "20%" }}>
                            {/* <button className="btn btn-success btn-lg leader text-dark">Leaderboard</button>
                            <button className="btn btn-success btn-lg leader text-dark">Archive</button> */}
                            <Chat messages={this.state.messages} onKeyDown={this.onKeyDown} />
                        </div>
                    </div>
                </section >

                <WarRules show={this.state.rules} onHide={modalClose} />
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    gameplay: state.wargame.gameplay,
    games: state.wargame.games,
    user: state.auth.user,
    count: state.wargame.count,
    activeplayers: state.wargame.activeplayers
})

export default connect(mapStateToProps, { getWarGamePlay, addWarTurn, makeNewGame, getWarActivegames, getActivePlayers })(WarGame)

// export default WarGame;