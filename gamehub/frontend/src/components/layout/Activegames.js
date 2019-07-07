import React, { Component, Fragment } from 'react'
import { getActiveGames, getGamePlay, getActivePlayers } from '../../actions/goofspiel'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getcookie } from '../games/memory/datahelpers';


class Activegames extends Component {

  state = {
    redirect: false,
    route: "",
    id: 0
  }



  componentDidMount() {
    getcookie((id) => {
      this.setState({ id: id })
    })
    this.props.getActiveGames()
  }

  render() {

    const onClick = (e, id, name) => {

      document.cookie = `gameid=${id}`
      this.props.getActiveGames()
      this.props.setSocket(id)
      this.setState({ id: id })
      if (this.props.gamename != name.toLowerCase()) {
        document.cookie = `gamename=${name.toLowerCase()}`
        let redirect = `/${name.toLowerCase()}`
        this.setState({ redirect: true, route: redirect })
        return
      }
      this.props.getActivePlayers()
      this.props.getGamePlay(this.props.gamename, id)
    }

    if (this.state.redirect) {
      return <Redirect to={this.state.route} />
    }

    let loadgames = ""
    if (this.props.activegames) {
      loadgames = this.props.activegames.map((game, index) => {

        let gameclass = "col-12 alert-success btn-lg"
        if (game.game_id.status == "New") {
          gameclass = "col-12 alert-warning btn-lg"
        }


        getcookie((id) => {
          if (id == game.game_id.id) {
            gameclass = "col-12 alert-dark btn-lg"
          }
        })


        if (game.game_id.status != "Game Over" && game.game_id.name.toLowerCase() == this.props.gamename) {
          let name = `${game.game_id.name}  ${game.game_id.id}`
          return <button onClick={(e) => { onClick(e, game.game_id.id, game.game_id.name) }} key={game.game_id.id} className={gameclass}
            style={{ height: "60px", marginTop: "10%", fontSize: "medium" }}>{name}</button>
        }
      })
    }
    let blockStyle = {
      maxHeight: "520px!important",
      height: "520px",
      marginTop: "20%"
    }
    return (
      <div >
        <button className=" btn btn-dark btn-lg  text-white bg-dark">Active Games</button>
        <div style={blockStyle} className="container pre-scrollable ">
          {loadgames}
        </div>
      </div >
    )
  }
}


const mapStateToProps = state => ({
  activegames: state.goofspiel.activegames,

})

export default connect(mapStateToProps, { getActiveGames, getGamePlay, getActivePlayers })(Activegames)









