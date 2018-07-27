import React from 'react';
import { connect } from 'react-redux';
import { store } from './helpers/store';

import './App.css';
import  {alertActions}  from './actions/alertactions';
import { history } from './helpers/history';
import Header from './components/header'
import Main from './components/main'

class App extends React.Component {
  constructor(props) {
      super(props);

      const { dispatch } = this.props;
      history.listen((location, action) => {
          // clear alert on location change
          dispatch(alertActions.clear());
      });
  }

    render() {
        const { alert } = this.props;
        return (
            <div>
                <Header />
                <div>
                    <div className="col-sm-8 col-sm-offset-2">
                        {console.log(store.getState())}
                        {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
                    </div>
                </div>
                <div>
                    <Main />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

export default connect(mapStateToProps)(App);
