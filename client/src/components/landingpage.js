import React from 'react';
import {Container, Row } from 'reactstrap';
import { connect } from 'react-redux';

import Login from './login';
import Register from './register';
import  {alertActions}  from '../actions/alertactions';
import { history } from '../helpers/history';

class LandingPage extends React.Component {
   constructor(props) {
		super(props);

		this.state = {
         register: false,
         login: true	
      };

      const { dispatch } = this.props;
      history.listen((location, action) => {
          // clear alert on location change
          dispatch(alertActions.clear());
      });

      this.switch = this.switch.bind(this);
   }

   switch(word) {
      var register, login;
      if(word === "register") {
         register = true;
         login = false;
      } else {
         login = true;
         register = false;
      }
      return this.setState({login: login, register: register});
   }

   render() {
      const { alert } = this.props;
      return (
         <Container >
            <Row>
               <div className="content">
               <div>
                    <div className="text-center">
                        {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
                    </div>
                </div>
                  <div className="card">
                     <div className="card-body">
                        {this.state.login ? <Login /> : null}
                        {this.state.register ? <Register /> : null}
                        <div className="text-center">
                        {this.state.login ? 
                           <a href='# ' onClick={this.switch.bind(null, "register")}>Click here to register</a> 
                           : null}
                        {this.state.register ? <a href='# ' onClick={this.switch.bind(null, "login")}>Cancel</a> : null }
								</div>
                     </div>
                  </div>
               </div>
            </Row>
         </Container>
      );
   }
}

function mapStateToProps(state) {
   const { alert } = state;
   return {
       alert
   };
 }

export default connect(mapStateToProps)(LandingPage);