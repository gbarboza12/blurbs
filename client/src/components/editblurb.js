import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Form, FormGroup, Input, Label, Row } from 'reactstrap';

import { authHeader } from '../helpers/authheader';

class EditBlurb extends Component {
	constructor(props) {
		super(props);
		this.state = {
			members: props.location.state,
			error: null,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const date = new Date().toISOString();
		const category = this.state.members.category;
		const name = this.state.members.name;
		const content = this.state.members.content;
		const { user } = this.props;

		if (!category || !name || !content || !date || !user) return;

		fetch(`/api/blurbs/${user._id}/${this.state.members.id}`, {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': authHeader()
			}),
			body: JSON.stringify({ category, name, content, date, user }),
		}).then(res => res.json()).then((res) => {
			if (!res.success) {
				this.setState({ error: res.error.message || res.error });
				console.log(this.state.error)
			}
			else this.setState({
				members: {
					...this.state.members,
					category: '',
					name: '',
					content: '',
				},
				error: null
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
	handleDelete() {
		const { user } = this.props;
		fetch(`/api/blurbs/${user._id}/${this.state.members.id}`, {
			method: 'DELETE',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': authHeader()
			}),
		}).then(res => res.json()).then((res) => {
			if (!res.success) this.setState({ error: res.error });
			else this.setState({
				members: {
					...this.state.members,
					category: '',
					name: '',
					content: '',
				},
				error: null
			});
		});
	}

	render() {
		return (
			<Container>
				<Row>
					<div className="content">
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
								<Input type="textarea" name="content" placeholder="Blurb" value={this.state.members.content} onChange={this.handleInputChange} />
							</FormGroup>
							<div className='button-div button-wrapper'>
								<Button color="primary" onClick={this.handleSubmit}>Update Post</Button>{'  '}
								<Button color="danger" onClick={this.handleDelete}>Delete Post</Button>
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
