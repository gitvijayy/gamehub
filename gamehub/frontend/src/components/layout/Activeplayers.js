import React, { Component, Fragment } from 'react'
import { getActivePlayers } from '../../actions/goofspiel'
import { connect } from 'react-redux'
class Activeplayers extends Component {


  componentDidMount() {

    this.props.getActivePlayers()
  }

  render() {


    const male = require("../images/male.png")


    let loadplayers;


    let blockStyle = {
      maxHeight: "380px!important",
      height: "380px",
      marginTop: "10%"
    }

    if (this.props.activeplayers) {
      console.log(1, this.props.activeplayers)
      console.log("in")
      loadplayers =

        <div style={blockStyle} className="container pre-scrollable ">

          {

            this.props.activeplayers.map((player, index) => {

              if (player.user && player.user.username && player.status == "online") {
                return (
                  <h5 key={index} className="col-12 text-center font-weight-bold user-block">
                    <img className="user" src={male} />{player.user.username}
                  </h5>
                )
              }


            })}
        </div>
    }



    return (

      <Fragment>
        <button style={{ marginTop: "5%" }} className="btn btn-dark btn-lg  text-white bg-dark">Players</button>

        {loadplayers}
      </Fragment>

    )
  }
}

const mapStateToProps = state => ({
  activeplayers: state.goofspiel.activeplayers

})

export default connect(mapStateToProps, { getActivePlayers })(Activeplayers)









