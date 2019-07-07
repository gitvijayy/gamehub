import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
export default class Rules extends Component {
  render() {
    const rules = this.props.rules.map((rule) => {
      return (
        <Fragment key={rule}>
          <li >
            {rule}
          </li>
          <br />
        </Fragment>
      )
    })
    return (
      <Modal
        {...this.props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="logo bg-dark text-white">
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.gamename + " Rules"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light text-dark">
          <ul>
            {rules}
          </ul>
        </Modal.Body>
      </Modal>
    )
  }
}
