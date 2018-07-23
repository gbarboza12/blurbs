import { combineReducers } from 'redux';

import {alert} from '../reducers/alertreducer';
import {authentication} from '../reducers/authenticationreducer';
import {registration} from '../reducers/registrationreducer'
import {users} from '../reducers/usersreducer'

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert
  });
  
  export default rootReducer;