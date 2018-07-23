import React, { Component } from 'react';
import { Button,  Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input} from 'reactstrap';
import 'whatwg-fetch';
import { setInStorage, getFromStorage } from '../utils/storage';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            isLoading: true,
            token: '',
            signInError: '',
            signInEmail: '',
            signInPassword: '',
        };

        this.toggle = this.toggle.bind(this);
        this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
        this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    onTextboxChangeSignInEmail(event) {
        this.setState({
            signInEmail: event.target.value,
        });
    }
    onTextboxChangeSignInPassword(event) {
        this.setState({
            signInPassword: event.target.value,
        });
    }

    onSignIn() {
        const { signInEmail, signInPassword, } = this.state;
        this.setState({
            isLoading: true,
        });

        fetch('/api/account/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword,
            }),
        }).then(res => res.json())
            .then(json => {
                console.log('json', json);
                if (json.success) {
                    setInStorage('my_app', { token: json.token });
                    this.setState({
                        signInError: json.message,
                        isLoading: false,
                        signInPassword: '',
                        signInEmail: '',
                        token: json.token,
                    });
                } else {
                    console.log(json.message);
                    this.setState({
                        signInError: json.message,
                        isLoading: false,
                    });
                }
            });
    }

    render() {
        return (
            <div>
                <a href='#' onClick={this.toggle}>Login</a>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={this.state.signInEmail}
                                    onChange={this.onTextboxChangeSignInEmail}>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.signInPassword}
                                    onChange={this.onTextboxChangeSignInPassword}>
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Login</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Login;

