import React, { Component } from 'react'


import Loader from 'react-loader-spinner'

export default class Loaders extends Component {
  //other logic

  render() {
    const types = ["Audio", "Bars", "Circles", "Grid", "Hearts", "Oval", "Puff", "TailSpin", "ThreeDots",
      "Watch", "RevolvingDot", "Triangle", "Plane", "CradleLoader", "NotSpecified"]
    // const colors = ["black", "red", "white", "tan", "darkyellow"]
    const type = types[Math.floor(Math.random() * types.length - 1)]
    // const color = colors[Math.floor(Math.random() * colors.length - 1)]
    const styles = {
      "display": "flex",
      "justifyContent": "center",
      "alignItems": "center",
      "height": "500px",
    }
    return (
      <div className="container" style={styles}>
        <Loader
          type={type}
          color="black"
          height="150"
          width="150"
        />
      </div>
    );
  }
}

