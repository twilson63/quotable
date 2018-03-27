import React, { Component } from 'react'
import Auth from './auth'
import history from './history'

import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Show from './pages/show'
import { not } from 'ramda'

const auth = new Auth()

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={secure(Show)} />
      <Route path="/login" component={Login} />
      <Route path="/callback" component={Callback} />
    </Switch>
  </Router>
)

export default App

function secure(Component) {
  return function(props) {
    if (not(auth.isAuthenticated())) {
      return <Redirect to="/login" />
    }
    return (
      <Component {...props} token={auth.token()} logout={() => auth.logout()} />
    )
  }
}

function Login() {
  auth.login()
  return null
}

function Callback() {
  auth.handleAuthentication()
  return null
}
