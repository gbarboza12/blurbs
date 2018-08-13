import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import { userActions } from '../actions/useractions';

const styles = theme => ({
	container: {
	  flexWrap: 'wrap',
	  textAlign: 'center'
	},
	textField: {
	  marginLeft: theme.spacing.unit,
	  marginRight: theme.spacing.unit,
	  marginBottom: 10,
	  minWidth: 120,
	  width: 200,
	},
 });

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

		this.handleTFChange = this.handleTFChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleTFChange = name => event => {
		const { user } = this.state;
		this.setState({
			user: {
				...user,
				  [name]: event.target.value,
			}
		});
	 };
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
		const { registering, classes } = this.props;
		const { user, submitted } = this.state;
		return (
			<div>
				<div className="text-center">
					<h3>Register</h3>
				</div>
				<form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
					<TextField
						label="Email"
						type="email"
						className={classes.textField}
						value={user.email ? user.email : ''}
						onChange={this.handleTFChange('email')}
					/>
					{submitted && !user.email &&
						<div className="help-block">Email is required</div>
					}
					<TextField
						label="Password"
						type="password"
						className={classes.textField}
						value={user.password}
						onChange={this.handleTFChange('password')}
					/>
					{submitted && !user.password &&
						<div className="help-block">Password is required</div>
					}
					<div className="login-button-div">
						<button className="btn btn-outline-secondary waves-effect">Register</button>
						<br />
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
Register.propTypes = {
	classes: PropTypes.object.isRequired,
 };
 export default compose(
	withStyles(styles, {
	  name: 'styles',
	}),
	connect(mapStateToProps),
 )(Register);