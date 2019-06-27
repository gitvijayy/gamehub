import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import { getGamePlay } from '../../actions/defaultgame'
// import { defaultgame } from './datahelpers.js'
import { addWarTurn } from '../../../actions/wargame'
import { getWarGamePlay } from '../../../actions/wargame'
import auth from '../../../reducers/auth';
// import auth from '../../../reducers/auth';

export class WarGame extends Component {

    addTurn = (e) => {
        const rounds = this.props.gameplay.round
        console.log(rounds)
        const lastRound = rounds[rounds.length-1]
        console.log(lastRound)
        this.props.addWarTurn(lastRound.id)
        // rounds = this.props.gameplay.round
        // this.props.gameplay.round.length-1
        // console.log(rounds)
    }

    componentDidMount() {
        this.props.getWarGamePlay()
    }

    render() {
        // console.log(this.props.gameplay)
        // console.log(this.props.gameplay)
        const game = this.props.gameplay.status ? this.props.gameplay : null
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
        const round = game && game.round.length > 0 ? game.round[game.round.length-1].id: 'Loading'
        // const round = game && game.round.length === 0 ? game.round: 'Loading'
        // console.log(round.length)
        const player1 = game? `${game.playerswar[0].player.username} and he has ${game.playerswar[0].deck_length} cards left`: 'Loading'
        const player2statues = game?game.playerswar[1]:null
        const player2 = player2statues? `${game.playerswar[1].player.username} and he has ${game.playerswar[1].deck_length} cards left`: 'Loading'
        // console.log(users)

        return(
            <Fragment>
                <h1> War Game is Here</h1>
                <button onClick={this.addTurn}>Click to create a turn </button>
                <button onClick={this.startNewGame}>Click to start a new game</button>
                <p> Game Statues: {this.props.gameplay.status}</p>
                <p> Round: {round}</p>
                <p> This is my users : {users}</p>
                <p> This is their deck: {decks}</p>
                <p> this is player1: {player1} </p>
                <p> this is player2: {player2} </p>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    gameplay: state.wargame.gameplay
  })
  
  export default connect(mapStateToProps, { getWarGamePlay, addWarTurn })(WarGame)
  

// export default WarGame;