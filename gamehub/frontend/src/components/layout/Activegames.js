import React, { Component, Fragment } from 'react'
import { getActiveGames, getGamePlay } from '../../actions/defaultgame'
import { connect } from 'react-redux'
import { cssAnimations } from '../games/goofspiel/datahelpers'
class Activegames extends Component {

  // componentDidMount() {
  //   this.props.getActiveGames(this.props.gamename)
  // }

  render() {

    const onClick = (id) => {
      document.cookie = `gameid=${id}`
      this.props.setSocket(id)
      this.props.getGamePlay(this.props.gamename, id)
    }

    let loadgames = ""
    if (this.props.activegames) {
      loadgames = this.props.activegames.map((game, index) => {
        let gameclass = "col-12 alert-success btn-lg"
        if (game.game_id.status == "New") {
          gameclass = "col-12 alert-warning btn-lg"
        }
        if (game.game_id.status != "Game Over") {

          return <button onClick={() => { onClick(game.game_id.id) }} key={game.game_id.id} className={gameclass}
            style={{ height: "50px", marginTop: "10%" }}>{game.game_id.id}</button>
        }
      })
    }

    return (
      <div >
        <button className=" btn btn-dark btn-lg newgame text-white">Active Games</button>
        <div className="container pre-scrollable ">
          {loadgames}
        </div>
      </div >
    )
  }
}


const mapStateToProps = state => ({
  activegames: state.goofspiel.activegames,
})

export default connect(mapStateToProps, { getActiveGames, getGamePlay })(Activegames)









