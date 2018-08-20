import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Alert, Container } from 'reactstrap';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

import { authHeader } from '../helpers/authheader';

const styles = theme => ({
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
		width: 200,
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
	},
	margin: {
		margin: theme.spacing.unit,
	},
	cssUpdate: {
		backgroundColor: '#AA00FF',
		'&:hover': {
		  backgroundColor: '#673AB7',
		},
	},
	cssDelete: {
		backgroundColor: '#E91E63',
		'&:hover': {
		  backgroundColor: '#AD1457',
		},
	},
});

class EditBlurb extends Component {
	constructor(props) {
		super(props);
		this.state = {
			members: props.location.state,
			error: null,
			alertText: '',
			disabled: false,
		};

		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.getAlert = this.getAlert.bind(this);
	}

	handleUpdate(e) {
		e.preventDefault();
		const date = new Date().toISOString();
		const category = this.state.members.category;
		const name = this.state.members.name;
		const content = this.state.members.content;
		const { user } = this.props;

		if (!category || !name || !content || !date || !user) {
			this.setState({
				alertText: 'Warning',
				error: 'Nothing to update.',
			});
			console.log(this.state.alertText)
			return;
		}

		fetch(`/api/blurbs/${user._id}/${this.state.members.id}`, {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': authHeader()
			}),
			body: JSON.stringify({ category, name, content, date, user }),
		}).then(res => res.json()).then((res) => {
			if (!res.success) {
				this.setState({
					error: res.error.message || res.error,
					alertText: 'Error',
				});
				console.log(this.state.error)
			} else this.setState({
				alertText: 'Updated',
				error: null
			});
		});
	}
	handleDelete(e) {
		e.preventDefault();
		const { user } = this.props;
		fetch(`/api/blurbs/${user._id}/${this.state.members.id}`, {
			method: 'DELETE',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': authHeader()
			}),
		}).then(res => res.json()).then((res) => {
			if (!res.success) this.setState({ error: res.error, alertText: 'Error' });
			else this.setState({
				members: {
					...this.state.members,
					category: '',
					name: '',
					content: '',
				},
				disabled: true,
				error: null,
				alertText: 'Deleted',
			});
		});
	}
	handleInputChange(e) {
		this.setState({
			members: {
				...this.state.members,
				[e.target.name]: e.target.value
			},
			alertText: '',
		});
	}
	handleTFChange = name => event => {
		this.setState({
			members: {
				...this.state.members,
				[name]: event.target.value,
			},
			alertText: ''
		});
	};
	getAlert() {
		if (this.state.alertText === 'Updated') {
			return (
				<Alert color="success">
					Blurb was successfully updated! <Link to='/'>Click here</Link> to see your changes, or you can continue editing below.
      		</Alert>
			);
		} else if (this.state.alertText === 'Error') {
			return (
				<Alert color="danger">
					Error: {this.state.error}
				</Alert>
			);
		} else if (this.state.alertText === 'Deleted') {
			return (
				<Alert color="success">
					Blurb was successfully deleted! <Link to='/'>Click here</Link> to see your updated timeline.
      	</Alert>
			)
		} else if (this.state.alertText === 'Warning') {
			return (
				<Alert color="warning">
					{this.state.error}
				</Alert>
			);
		}
		else {
			return '';
		}
	}

	render() {
		const { classes } = this.props;
		return (
			<Container>
				<div className="headings"><h3>Edit Entry</h3></div>
				{this.getAlert()}
				<div className="entry-content">
					<form className={classes.root} autoComplete="off">

						<FormControl required className={classes.formControl}>
							<InputLabel>Category</InputLabel>
							<Select
								value={this.state.members.category}
								onChange={this.handleInputChange}
								name="category"
								className={classes.selectEmpty}
							>
								<MenuItem value={'Film'}>Movies</MenuItem>
								<MenuItem value={'Television'}>TV</MenuItem>
								<MenuItem value={'Books'}>Books</MenuItem>
								<MenuItem value={'Music'}>Music</MenuItem>
								<MenuItem value={'Other'}>Other</MenuItem>
							</Select>
						</FormControl>
						<div>
							<TextField
								required
								label="Title"
								placeholder="Title"
								className="tf-title"
								value={this.state.members.name}
								onChange={this.handleTFChange('name')}
							/>
						</div>
						<div>
							<TextField
								required
								label="Blurb"
								placeholder="Blurb"
								multiline
								fullWidth
								margin="normal"
								className="ta"
								value={this.state.members.content}
								onChange={this.handleTFChange('content')}
							/>
						</div>
						<div className='button-div'>
							<Button
								variant="contained"
								type="submit"
								color="primary"
								disabled={this.state.disabled}
								className={classNames(classes.margin, classes.cssUpdate)}
								onClick={this.handleUpdate}
							>
								Update Post
							</Button>
							<Button
								variant="contained"
								type="submit"
								color="primary"
								disabled={this.state.disabled}
								className={classNames(classes.margin, classes.cssDelete)}
								onClick={this.handleDelete}
							>
								Delete Post
							</Button>
						</div>
					</form>
				</div>
			</Container>
		);
	}
}
function mapStateToProps(state) {
	const { authentication } = state;
	const { user } = authentication;
	return {
		user
	};
}
EditBlurb.propTypes = {
	classes: PropTypes.object.isRequired,
};
export default compose(
	withStyles(styles, {
		name: 'styles',
	}),
	connect(mapStateToProps),
)(EditBlurb);
