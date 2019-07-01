import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { convertNumberToCard, fetchDeckImage } from './wargameHelpers' 
// import { getGamePlay } from '../../actions/defaultgame'
// import { defaultgame } from './datahelpers.js'
// import { addWarTurn } from '../../../actions/wargame'
import { getWarGamePlay, addWarTurn, makeNewGame,getWarActivegames } from '../../../actions/wargame'
import auth from '../../../reducers/auth';
import { type } from 'os';
// import auth from '../../../reducers/auth';

var chatSocket = new WebSocket(
    'ws://' + window.location.host +
    '/ws/war/turns/');
  
  
export class WarGame extends Component {
    addTurn = (e) => {
        const rounds = this.props.gameplay.round
        const game_id= document.cookie.split('=')[1]
        // console.log(rounds)
        const lastRound = rounds[rounds.length-1]
        // console.log(lastRound)
        this.props.addWarTurn(lastRound.id,() => {
            chatSocket.send(JSON.stringify({

                'message': 'kkkkk'
              }))
        })
        // this.props.getWarGamePlay(game_id)
        
        // rounds = this.props.gameplay.round
        // this.props.gameplay.round.length-1
        // console.log(rounds)
        
    }
    startNewGame = (e) => {
        this.props.makeNewGame(()=>{
            this.props.getWarActivegames()
        })
        document.cookie `gameid = ${e.target.id}`
    }
    goToGame = (e) => {
        // console.log(e.target.id)
        this.props.getWarGamePlay(e.target.id)
        document.cookie = `gameid = ${e.target.id}`
    }

    componentDidMount() {
        const game_id= document.cookie.split('=')[1]
        // const game_id = 54;
        this.props.getWarGamePlay(game_id)
        this.props.getWarActivegames()
    }

