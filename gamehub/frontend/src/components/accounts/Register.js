import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../../actions/auth'
import { createMessage } from '../../actions/messages'

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
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }
    const { username, email, password, password2 } = this.state
    return (
      // m-auto
      <div className="card card-body mt-4 mb-4">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>username</label>
            <input type="text" className="form-control"
              name="username"
              onChange={this.onChange}
              value={username} />

          </div>
          <div className="form-group">
            <label >Email</label>
            <input type="Email"
              className="form-control"
              name="email"
              onChange={this.onChange}
              value={email} />
          </div>

          <div className="form-group">
            <label >Password</label>
            <textarea type="text"
              className="form-control"
              name="password"
              onChange={this.onChange}
              value={password} />
          </div>
          <div className="form-group">
            <label >Confirm Password</label>
            <textarea type="text"
              className="form-control"
              name="password2"
              onChange={this.onChange}
              value={password2} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>


        {/* <img onClick={this.onClick} id="vijay" src=" https://cf.geekdo-images.com/opengraph/img/5UuUOQiIySCooAhYTNYX0Gvhqmk=/fit-in/1200x630/pic111209.jpg" /> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { register, createMessage })(Register)
