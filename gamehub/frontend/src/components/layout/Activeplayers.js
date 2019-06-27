import React, { Component, Fragment } from 'react'

export default class Activeplayers extends Component {
  state = {
    players: ["asdad", "asdad", "asdad", "asdad", "asdad", "asdad", "asdad", "asdad"]
  }

  render() {
    const male = require("../images/male.png")
    const { players } = this.state
    const loadplayers =

      <div className="container pre-scrollable ">

        {

          players.map((player, index) => {

            return (
              <h4 key={index} className="text-center font-weight-bold user-block">
                <a href="#"><img className="user" src={male} />{player}</a>
              </h4>
            )
          })}
      </div>


    return (
      // <section className=" text-dark side-containers active-users">
      <Fragment>
        <button className=" btn btn-dark btn-lg newgame text-white">Players Online</button>

        {loadplayers}
      </Fragment>
      // </section>
    )
  }
}









