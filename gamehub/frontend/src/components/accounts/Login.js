import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'

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
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }
    const { username, password } = this.state
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
            <label >Password</label>
            <textarea type="text"
              className="form-control"
              name="password"
              onChange={this.onChange}
              value={password} />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>


        {/* <img onClick={this.onClick} id="vijay" src=" https://cf.geekdo-images.com/opengraph/img/5UuUOQiIySCooAhYTNYX0Gvhqmk=/fit-in/1200x630/pic111209.jpg" /> */}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { login })(Login)
