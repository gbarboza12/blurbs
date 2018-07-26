import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Button, Form, FormGroup, Label, Input, Row } from 'reactstrap';

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
      <Container >
        <Row>
          <div className="content">
            <h2>Register</h2>
            <br />
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  id="dynamic-label-input"
                  value={user.email ? user.email : ''}
                  onChange={this.handleChange}>
                </Input>
                <Label for="dynamic-label-input">Email</Label>
                {submitted && !user.email &&
                  <div className="help-block">email is required</div>
                }
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="dynamic-label-input"
                  value={user.password}
                  onChange={this.handleChange}>
                </Input>
                <Label for="dynamic-label-input">Password</Label>
                {submitted && !user.password &&
                  <div className="help-block">Password is required</div>
                }
              </FormGroup>
              <Button>Register</Button>
              {registering}
              <Link to="/login" className="btn btn-link">Cancel</Link>
            </Form>
          </div>
        </Row>
      </Container>
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