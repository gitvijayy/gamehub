import React, { Component, Fragment } from 'react'
import { getActiveGames, getGamePlay } from '../../actions/defaultgame'
import { connect } from 'react-redux'
class Activegames extends Component {

  componentDidMount() {
    this.props.getActiveGames(this.props.gamename)
  }

  render() {
    const onClick = (id) => {
      this.props.getGamePlay(this.props.gamename, id)
    }
    let loadgames = ""
    if (this.props.activegames) {
      loadgames = this.props.activegames.map((game, index) => {
        console.log("asda", game.game_id.id)
        if (game.game_id.status = "Active") {
          return <button onClick={() => { onClick(game.game_id.id) }} key={game.game_id.id} className="col-12 alert-success btn-lg"
            style={{ height: "50px", marginTop: "10%" }}>{game.game_id.id}</button>
        }

      })
    }

    return (
      <Fragment >
        <button className=" btn btn-dark btn-lg newgame text-white">Active Games</button>
        <div className="container pre-scrollable ">
          {loadgames}
        </div>
      </Fragment >
    )
  }
}


const mapStateToProps = state => ({
  activegames: state.defaultgame.activegames,
})

export default connect(mapStateToProps, { getActiveGames, getGamePlay })(Activegames)









