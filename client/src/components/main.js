import React from 'react';
import { Switch, Route } from 'react-router-dom'

import AddNew from './addblurb';
import Login from './login';
import Timeline from './timeline'
import Register from './register'
import Edit from './editblurb';
import { PrivateRoute } from './privateroute';

const Main = () => (
  <main>
    <Switch>
      <PrivateRoute exact path="/" component={Timeline} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path='/addBlurb' component={AddNew} />
      <PrivateRoute path='/editBlurb' component={Edit} />
    </Switch>
  </main>
)

export default Main;