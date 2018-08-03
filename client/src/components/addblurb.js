import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Alert, } from 'reactstrap';
import { Container, } from 'mdbreact';
import compose from 'recompose/compose';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import { authHeader } from '../helpers/authheader';
// import * as FontAwesome from 'react-fontawesome';

const styles = theme => ({

	formControl: {
	  margin: theme.spacing.unit,
	  minWidth: 120,
	  width: 200,
	},
	selectEmpty: {
	  marginTop: theme.spacing.unit * 2,
	},
 });

class AddNew extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: '',
			name: '',
			content: '',
			error: null,
			alertText: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.getAlert = this.getAlert.bind(this);
	}


	handleSubmit(e) {
		e.preventDefault();
		const date = new Date().toISOString();
		const category = this.state.category;
		const name = this.state.name;
		const content = this.state.content;
		const { user } = this.props;

		if (!category || !name || !content || !date || !user) {
			this.setState({
				alertText: 'Error', 
				error: 'Please fill in all of the fields.'
			})
			return;
		}

		fetch('/api/blurbs', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': authHeader()
			}),
			body: JSON.stringify({ category, name, content, date, user }),
		}).then(res => res.json()).then((res) => {
			if (!res.success) {
				this.setState({ error: res.error.message || res.error, alertText: 'Error' });
				console.log(this.state.error)
			}
			else this.setState({ category: '', name: '', content: '', error: null, alertText: 'Success' });
		});
	}
	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
			alertText: ''
		});
	}
	handleChange = name => event => {
		this.setState({
		  [name]: event.target.value,
		});
	 };
	getAlert() {
		if(this.state.alertText === 'Success') {
			return (
				<Alert color="success">
        			Blurb was successfully added! <Link to='/'>Click here</Link> to see it.
      		</Alert>
			)
		} else if(this.state.alertText === 'Error') {
			return (
				<Alert color="danger">
        			Error: {this.state.error}
      		</Alert>
			)
		} else {
			return '';
		}
	}

	render() {
		const { classes } = this.props;
		return (
			<Container>
				<div className="headings"><h3>Add Entry</h3></div>
				{this.getAlert()}

					<div className="entry-content">
					<form className={classes.root} autoComplete="off" onSubmit={this.handleSubmit}>
						<FormControl required className={classes.formControl}>
							<InputLabel>Category</InputLabel>
							<Select
								value={this.state.category}
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
								value={this.state.name}
								onChange={this.handleChange('name')}
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
							value={this.state.content}
							onChange={this.handleChange('content')}
						/>
						</div>
						<div className=" button-div">
							<button className="btn btn-outline-secondary waves-effect">Submit</button>
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
AddNew.propTypes = {
	classes: PropTypes.object.isRequired,
 };
 
export default compose(
	withStyles(styles, {
	  name: 'styles',
	}),
	connect(mapStateToProps),
 )(AddNew);