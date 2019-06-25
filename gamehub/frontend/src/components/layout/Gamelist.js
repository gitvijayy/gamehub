import React, { Component } from 'react'

export default class Gamelist extends Component {

  state = {
    gamelist: [{
      url: "/rummy",
      name: "Rummy",
      img: require("../images/rummy.jpeg"),
      description: "Some quick example text to build on the card title and make up the bulk ofthecard's content."

    }, {
      url: "/war",
      name: "War",
      img: require("../images/rummy.jpeg"),
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

    }]
  }

  render() {

    const { gamelist } = this.state
    const loadgamelist = gamelist.map(game => {
      return (
        <div key={game.url} className="card col-12 col-md-3 bg-common game-top-div">
          <img className="card-img-top card-images" src={game.img} alt="Card image cap" />
          <div className="card-body ">
            <h4 className="card-title  ">{game.name}</h4>
            <p className="card-text ">{game.description}</p>
            <article className="d-flex justify-content-between">
              <button className="btn btn-dark btn-lg">PLAY</button>
              <button className=" btn btn-dark btn-lg">Rules</button>
            </article>
          </div>
        </div>
      )
    })


    return (
      <section className=" col-12 col-md-8 d-flex row">
        {loadgamelist}
      </section>
    )
  }
}









