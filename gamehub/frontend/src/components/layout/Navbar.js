
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth.js';

class Navbar extends Component {

  render() {
    const { isAuthenticated, user } = this.props.auth
    const authLinks = (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        {/* <span className="navbar-text mr-3">
          <strong>{user ? `Welcome${user.username}` : ""}</strong>
        </span> */}
        {/* <li className="nav-item">
          <strong>{user ? `Welcome${user.username}` : ""}</strong> */}

        {/* <li className="nav-item">
          <button onClick={this.props.logout} className="nav-link btn btn-info btn-sm text-light">Logout</button>
        </li> */}

        {/* <Link to="/login" style={{ fontWeight: "bold" }} className="nav-link "> Login <span className="sr-only">(current)</span></Link> */}
        {/* <button onClick={this.props.logout} className="nav-link btn btn-info btn-sm text-light">Logout</button>
        </li> */}

        {/* <span className="navbar-text mr-3"> */}

        {/* </span> */}
        <li className="row">
          <strong class="mr-2" style={{ marginTop: "4%" }}>{user ? `Welcome ${user.username}` : ""}</strong>

          <button onClick={this.props.logout} className="mr-1 btn btn-danger btn-sm text-dark logout">Logout</button>
        </li>




      </ul>
    )
    const guestLinks = (
      <ul className="navbar-nav ">
        <li className="nav-item">
          <Link to="/login" style={{ fontWeight: "bold" }} className="nav-link "> Login <span className="sr-only">(current)</span></Link>
        </li>
        <li className="nav-item">
          <Link to="/register" style={{ fontWeight: "bold" }} className="nav-link ">Register</Link>
        </li>
      </ul>
    )


    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-common" >
        <a className="logo navbar-brand col-3 col-md-11" href="#"><img src={require('../images/aces.png')} />GameHub</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { logout })(Navbar)

