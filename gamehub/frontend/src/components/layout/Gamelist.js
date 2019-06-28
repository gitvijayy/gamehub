import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { setGame } from '../../actions/defaultgame'
import { connect } from 'react-redux'
class Gamelist extends Component {

  state = {
    gamelist: [{
      url: "/defaultgame",
      name: "defaultgame",
      img: require("../images/rummy.jpeg"),
      description: "Some quick example text to build on the card title and make up the bulk ofthecard's content."

    }, {
      url: "/war",
      name: "War",
      img: require("../images/war.png"),
      description: "Some quick example text to build on the card title and make up the bulk ofthecard's content."

    }, {
      url: "/idiot",
      name: "Idiot",
      img: require("../images/idiot.png"),
      description: "Some quick example text to build on the card title and make up the bulk ofthecard's content."

    }, {
      url: "/memory",
      name: "Memory",
      img: require("../images/memory.jpg"),
      description: "Some quick example text to build on the card title and make up the bulk ofthecard's content."

    }, {
      url: "/hearts",
      name: "Hearts",
      img: require("../images/hearts.png"),
      description: "Some quick example text to build on the card title and make up the bulk ofthecard's content."

    },
    {
      url: "/goofspiel",
      name: "Goofspiel",
      img: require("../images/goofspiel.jpeg"),
      description: "Some quick example text to build on the card title and make up the bulk ofthecard's content."

    }],
    loading: false
  }

  onClick = (e) => {
    // this.setState({ loading: true });
    // setTimeout(
    //   function () {
    //     this.setState({ loading: false });
    //   }
    //     .bind(this),
    //   2000
    // );
    // return e
    // <Link to={e.target.name}>Register</Link>
    document.cookie = `gameid=0`
    this.props.setGame(e)
  }

  render() {
    const styles = { borderRadius: "5px" }
    const { gamelist } = this.state
    const loadgamelist = gamelist.map(game => {

      return (
        <div key={game.url} className="card col-12 col-md-3 bg-common game-top-div game-cards">
          <img className="card-img-top card-images game-images" src={game.img} alt="Card image cap" />
          <div className="card-body text-white">
            <h4 className="card-title  ">{game.name}</h4>
            <p className="card-text ">{game.description}asdad</p>
            <article className="d-flex justify-content-between">
              <Link style={styles} onClick={() => {
                this.onClick(game.name)
              }} className="btn btn-warning btn-lg text-dark " to={game.url}>PLAY</Link>
              {/* {this.state.loading && <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>} */}
              {/* <button  className="btn btn-dark btn-lg">PLAY</button></Link> */}

              < button style={styles} className=" btn btn-warning btn-lg text-dark">Rules</button>
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
  gamename: state.defaultgame.name
})

export default connect(mapStateToProps, { setGame })(Gamelist)





