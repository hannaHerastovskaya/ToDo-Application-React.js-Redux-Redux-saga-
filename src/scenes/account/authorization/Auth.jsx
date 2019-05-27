/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as styled from '../Account.styled';
import Button from '../../../components/button/Button';
import { Alert } from '../../../components/dialog/Alert';

const validateFields = ['login', 'password'];

const validateLogIn = login => (login.length === 0 ? 'Invalid' : undefined);

const validatePassword = password => (password === 0 ? 'Invalid' : undefined);

const authValidator = {
    login: validateLogIn,
    password: validatePassword,
};

const validation = (object, keys, validator) => {
    let errors = {};
    keys.forEach((key) => {
        errors = { ...errors, [key]: validator[key](object[key]) };
    });
    return errors;
};

class Authorization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            login: '',
            errors: {},
            visible: false,
        };
    }

    showAlert = () => {
        const { visible } = this.state;
        this.setState({
            visible: !visible,
        });
        this.props.actions.fetchErrors('');
    };

    onChangeLogin = (e) => {
        this.setState({ login: e.target.value }, () => {
            this.setState({ errors: validation(this.state, validateFields, authValidator) });
        });
    };

    onChangePassword = (e) => {
        this.setState({ password: e.target.value }, () => {
            this.setState({ errors: validation(this.state, validateFields, authValidator) });
        });
    };

    render() {
        const { actions, errorMessage } = this.props;
        const { password, login, visible } = this.state;
        return (
            <styled.Content>
                {
                    errorMessage !== '' ? (
                        <Alert
                            visible={errorMessage === '' ? visible : this.showAlert}
                            onClose={this.showAlert}
                            value={errorMessage}
                            onConfirm={() => actions.fetchErrors('')}
                            button=""
                        />
                    ) : null
                }

                <styled.NavigationForm>
                        <styled.Form action="" method="post">
                        <styled.Title>Sign in</styled.Title>
                        <styled.EnterInformation>
                            <styled.Input
                                type="text"
                                name="loginEx"
                                placeholder="Enter your email or username"
                                onBlur={this.onChangeLogin}
                                required
                            />
                        </styled.EnterInformation>
                        <styled.EnterInformation>
                            <styled.Input
                                type="password"
                                name="passEx"
                                placeholder="Enter your password"
                                onBlur={this.onChangePassword}
                                required
                            />
                        </styled.EnterInformation>
                        <styled.SuccessButton
                            onClick={() => {
                                actions.fetchErrors('');
                                actions.authorization({ password, usernameOrEmail: login });
                            }}
                        >ENTER
                        </styled.SuccessButton>
                    </styled.Form>
                        <styled.HrefButton>
                        <Link to="/reg">
                            <Button
                                value="Registration"
                                style={{
                                    color: 'black',
                                    width: '100%',
                                    padding: '8px',
                                    height: 'auto',
                                    fontWeight: 'normal',
                                    borderRadius: '8px',
                                }}
                            />
                        </Link>
                    </styled.HrefButton>
                    </styled.NavigationForm>
            </styled.Content>
        );
    }
}

export default Authorization;