    componentDidUpdate() {
        chatSocket.onmessage = (e) => {
          const game_id= document.cookie.split('=')[1]
          var data = JSON.parse(e.data);
          var message = data['message'];
          console.log(message)
        //   this.props.getActiveGames(this.state.name)
        this.props.getWarGamePlay(game_id)
        
    };

        // chatSocket.onopen = () => {
        //     const game_id= document.cookie.split('=')[1]
        //     this.props.getWarGamePlay(game_id)
        // }
      }
    render() {
        // console.log(this.props.gameplay)
        // console.log(this.props.gameplay)
        const game = this.props.gameplay.status ? this.props.gameplay : null
        console.log(game)
        // console.log(this.props.gameplay.status)
        const getPlayers = (game) => {
            // console.log(game.playerswar)
            // console.log(auth)
            const players = game.playerswar.map(player => {
                // console.log(player.player.username)
                return player.player.username
            })
            // console.log(player)
            return players
        }
        const getDecks = (game) => {
            const decks = game.playerswar.map(player => {
                return player.deck_length
            })
            return decks
        }
        const users = game ? getPlayers(game) : 'Loading'
        const decks = game ? getDecks(game) : 'Loading'
        // console.log(game.round)
        const round = game && game.round.length > 0 ? game.round[game.round.length-1]: 'Loading'
        const roundID = typeof round === 'string'? round: round.id
        const turns = typeof round === 'string' ? round: round.turns
        const lastRound = game && game.round.length > 0 ? game.round[game.round.length-2]: null
        const lastTurns = lastRound ? lastRound.turns : 'Loading'
        // console.log(lastRound)
        console.log(round)
        const lastuserTurn = typeof lastTurns === 'string'? lastTurns : lastTurns.filter(turn => {
            return turn.player.username === this.props.user.username
        })
        const lastOpponentTurn = typeof lastTurns === 'string'? lastTurns : lastTurns.filter(turn => {
            return turn.player.username !== this.props.user.username
        })
        const userturn = typeof turns === 'string'? turns: turns.filter(turn => {
            return turn.player.username === this.props.user.username
        })
        const opponentturn = typeof turns === 'string'? turns: turns.filter(turn => {
            return turn.player.username !== this.props.user.username
        })
        const user = game ? game.playerswar.filter(player => {
            return player.player.username === this.props.user.username
        }): null

        const opponent = game ? game.playerswar.filter(player => {
            return player.player.username !== this.props.user.username
        }): null

        console.log(user)
        console.log(opponent)
        
        // console.log(userturn)
        // console.log(opponentturn)
        // console.log(turns);
        // const round = game && game.round.length === 0 ? game.round: 'Loading'
        // console.log(round.length)
        const player1 = game? `${game.playerswar[0].player.username} and he has ${game.playerswar[0].deck_length} cards left`: 'Loading'
        const player2statues = game? game.playerswar[1]:null
        const player2 = player2statues? `${game.playerswar[1].player.username} and he has ${game.playerswar[1].deck_length} cards left`: 'Loading'
        // console.log(users)
        const games = this.props.games.length > 0 ? this.props.games : 'Loading'
        // const gamestest = 'Loading'
        // console.log(games)
        return(
            <Fragment>
                {/* <h1> War Game is Here</h1> */}
                {/* <button onClick={this.addTurn}>Click to create a turn </button> */}
                <button onClick={this.startNewGame}>Click to start a new game</button>
                {/* <p> Game Statues: {this.props.gameplay.status}</p> */}
                {/* <p> Round: {roundID}</p> */}
                {/* <p> This is my users : {users}</p> */}
                {/* <p> This is their deck: {decks}</p>  */}
                <p> this is player1: {player1} </p>
                <p> this is player2: {player2} </p>
                {typeof games === 'string'? <p>{games}</p>: 
            games.map(game => {
                // {/* // console.log(game.game_id) */}
                 return <Fragment><p> the status for this game is : {game.game_id.status}</p> <button onClick={this.goToGame} id = {game.game_id.id}> {game.game_id.id} </button></Fragment> 
            })} 
            {/* {typeof lastTurns === 'string'? <p>Turns: {lastTurns}</p>: */}
            {/* lastTurns.map(turn => { */}
                {/* return <p>LastTurns: {turn.player.username} played the card {convertNumberToCard(turn.action)}</p> */}
            {/* }) */}
        {/* } */}
            {/* {typeof turns === 'string'? <p>Turns: {turns}</p>: */}
            {/* turns.map(turn => { */}
                {/* return <p>Turns: {turn.player.username} played the card {convertNumberToCard(turn.action)}</p> */}
            {/* }) */}
        {/* } */}
            <div className="col-12 col-md-10 bg-alternate-2 " style={{ height: "52em" }} >
            
            <div className='titles-opponent'>
                <p className='opponent-deck-amount'> Cards Left : {opponent? opponent[0].deck_length : 'Loading'}</p>
                {/* <button className="btn btn-danger btn-lg rules">Cards Left : 27</button> */}
                <p className='player-name'>{opponent? opponent[0].player.username : 'Loading'}</p>
                <img src={require('../../images/male.png') } className='player-icon'/>
            </div>

            <div className="playingcard">
                    
                    
                    <img src={fetchDeckImage('red')}/>
                    
                    {opponentturn[0]? <img src={convertNumberToCard(opponentturn[0].action)}/>:<div className='empty-card'/>}
                    {lastOpponentTurn[0]? <img src={convertNumberToCard(lastOpponentTurn[0].action)} className='sideCard'/>:<div className='empty-card'/>}
            </div>
            
  
    
              <div className="playingcard middle">
                {/* <div className="middle"> */}
                {/* <div className="cardsplayed"> {convertNumberToCard(2)} </div> */}
                    {/* <img src={require("../../images/dark_soldier.png")} /> */}
                    <img className="aces" src={require("../../images/warlogo.png")} />
                    {/* <img src={require("../../images/shouting_soldier.jpg")} /> */}
                    {/* <div className="cardsplayed"> {convertNumberToCard(11)} </div> */}
                {/* </div> */}
              </div>


            <div className="playingcard">
              <img src={fetchDeckImage('green')} onClick={(e)=>{this.addTurn(e)}}/>
              {userturn[0]?<img src={convertNumberToCard(userturn[0].action)}/>:<div className='empty-card'/>}
              {lastuserTurn[0]? <img src={convertNumberToCard(lastuserTurn[0].action)} className='sideCard'/>:<div className='empty-card'/>}
           </div>
           
           <div className='titles-opponent'>
                <p className='opponent-deck-amount'> Cards Left : {user? user[0].deck_length : 'Loading'}</p>
                <p className='player-name'>{user? user[0].player.username : 'Loading'}</p>
                <img src={require('../../images/male.png') } className='player-icon'/>
            </div>

            </div>
        
        {/* {convertNumberToCard(2)} */}
        {/* <img src='../../images/cards/1C.png'></img> */}
        {/* <img src={require('../../images/cards/green_back.png')} /> */}
        {/* {fetchDeckImage('green')} */}
        {/* {fetchDeckImage('red')} */}
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    gameplay: state.wargame.gameplay,
    games: state.wargame.games,
    user: state.auth.user
  })
  
  export default connect(mapStateToProps, { getWarGamePlay, addWarTurn, makeNewGame,getWarActivegames })(WarGame)
  
// export default WarGame;