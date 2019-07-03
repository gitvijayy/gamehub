import React, { Component, Fragment } from 'react'
import Loaders from '../../layout/Loaders'
export class NewGameWar extends Component {

    render(){
        return(
            <div className="col-12 col-md-10 bg-alternate-2" style={{ height: "52em" }} >
            <p className='logo' style={{
                    position: 'absolute',
                    top:'250px',
                    left:'37%'
                }}>Select Active Game...</p>
                <Loaders />
                <h1 className='logo' style={{
                    position: 'absolute',
                    top:'500px',
                    left:'37%'
                }}> Start New Game... </h1>
            </div>
        )
    }
}

export default NewGameWar;