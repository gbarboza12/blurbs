import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'mdbreact';

import { userActions } from '../actions/useractions';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {
				email: '',
				password: ''
			},
			submitted: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const { name, value } = event.target;
		const { user } = this.state;
		this.setState({
			user: {
				...user,
				[name]: value
			}
		});
	}
	handleSubmit(event) {
		event.preventDefault();
		this.setState({ submitted: true });
		const { user } = this.state;
		const { dispatch } = this.props;
		if (user.email && user.password) {
			dispatch(userActions.register(user));
		}
	}
	render() {
		const { registering } = this.props;
		const { user, submitted } = this.state;
		return (
			<div>
				<div className="text-center">
					<h3>Register</h3>
					<hr className="hr-light" />
				</div>
				<form onSubmit={this.handleSubmit}>
					<Input
						label="Email"
						group
						type="email"
						name="email"
						value={user.email ? user.email : ''}
						onChange={this.handleChange}>
					</Input>
					{submitted && !user.email &&
						<div className="help-block">Email is required</div>
					}
					<Input
						label="Password"
						group
						type="password"
						name="password"
						value={user.password}
						onChange={this.handleChange}>
					</Input>
					{submitted && !user.password &&
						<div className="help-block">Password is required</div>
					}
					<div className="text-center">
					<button className="btn btn-outline-secondary waves-effect">Register</button>
						<br /><br />
						{registering}
					</div>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { registering } = state.registration;
	return {
		registering
	};
}

export default connect(mapStateToProps)(Register);