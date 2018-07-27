import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';

import { userActions } from '../actions/useractions';
import Login from './login';
import Register from './register';

class LandingPage extends React.Component {
   constructor(props) {
		super(props);

		this.state = {
         showRegister: false,	
      };

      this.handlePageChange = this.handlePageChange.bind(this);
   }

   handlePageChange() {
      this.setState({
          showRegister: !this.state.showRegister,
      });
   }

	render() {
      const {showRegister} = this.state;
      console.log(showRegister);
		return (		
			<Container >
				<Row>
					<div className="content">
						<div className="card">
							<div className="card-body">
                     {showRegister ? <Register/>: <Login/>}
								
                        <br/>
								<div className="text-center">
									<a href="" style={{textAlign:'center'}} onClick={this.handlePageChange}>Click here</a> to register
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