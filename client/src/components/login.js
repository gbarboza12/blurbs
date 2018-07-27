import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';

import { userActions } from '../actions/useractions';

class Login extends React.Component {
	constructor(props) {
		super(props);

		// reset login status
		this.props.dispatch(userActions.logout());

		this.state = {
			email: '',
			password: '',
			submitted: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ submitted: true });
		const { email, password } = this.state;
		const { dispatch } = this.props;
		if (email && password) {
			dispatch(userActions.login(email, password));
		}
	}

	render() {
		const { loggingIn } = this.props;
		const { email, password, submitted } = this.state;
		return (
			<div>
				<div class="text-center">
					<h3>Login</h3>
					<hr class="hr-light" />
				</div>

				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Input
							type="email"
							placeholder="Email"
							name="email"
							id="dynamic-label-input"
							value={email}
							onChange={this.handleChange}>
						</Input>
						<Label for="dynamic-label-input">Email</Label>
						{submitted && !email &&
							<div className="help-block">Email is required</div>
						}
					</FormGroup>
					<FormGroup>
						<Input
							type="password"
							placeholder="Password"
							name="password"
							id="dynamic-label-input"
							value={password}
							onChange={this.handleChange}>
						</Input>
						<Label for="dynamic-label-input">Password</Label>
						{submitted && !password &&
							<div className="help-block">Password is required</div>
						}
					</FormGroup>
					<div class="text-center">
						<button className="btn1">Login</button>
						<br />
						{loggingIn}
					</div>
				</Form>
			</div>
		);
	}
}


function mapStateToProps(state) {
	const { loggingIn } = state.authentication;
	return {
		loggingIn
	};
}

export default connect(mapStateToProps)(Login);