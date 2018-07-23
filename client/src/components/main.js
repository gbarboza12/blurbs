import React from 'react';
import { Switch, Route } from 'react-router-dom'

import AddNew from './addnew';
import Login from './login';
import Timeline from './timeline'
import Register from './register'
import { PrivateRoute } from './privateroute';

const Main = () => (
  <main>
    <Switch>
      <PrivateRoute exact path="/" component={Timeline} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path='/addNew' component={AddNew} />
    </Switch>
  </main>
)

export default Main;