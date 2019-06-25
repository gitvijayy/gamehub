
import React, { Component } from 'react'



class Navbar extends Component {

  render() {

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-common" >
        <a className="logo navbar-brand col-3 col-md-11" href="#"><img src={require('../images/aces.png')} />GameHub</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <a style={{ fontWeight: "bold" }} className="nav-link " href="#">Login <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a style={{ fontWeight: "bold" }} className="nav-link " href="#">Register</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar

