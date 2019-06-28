import React, { Component } from 'react'


import Loader from 'react-loader-spinner'

export default class Loaders extends Component {
  //other logic
  render() {
    const styles = {
      "display": "flex",
      "justifyContent": "center",
      "alignItems": "center",
      "height": "900px",
    }
    return (
      <div className="container" style={styles}>
        <Loader
          type="Bars"
          color="#00BFFF"
          height="150"
          width="150"
        />
      </div>
    );
  }
}