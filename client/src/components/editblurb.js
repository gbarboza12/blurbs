import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Alert, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Textarea from 'react-expanding-textarea';

import { authHeader } from '../helpers/authheader';

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
			}
			else this.setState({
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
		const target = e.target;
		const value = target.type === 'select' ? target.selected : target.value;
		const name = target.name;
		this.setState({
			members: {
				...this.state.members,
				[name]: value
			}
		});
	}
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
		return (
			<Container>
				<Row>
					<div className="content">
						{this.getAlert()}
						<Form>
							<FormGroup>
								<Label>Category</Label>
								<Input type="select" name="category" value={this.state.members.category} onChange={this.handleInputChange}>
									<option value="" disabled={true} hidden={true}>Select Category</option>
									<option value={'Film'}>Movies</option>
									<option value={'Television'}>TV</option>
									<option value={'Book'}>Books</option>
									<option value={'Music'}>Music</option>
									<option value={'Other'}>Other</option>
								</Input>
							</FormGroup>
							<FormGroup>
								<Label>Title</Label>
								<Input type="text" name="name" placeholder="Title" value={this.state.members.name} onChange={this.handleInputChange} />
							</FormGroup>
							<FormGroup>
								<Label>Blurb</Label>
								<Textarea
									rows="1"
									maxLength="3000"
									className="ta"
									name="content"
									placeholder="Blurb"
									value={this.state.members.content}
									onChange={this.handleInputChange} />
							</FormGroup>
							<div className='button-div'>
								<button className="btn1" disabled={this.state.disabled} onClick={this.handleUpdate}>Update Post</button>{'  '}
								<button className="btn2" disabled={this.state.disabled} onClick={this.handleDelete}>Delete Post</button>
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

export default connect(mapStateToProps)(EditBlurb);
