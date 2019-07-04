import React, { Component } from 'react'
import Loaders from '../../layout/Loaders'
export class WaitingGameWar extends Component {
    
    render(){

        return(
            <div className="col-12 col-md-10 bg-alternate-2" style={{ height: "52em" }} >
                <p className='logo' style={{
                    position: 'absolute',
                    top:'250px',
                    left:'38%'
                }}>Waiting for player...</p>
                <Loaders/>
                <h1 className='logo' style={{
                    position: 'absolute',
                    top:'500px',
                    left:'38%'
                }}>Waiting for player...</h1>

            </div>
        )
    }
}

export default WaitingGameWar;