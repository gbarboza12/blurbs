import React from 'react';
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

		this.handleTFChange = this.handleTFChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleTFChange = name => event => {
		this.setState({
		  [name]: event.target.value,
		});
	 };
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
		const { loggingIn, classes } = this.props;
		const { email, password, submitted } = this.state;
		return (
			<div>
				<div className="text-center">
					<h3>Login</h3>
				</div>

				<form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
					<TextField
						label="Email"
						type="email"
						className={classes.textField}
						value={email}
						onChange={this.handleTFChange('email')}
					/>
					{submitted && !email &&
						<div>Email is required</div>
					}
					<TextField
						label="Password"
						type="password"
						className={classes.textField}
						value={password}
						onChange={this.handleTFChange('password')}
					/>
					{submitted && !password &&
						<div>Password is required</div>
					}
					<div className="login-button-div">
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

Login.propTypes = {
	classes: PropTypes.object.isRequired,
 };

 export default compose(
	withStyles(styles, {
	  name: 'styles',
	}),
	connect(mapStateToProps),
 )(Login);