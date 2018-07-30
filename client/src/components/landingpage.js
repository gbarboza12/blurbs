import React from 'react';
import {Container, Row } from 'reactstrap';

import Login from './login';
import Register from './register';

class LandingPage extends React.Component {
   constructor(props) {
		super(props);

		this.state = {
         register: false,
         login: true	
      };

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
      return (
         <Container >
            <Row>
               <div className="content">
                  <div className="card">
                     <div className="card-body">
                        {this.state.login ? <Login /> : null}
                        {this.state.register ? <Register /> : null}
                        <div className="text-center">
                        {this.state.login ? 
                           <a href="#" onClick={this.switch.bind(null, "register")}>Click here to register</a> 
                           : null}
                        {this.state.register ? <a href="#" onClick={this.switch.bind(null, "login")}>Cancel</a> : null }
								</div>
                     </div>
                  </div>
               </div>
            </Row>
         </Container>
      );
   }
}
export default LandingPage;