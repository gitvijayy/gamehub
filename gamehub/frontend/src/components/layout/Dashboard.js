import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class Dashboard extends Component {
  render() {
    return (

      <Link to="/defaultgame"> <button className="btn btn-primary">DefaultGame</button></Link>

    )
  }
}

export default Dashboard
