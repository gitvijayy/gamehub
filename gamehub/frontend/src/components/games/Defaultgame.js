import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getGamePlay } from '../../actions/defaultgame'
import { defaultgame } from './datahelpers.js'

export class Defaultgame extends Component {
  // static propTypes = {
  //   leads: PropTypes.array.isRequired,
  //   getLeads: PropTypes.func.isRequired,
  //   deleteLead: PropTypes.func.isRequired
  // }

  componentDidMount() {
    this.props.getGamePlay()
  }
  render() {

    const datahelper = this.props.gameplay.players ? defaultgame(this.props.gameplay) : null
    let gamelayout = []

    // console.log(datahelper)

    if (datahelper) {
      let playerActions = datahelper.playerActions.players
      let current = []
      for (var player in playerActions) {
        current = playerActions[player].map((action, index) => {
          return (
            <p key={action + player + index}>{action}</p>
          )
        })

        gamelayout.push(<div key={player} className="row">{current}</div>)


      }


      // console.log(datahelper.playerActions.players)
      // for (var player in datahelper.playerActions.players) {
      //   // console.log("testing", datahelper.playerActions)
      //   console.log(player)
      //   // gamelayout = player.map((action, index) => {
      //   //   return (
      //   //     // <div key={index} className="row">

      //   //     //   return (
      //   //     <p key={action + index}>{action}</p>
      //   //   )

      //   //   // </div>

      //   //   // )
      //   // })
      // }
      // gamelayout = datahelper.playerActions.players.forEach(element => {



      // })

    }
    // console.log(gamelayout)
    return (
      <Fragment>
        <div >
          {gamelayout}
        </div>
        {/* <div className="row">
          {player2}
        </div> */}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  gameplay: state.defaultgame.gameplay
})

export default connect(mapStateToProps, { getGamePlay })(Defaultgame)
