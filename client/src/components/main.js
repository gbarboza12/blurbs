import React from 'react';
import { Switch, Route } from 'react-router-dom'

import { PrivateRoute } from './privateroute';
import AddNew from './addblurb';
import Login from './login';
import Timeline from './timeline'
import Register from './register'
import Edit from './editblurb';
import Queue from './queue'
import LandingPage from './landingpage';

const Main = () => (
  <main>
    <Switch>
      <PrivateRoute exact path="/" component={Timeline} />
      <Route path="/landingpage" component={LandingPage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path='/addBlurb' component={AddNew} />
      <PrivateRoute path='/editBlurb' component={Edit} />
      <PrivateRoute path='/queue' component={Queue} />
    </Switch>
  </main>
)

export default Main;