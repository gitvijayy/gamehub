import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import { getGamePlay } from '../../actions/defaultgame'
// import { defaultgame } from './datahelpers.js'
// import { addTurn } from '../../actions/defaultgame'
import { getWarGamePlay } from '../../../actions/wargame'
import auth from '../../../reducers/auth';
// import auth from '../../../reducers/auth';

export class WarGame extends Component {

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

        const player1 = game? `this is player1: ${game.playerswar[0].player.username} and he has ${game.playerswar[0].deck_length} cards left`: 'Loading'
        const player2 = game? `this is player1: ${game.playerswar[1].player.username} and he has ${game.playerswar[1].deck_length} cards left`: 'Loading'
        console.log(users)

        return(
            <Fragment>
                <h1> War Game is Here</h1>
                <button>player1</button>
                <p> Game Statues: {this.props.gameplay.status}</p>
                <p> This is my users : {users}</p>
                <p> This is their deck: {decks}</p>
                <p> {player1} </p>
                <p> {player2} </p>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    gameplay: state.wargame.gameplay
  })
  
  export default connect(mapStateToProps, { getWarGamePlay })(WarGame)
  

// export default WarGame;