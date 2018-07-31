import React from 'react';
import { connect } from 'react-redux';
import {Input} from 'mdbreact';

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
				<div className="text-center">
					<h3>Login</h3>
				</div>

				<form onSubmit={this.handleSubmit}>
						<Input
							label="Email"
							group
							type="email"
							name="email"
							value={email}
							onChange={this.handleChange}>
						</Input>
						{submitted && !email &&
							<div className="help-block">Email is required</div>
						}
						<Input
							label="Password"
							group
							type="password"
							name="password"
							value={password}
							onChange={this.handleChange}>
						</Input>
						{submitted && !password &&
							<div className="help-block">Password is required</div>
						}
					<div className="text-center">
						<button className="btn btn-outline-secondary waves-effect">Login</button>
						<br />
						{loggingIn}
					</div>
				</form>
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