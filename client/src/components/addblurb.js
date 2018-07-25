import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Alert, Container, Button, Form, FormGroup, Input, Row } from 'reactstrap';

import { authHeader } from '../helpers/authheader';
// import * as FontAwesome from 'react-fontawesome';

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
		const target = e.target;
		const value = target.type === 'select' ? target.selected : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}
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
		return (
			<Container>
				<Row >
					<div className="content">
						{this.getAlert()}
						<Form>
							<FormGroup>
								<Input type="select" name="category" value={this.state.category} onChange={this.handleInputChange}>
									<option value="" disabled={true} hidden={true}>Select Category</option>
									<option value={'Film'}>Movies</option>
									<option value={'Television'}>TV</option>
									<option value={'Book'}>Books</option>
									<option value={'Music'}>Music</option>
									<option value={'Other'}>Other</option>
								</Input>
							</FormGroup>
							<FormGroup>
								<Input type="text" name="name" placeholder="Title" value={this.state.name} onChange={this.handleInputChange} />
							</FormGroup>
							<FormGroup>
								<Input type="textarea" name="content" placeholder="Blurb" value={this.state.content} onChange={this.handleInputChange} />
							</FormGroup>
							<div className="button-div">
								<Button onClick={this.handleSubmit}>Submit</Button>
							</div>
						</Form>
					</div>
				</Row>
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

export default connect(mapStateToProps)(AddNew);
