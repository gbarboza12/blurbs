import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Timeline from './timeline';
import AddNew from './addnew';
import SignUp from './signup';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Timeline}/>
      <Route path='/addNew' component={AddNew}/>
      <Route path='/signUp' component={SignUp}/>
    </Switch>
  </main>
)

export default Main;