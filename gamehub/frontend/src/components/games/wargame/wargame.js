import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getGamePlay } from '../../actions/defaultgame'
import { defaultgame } from './datahelpers.js'
import { addTurn } from '../../actions/defaultgame'

export class WarGame extends Component {
    render() {
        return(
            <h1> War Game is Here</h1>
        )
    }
}

export default WarGame;