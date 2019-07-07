import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register } from '../../actions/auth'
import { createMessage } from '../../actions/messages'
import Modal from 'react-bootstrap/Modal'

export class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: ''
  }


  onSubmit = e => {
    e.preventDefault()
    const { username, email, password, password2 } = this.state
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: "Passwords Do not Match" })
    } else {
      const newUser = {

        username,
        password,
        email
      }
      this.props.register(newUser)
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    if (this.props.isauthenticated == "True") {

      this.props.onHide
    }
    const { username, email, password, password2 } = this.state
    return (


      <Modal
        {...this.props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered


      >
        <Modal.Header closeButton className="bg-dark text-white logo">
          <Modal.Title id="contained-modal-title-vcenter">
            Register
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light text-dark">

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
              <label >Confirm Password</label>
              <input type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2} />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-danger login">Submit</button>
            </div>
          </form>

        </Modal.Body>

      </Modal>

    )
  }
}

const mapStateToProps = state => ({
  isauthenticated: state.auth.isAuthenticated ? "True" : "False",
})
export default connect(mapStateToProps, { register, createMessage })(Register)
