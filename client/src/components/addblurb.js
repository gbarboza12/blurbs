import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Alert, } from 'reactstrap';
import { Container, Row, Input,} from 'mdbreact';
import Textarea from 'react-expanding-textarea';

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
						<form>
							<div className="select">
								<select type="select" name="category" className="select-text" required value={this.state.category} onChange={this.handleInputChange}>
									<option value="" disabled selected></option>
									<option value={'Film'}>Movies</option>
									<option value={'Television'}>TV</option>
									<option value={'Book'}>Books</option>
									<option value={'Music'}>Music</option>
									<option value={'Other'}>Other</option>
								</select>
								<span className="select-highlight"></span>
								<span className="select-bar"></span>
								<label className="select-label">Select category</label>
							</div>

							<Input 
								label="Title" 
								group
								type="text" 
								name="name" 
								value={this.state.name}
								onChange={this.handleInputChange} 
								/>
								<Textarea
									rows="1"
									maxLength="3000"
									className="ta"
									name="content"
									id="dynamic-label-input"
									placeholder="Blurb"
									value={this.state.content}
									onChange={this.handleInputChange}
								>	
								</Textarea>

							<div className="button-div">
							<button className="btn btn-outline-secondary waves-effect" onClick={this.handleSubmit}>Submit</button>
							</div>
						</form>
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
