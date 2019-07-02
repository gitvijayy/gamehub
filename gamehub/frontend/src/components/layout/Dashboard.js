import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Gamelist from './Gamelist'
import Activegames from './Activegames'
import Activeplayers from './Activeplayers'

export class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <Activegames />
        <Gamelist />
        <Activeplayers />
      </Fragment >
    )
  }
}

export default Dashboard
