
require("../../templates/frontend/main.css")

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'
import Navbar from './layout/Navbar'
import { login } from '../actions/auth'
import Dashboard from './layout/Dashboard'
import Alerts from './layout/Alerts'
import Login from './accounts/Login'
import Register from './accounts/Register'
import PrivateRoute from './common/PrivateRoute'
import Defaultgame from './games/Defaultgame'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Provider } from 'react-redux'
import store from '../store'
import { loadUser } from '../actions/auth'
import WarGame  from './games/wargame/WarGame'
import Gamelist from './layout/Gamelist'
import Activegames from './layout/Activegames'
import Activeplayers from './layout/Activeplayers'


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
        // {/* <h1>Hello there how are you</h1> */}
    
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Navbar />
              <Alerts />

              <div className="container">
                {/* <Activegames /> */}
                {/* <Gamelist /> */}

                {/* <Test /> */}
                <Switch>
                  {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
                  <Route exact path="/" component={Gamelist} />

                  {/* <Route exact path="/loaders" component={Loaders} /> */}

                  <Route exact path="/defaultgame" component={Defaultgame} />
                  {/* <Route exact path="/login" component={Login} /> */} 
                  <Route exact path="/war" component={WarGame}/>
                </Switch>
                {/* <Dashboard /> */}
                {/* <Defaultgame /> */}

                {/* <Activeplayers /> */}




              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))