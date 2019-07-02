import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { convertNumberToCard, fetchDeckImage } from './wargameHelpers' 
// import { getGamePlay } from '../../actions/defaultgame'
// import { defaultgame } from './datahelpers.js'
// import { addWarTurn } from '../../../actions/wargame'
import { getWarGamePlay, addWarTurn, makeNewGame,getWarActivegames } from '../../../actions/wargame'
import { Activegames  } from '../../layout/Activegames'
import { Activeplayers } from '../../layout/Activeplayers'
// import auth from '../../../reducers/auth';

const chatSocket = new WebSocket(
    'ws://' + window.location.host +
    '/ws/games/turns/');
  
  
export class WarGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count : 0
        }
    }

    addTurn = (e) => {
        e.preventDefault()
        const rounds = this.props.gameplay.round
        console.log('HE WILL TURN')
        const lastRound = rounds[rounds.length-1]
        // console.log(this.props.count)
        if (lastRound.status=== 'tie') {
            if(this.state.count < 3) {
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
                    count : 0
                })
            // this.props.count = 3
            this.props.addWarTurn(lastRound.id,() => {
                chatSocket.send(JSON.stringify({
    
                    'message': 'kkkkk'
                    }))
            }) 
            }
        }
        else {
        // console.log(lastRound)
        this.props.addWarTurn(lastRound.id,() => {
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
        this.props.makeNewGame(()=>{
            this.props.getWarActivegames()
        })
        // document.cookie `gameid = ${e.target.id}`
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
        const game_id= document.cookie.split('=')[1]
        this.props.getWarGamePlay(game_id)
        this.props.getWarActivegames()
    }

    componentDidUpdate() {
        chatSocket.onmessage = (e) => {
          const game_id= document.cookie.split('=')[1]
          var data = JSON.parse(e.data);
        //   var message = data['message'];
          console.log('I UPDATED')
        //   console.log(message)
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
        // console.log('I AM THE RENDER')
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
        const cookie_id= document.cookie.split('=')[1]
        // const getDecks = (game) => {
        //     const decks = game.playerswar.map(player => {
        //         return player.deck_length
        //     })
        //     return decks
        // }
        // const users = game ? getPlayers(game) : 'Loading'
        // const decks = game ? getDecks(game) : 'Loading'
        // console.log(game.round)
        const round = game && game.round.length > 0 ? game.round[game.round.length-1]: 'Loading'
        // const roundStatus = typeof round === 'string'? round.status : null
        // const roundID = typeof round === 'string'? round: round.id
        // if(roundStatus) {
        //     if(roundStatus === 'tie'){

        //     }
        //     else {
        //     turns = round.turns        
        //     }
        // }
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
        const userturn = typeof turns === 'string'? []: turns.filter(turn => {
            return turn.player.username === this.props.user.username
        })
        const opponentturn = typeof turns === 'string'? []: turns.filter(turn => {
            return turn.player.username !== this.props.user.username
        })
        const user = game ? game.playerswar.filter(player => {
            return player.player.username === this.props.user.username
        }): []

        const opponent = game ? game.playerswar.filter(player => {
            return player.player.username !== this.props.user.username
        }): []

        console.log(opponent)

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

        const loadRules = () => {
            <section className='rules'>
                <p> Welcome To War!!</p>
                <p> Dealing: The deck is divided evenly, with each player receiving 26 cards, dealt one at a time, face down. Anyone may deal first. Each player places their stack of cards face down, in front of them.</p>
                <p>Each player turns up a card at the same time and the player with the higher card takes both cards and puts them, face down, on the bottom of his stack.</p>
                <p>Winner is the player who took all the cards in the deck</p>  
            </section>
        }

        return(
            <Fragment>
        <section key="game.url" className="bg-common game-top-div d-flex justify-content-center"
        style={{ height: "57em" }} >
        <div key="{game.url}jm" className="col-12 col-md-2 bg-common game-top-div game-cards  bg-alternate-2">
          {/* <Activeplayers /> */}
          <button className="btn btn-success btn-lg leader text-dark">Leaderboard</button>
          <button className="btn btn-success btn-lg leader text-dark">Archive</button>
        </div>  




        {cookie_id === '0'? <button className = "col-12 col-md-10 bg-alternate-2 beggining-button"onClick={this.addNewGame}>New Game</button> : 
        // {/* {cookie_id === '0'? console.log('the cookie id is 0'): console.log('the cookie id is ' + cookie_id)} */}
            <div className="col-12 col-md-10 bg-alternate-2" style={{ height: "52em" }} >
            
            <div className='titles-opponent'>
                <p className='opponent-deck-amount'> Cards Left : {opponent.length>0? opponent[0].deck_length : ''}</p>
                {/* <button className="btn btn-danger btn-lg rules">Cards Left : 27</button> */}
                <p className='player-name'>{opponent.length>0? opponent[0].player.username : 'Waiting for player to join'} {opponent.length > 0? opponentturn.length>0? ':Played, waiting':':Thinking':''}</p>
                <img src={require('../../images/male.png') } className='player-icon'/>
            </div>
            
            <div className="playingcard">
                    
                    
                    <img src={fetchDeckImage('red')}/>
                    
                    {opponentturn[0]? <img src={convertNumberToCard(opponentturn[0].action)}/>:<div className='empty-card'/>}
                    {lastOpponentTurn[0].action? <img src={convertNumberToCard(lastOpponentTurn[0].action)} className='sideCard'/>:<div className='empty-card'/>}
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
              {userturn.length>0?<img src={convertNumberToCard(userturn[0].action)}/>:<div className='empty-card'/>}
              {lastuserTurn[0].action? <img src={convertNumberToCard(lastuserTurn[0].action)} className='sideCard'/>:<div className='empty-card'/>}
           </div>
           
           <div className='titles-opponent'>
                <p className='opponent-deck-amount'> Cards Left : {user.length>0? user[0].deck_length : 'Loading'}</p>
                <p className='player-name'>{user.length>0? user[0].player.username : 'Loading'} : { userturn.length === 0?'Your Turn':'Waiting for opponent'}</p>
                <img src={require('../../images/male.png') } className='player-icon'/>
            </div>
            </div>
        }
            <div key="{game.url}j" className="col-12 col-md-2 bg-common game-top-div game-cards  bg-alternate-2"
          style={{
            display: "flex", flexDirection: "column",
            justifyContent: "space-around"
          }}>
            {/* <Activegames gamename={'war'} activegames={this.props.activegames} /> */}
            <p className='new-games-title'>New Games:</p>
            <div className='container pre-scrollable'>
            {typeof games === 'string'? <button className=" btn btn-dark btn-lg newgame text-white">No Games</button>: 
            games.map(game => {
                // {/* // console.log(game.game_id) */}
                return(
                    <button className=" btn btn-dark btn-lg newgame-war text-white" onClick={this.goToGame} id={game.game_id.id}>{games.indexOf(game) + 1}</button>
            )
                //  return <Fragment><p> the status for this game is : {game.game_id.status}</p> <button onClick={this.goToGame} id = {game.game_id.id}> {game.game_id.id} </button></Fragment> 
            })}
            </div>
            <div>
            <button onClick={this.addNewGame} className="btn btn-success btn-lg leader text-dark">New Game</button>
            <button className="btn btn-danger btn-lg rules" >Rules</button>
          </div>
        </div>
      </section >
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    gameplay: state.wargame.gameplay,
    games: state.wargame.games,
    user: state.auth.user,
    count : state.wargame.count
  })
  
  export default connect(mapStateToProps, { getWarGamePlay, addWarTurn, makeNewGame,getWarActivegames })(WarGame)
  
// export default WarGame;