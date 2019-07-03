import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


export default class Rules extends Component {
  state = {
    username: '',

    password: '',
  }

  // onSubmit = e => {
  //   e.preventDefault()
  //   this.props.login(this.state.username, this.state.password)
  // }

  // onChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {

    // // if (this.props.isauthenticated == "True") {
    // const rules = this.props.rules.map(rule => {
    //   console.log(rule)
    //   return <li>{rule}</li>
    // })
    // const name = this.props.gamename
    //   this.props.onHide
    // }
    // const { username, password } = this.state
    return (
      // m-auto

      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered

      >
        <Modal.Header closeButton className="logo bg-dark text-white">
          <Modal.Title id="contained-modal-title-vcenter">
            {name + " Rules"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light text-dark">

          {/* <div className="card card-body mt-4 mb-4"> */}

          <ul>

            {/* {rules} */}
          </ul>
          {/* </div> */}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    )
  }
}


// const mapStateToProps = state => ({
//   isauthenticated: state.auth.isAuthenticated ? "True" : "False",

// })

// export default connect({ login })(Rules)

// class MyVerticallyCenteredModal extends React.Component {
//   render() {
//     return (

//     );
//   }
// }
