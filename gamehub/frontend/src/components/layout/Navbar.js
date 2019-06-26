
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth.js';
import { login } from '../../actions/auth'
import Login from '../accounts/Login'
import Button from 'react-bootstrap/Button'
import Register from '../accounts/Register'
class Navbar extends Component {
  constructor(...args) {
    super(...args);

    this.state = { modalShowLogin: false, modalShowRegister: false };
  }
  render() {
    const { isAuthenticated, user } = this.props.auth
    let modalClose = () => this.setState({ modalShowLogin: false, modalShowRegister: false });

    let logout1 = () => {
      this.props.logout()
      this.setState({ modalShowLogin: false, modalShowRegister: false });
    }


    const authLinks = (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="row">
          <strong className="mr-2" style={{ marginTop: "4%" }}>{user ? `Welcome ${user.username}` : ""}</strong>
          <button onClick={logout1} className="mr-1 btn btn-danger btn-sm text-dark logout">Logout</button>
        </li>
      </ul>
    )
    const guestLinks = (
      <ul className="navbar-nav ">
        <li className="nav-item">
          {/* <Link to="/login" style={{ fontWeight: "bold" }} className="nav-link "> Login <span className="sr-only">(current)</span></Link> */}
          {/* <button
            className="game-images bg-dark"

            onClick={() => this.setState({ modalShowLogin: true })}
          >
            Login
        </button> */}

          <a role="button" onClick={() => this.setState({ modalShowLogin: true })} className="mr-1 btn btn-danger btn-sm text-dark login">Login</a>


          <Login
            show={this.state.modalShowLogin}
            onHide={modalClose}

          />
        </li>
        <li className="nav-item">
          {/* <Link to="/register" style={{ fontWeight: "bold" }} className="nav-link ">Register</Link> */}
          <a role="button" onClick={() => this.setState({ modalShowRegister: true })} className="mr-1 btn btn-danger btn-sm text-dark login">Register</a>
          <Register
            show={this.state.modalShowRegister}
            onHide={modalClose}

          />
        </li>
      </ul>
    )
    // < ButtonToolbar >
    // <Button
    //   variant="primary"
    //   onClick={() => this.setState({ modalShow: true })}
    // >
    //   Login
    //   </Button>

    // <Login
    //   show={this.state.modalShow}
    //   onHide={modalClose}
    // />
    // </ButtonToolbar >
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
  auth: state.auth,

})
export default connect(mapStateToProps, { logout })(Navbar)

// class App extends React.Component {


//   render() {
//     let modalClose = () => this.setState({ modalShow: false });

//     return (
//       <ButtonToolbar>
//         <Button
//           variant="primary"
//           onClick={() => this.setState({ modalShow: true })}
//         >
//           Launch vertically centered modal
//         </Button>

//         <MyVerticallyCenteredModal
//           show={this.state.modalShow}
//           onHide={modalClose}
//         />
//       </ButtonToolbar>
//     );
//   }
// }

// render(<App />);