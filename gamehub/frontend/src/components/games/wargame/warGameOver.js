import React, { Component } from 'react'
import Loaders from '../../layout/Loaders'
export class WarGameOver extends Component {
    
    render(){
        console.log(this.props.user[0])
        console.log(this.props.opponent[0])
        const winner = this.props.user[0].deck_length > this.props.opponent[0].deck_length? this.props.user[0].player.username : this.props.opponent[0].player.username;
        const loser = this.props.user[0].deck_length < this.props.opponent[0].deck_length? this.props.user[0].player.username : this.props.opponent[0].player.username;

        return(
            <div className="col-12 col-md-10 bg-alternate-2" style={{ height: "52em" }} >
                <p className='logo' style={{
                    position: 'absolute',
                    top:'250px',
                    left:'43%'
                }}>{winner} won !</p>
                <Loaders/>
                <h1 className='logo' style={{
                    position: 'absolute',
                    top:'500px',
                    left:'43%'
                }}> Game Over! </h1>

            </div>
        )
    }
}

export default WarGameOver;