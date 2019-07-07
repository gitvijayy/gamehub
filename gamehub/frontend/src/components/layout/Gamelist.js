import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { setGame } from '../../actions/goofspiel'
import { connect } from 'react-redux'
import { cssAnimations } from '../games/goofspiel/datahelpers'
import Login from '../accounts/Login'
import Rules from '../layout/Rules'
class Gamelist extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      gamelist: [
        {
          url: "/goofspiel",
          name: "Goofspiel",
          img: require("../images/goofspiel.jpeg"),
          description: "Also known as The Game of Pure Strategy or GOPS, is a card game for two players. Rules are quite simple, but endless number of possibilities for strategy during play of each hand",
          status: "Active",
          rules: ["Each player receives a suit of 13 cards to play against each other",
            "A third suit of cards is designated as the prize cards players have to bid for",
            "Each card is worth their face value. A's are worth 1 point, J's are worth 11 points, Q's are worth 12 points, K's are worth 13 points",
            "On each turn, a prize card is revealed from the prize suit",
            "Each player then play a card to bid for the prize card. The player with the higher bidding card collects the prize card",
            "The game ends when there are no more prize cards available for bidding",
            "When the game ends, the player with the highest number of prize cards points wins"]
        },
        {
          url: "/war",
          name: "War",
          img: require("../images/war.png"),
          description: "A simple card game for two players. Much like real war it's incredibly long game to play. Can be played by any age group and the play relies exclusively on luck of the random draw",
          status: "Active",
          rules: ["Dealing: The deck is divided evenly, with each player receiving 26 cards, dealt one at a time, face down.",
            "GamePlay: Each player turns up a card and the player with the higher card takes both cards and puts them, face down, at the bottom of his deck. Equal cards will go to first player.",
            "Winner: Winner is the player who took all the cards in the deck."]
        },
        {
          url: "/memory",
          name: "Memory",
          img: require("../images/memory.jpg"),
          description: "Also known as Match Match, Concentration, or simply Pairs, is a card game in which all cards are face down . The object of the game is to turn over pairs of matching cards each round",
          status: "Active",
          rules: ["Turn over any two cards.",
            "If the two cards suit and number match, its a pair. you win a point", "Watch and remember during the other players turn.",
            "A players turn is not over until they are unable to make a matching pair.",
            "The game continues in this fashion until all the cards are played.",
            "The game is over when all the cards have been matched.",

            "The player with the most matches wins."]
        },


        {
          url: "/rummy",
          name: "Rummy",
          img: require("../images/rummy.jpeg"),
          description: "Inidan Rummy is a cross between Rummy 500 and gin, Goal is to make valid sets of 13 cards that are distributed",
          status: "Inactive",
          rules: []

        }, {
          url: "/idiot",
          name: "Idiot",
          img: require("../images/idiot.png"),
          description: "The object of the game which is to lose all of one's cards, with the final player being crowned the idiot",
          status: "Inactive",
          rules: []
        },
        {
          url: "/hearts",
          name: "Hearts",
          img: require("../images/hearts.png"),
          description: "An evasion-type trick-taking playing card game for four players. The objective is to be with the fewest points.",
          status: "Inactive",
          rules: []
        }],

      loading: false,
      modalShowLogin: false,
      modalShowRules: false,
      gamename: "",
      rules: []

    }


  }






  onClick = (e) => {

    document.cookie = `gameid=0`
    document.cookie = `gamename=${e}`
    this.props.setGame(e)
  }

  render() {

    const { isAuthenticated, user } = this.props.auth
    let modalClose = () => this.setState({ modalShowLogin: false, modalShowRules: false });


    const styles = { borderRadius: "5px" }
    const { gamelist } = this.state
    let activeBlock = ""
    const loadgamelist = gamelist.map(game => {

      if (game.status == "Active") {
        console.log(game.name)
        activeBlock =
          <Fragment>

            {isAuthenticated ? <Link style={styles} onClick={() => {
              this.onClick(game.name)
            }} className="btn btn-warning btn-lg text-dark " to={game.url} >PLAY</Link>
              :

              <button role="button" onClick={() => this.setState({ modalShowLogin: true })}
                className="btn btn-warning btn-lg text-dark">Play

              </button>


            }


            <button role="button" onClick={() => this.setState({ rules: game.rules, gamename: game.name, modalShowRules: true })}
              className="btn btn-warning btn-lg text-dark">Rules

              </button>


            <Login show={this.state.modalShowLogin} onHide={modalClose} />
            <Rules show={this.state.modalShowRules} onHide={modalClose} gamename={this.state.gamename} rules={this.state.rules} />


          </Fragment>
      }




      if (game.status == "Inactive") {
        activeBlock = <img className="construction" src={require("../images/construction.png")} alt="Card image cap" />
      }


      return (


        <div key={game.url} className="card col-12 col-md-3 bg-common game-top-div game-cards">

          <img className="card-img-top card-images game-images" src={game.img} alt="Card image cap" />
          <div className="card-body text-white">
            <h4 className="card-title  ">{game.name}</h4>

            <p className="card-text ">{game.description}</p>
            <article className="d-flex justify-content-between">
              {activeBlock}
            </article>
          </div>
        </div>


      )
    })


    return (
      <section className=" col-12 row media-margin">
        {loadgamelist}
      </section>
    )
  }
}



const mapStateToProps = state => ({
  gamename: state.goofspiel.name,
  auth: state.auth,
})

export default connect(mapStateToProps, { setGame })(Gamelist)





