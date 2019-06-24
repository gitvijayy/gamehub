import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getLeads, addLead } from '../../actions/leads'

export class Form extends Component {
  state = {
    name: '',
    email: '',
    message: ''
  }
  // static propTypes = {
  //   addLead: PropTypes.func.isRequired
  // }
  onClick = (e) => {
    let { name, email, message } = this.state
    name = e.target.id
    console.log(e.target.id)
    const lead = { name, email, message }
    this.props.addLead(lead)


  }
  onChange = e => this.setState({ [e.target.name]: e.target.value })
  onSubmit = e => {
    e.preventDefault()
    const { name, email, message } = this.state
    const lead = { name, email, message }
    this.props.addLead(lead)
    this.setState({
      name: "",
      email: "",
      message: ""
    })
  }

  render() {
    const { name, email, message } = this.state
    return (
      <div className="card card-body mt-4 mb-4">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>name</label>
            <input type="text" className="form-control"
              name="name"
              onChange={this.onChange}
              value={name} />

          </div>
          <div className="form-group">
            <label >Email</label>
            <input type="Email"
              className="form-control"
              name="email"
              onChange={this.onChange}
              value={email} />
          </div>

          <div className="form-group">
            <label >Message</label>
            <textarea type="text"
              className="form-control"
              name="message"
              onChange={this.onChange}
              value={message} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>

        </form>

        <button onClick={this.onClick} className="btn btn-primary">Submit</button>
        {/* <img onClick={this.onClick} id="vijay" src=" https://cf.geekdo-images.com/opengraph/img/5UuUOQiIySCooAhYTNYX0Gvhqmk=/fit-in/1200x630/pic111209.jpg" /> */}
      </div>
    )
  }
}

export default connect(null, { addLead })(Form)
