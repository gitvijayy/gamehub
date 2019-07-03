import React, { Component, Fragment } from 'react'
import { getActivePlayers } from '../../actions/goofspiel'
import { connect } from 'react-redux'
class Activeplayers extends Component {

  componentDidMount() {

    this.props.getActivePlayers()

    // setInterval(() => {
    //   this.props.getActivePlayers()
    // }, 10000);

  }




  render() {




    const male = require("../images/male.png")
    // const { players } = this.state


    let loadplayers;




    // if (this.props.activeplayers && this.props.activeplayers[0] && this) {
    //   console.log(this.props.activeplayers[0].user)
    // }

    let blockStyle = {
      maxHeight: "470px!important",
      height: "470px",
      marginTop: "10%"
    }

    if (this.props.activeplayers) {
      console.log("in")
      loadplayers =

        <div style={blockStyle} className="container pre-scrollable ">

          {

            this.props.activeplayers.map((player, index) => {

              if (player.user && player.user.username && player.status == "online") {
                return (
                  <h5 key={index} className="text-center font-weight-bold user-block">
                    <img className="user" src={male} />{player.user.username}
                  </h5>
                )
              }


            })}
        </div>
    }



    return (
      // <section className=" text-dark side-containers active-users">
      <Fragment>
        <button className="btn btn-dark btn-lg  text-white bg-dark">Players Online</button>

        {loadplayers}
      </Fragment>
      // </section>
    )
  }
}

const mapStateToProps = state => ({
  activeplayers: state.goofspiel.activeplayers

})

export default connect(mapStateToProps, { getActivePlayers })(Activeplayers)









