import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Button, Form, FormGroup, Label, Input} from 'reactstrap';

import { userActions } from '../actions/useractions';


class Register extends Component {
  constructor(props) {
      super(props);

      this.state = {
          user: {
              email: '',
              password: ''
          },
          submitted: false
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
      <Container className="content">
        <h2>Register</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email ? user.email : ''}
              onChange={this.handleChange}>
            </Input>
            {submitted && !user.email &&
              <div className="help-block">email is required</div>
            }
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={this.handleChange}>
            </Input>
            {submitted && !user.password &&
              <div className="help-block">Password is required</div>
            }
          </FormGroup>
          <Button>Register</Button>
          {registering &&
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          }
          <Link to="/login" className="btn btn-link">Cancel</Link>
        </Form>
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