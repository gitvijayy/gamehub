import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


export class Login extends Component {
  state = {
    username: '',

    password: '',
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.login(this.state.username, this.state.password)
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {

    if (this.props.isauthenticated == "True") {

      this.props.onHide
    }
    const { username, password } = this.state
    return (
      // m-auto

      <Modal
        {...this.props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="bg-dark text-white logo">
          <Modal.Title id="contained-modal-title-vcenter">
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light text-dark">

          {/* <div className="card card-body mt-4 mb-4"> */}
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>username</label>
              <input type="text" className="form-control"
                name="username"
                onChange={this.onChange}
                value={username} />

            </div>

            <div className="form-group">
              <label >Password</label>
              <input type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password} />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-danger login">Login</button>
            </div>
            <p>
              Don't have an account?<a href="#"> Register</a>
            </p>
          </form>
          {/* </div> */}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    )
  }
}


const mapStateToProps = state => ({
  isauthenticated: state.auth.isAuthenticated ? "True" : "False",

})

export default connect(mapStateToProps, { login })(Login)

// class MyVerticallyCenteredModal extends React.Component {
//   render() {
//     return (

//     );
//   }
// }
