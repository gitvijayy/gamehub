import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'


export class WarRules extends Component {
    
    render(){
        return(
            <Modal
        {...this.props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton style={{ background: "tan", color: "black" }}>
          <Modal.Title id="contained-modal-title-vcenter">
            War Rules:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
            <h5> Welcome To War!! </h5>
            <p> <b>Dealing:</b> The deck is divided evenly, with each player receiving 26 cards, dealt one at a time, face down. </p>
            <p> <b>GamePlay:</b> Each player turns up a card and the player with the higher card takes both cards and puts them, face down, at the bottom of his deck. Equal cards will go to first player. </p>
            <p> <b>Winner:</b> Winner is the player who took all the cards in the deck. </p>  
        </Modal.Body>
        </Modal>
        )
    }
}

export default WarRules;