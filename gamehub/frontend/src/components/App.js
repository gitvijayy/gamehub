
require("../../templates/frontend/main.css")

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Alerts from './layout/Alerts'
import Goofspiel from './games/goofspiel/Goofspiel'
import Memory from './games/memory/Memory'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Provider } from 'react-redux'
import store from '../store'
import { loadUser } from '../actions/auth'
import WarGame from './games/wargame/WarGame'
import Gamelist from './layout/Gamelist'


const alertOptions = {
  timeout: 3000,
  position: "top center"
}



class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser())
  }
  render() {

    return (


      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Navbar />
              <Alerts />

              <div className="container">

                <Switch>

                  <Route exact path="/" component={Gamelist} />


                  <Route exact path="/war" component={WarGame} />
                  <Route exact path="/goofspiel" component={Goofspiel} />
                  <Route exact path="/memory" component={Memory} />

                </Switch>





              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))