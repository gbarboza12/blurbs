import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { Router} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'pretty-checkbox/src/pretty-checkbox.scss'

 
import  {store}  from './helpers/store'
import { history } from './helpers/history';
import App from './App';


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
 document.getElementById('root'))
registerServiceWorker();
