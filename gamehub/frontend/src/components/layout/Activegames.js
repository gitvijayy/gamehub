import React, { Component, Fragment } from 'react'

export default class Activegames extends Component {

  state = {
    games: ["asdad", "asdad", "asdad", "asdad", "asdad", "asdad", "asdad", "asdad",]
  }

  render() {

    const { games } = this.state
    const loadgames =

      <div className="container">

        {

          games.map((game, index) => {

            return <button key={index} className="col-12 alert-success btn-lg" style={{ height: "80px" }}>{game}</button>
          })}
      </div>




    return (
      <section className="col-1 col-md-2 text-white side-containers active-games ">
        <h3 className="text-white alert-danger bg-dark text-center justify-content-center box-shadow">Active Games</h3>
        {loadgames}
      </section>
    )
  }
}









