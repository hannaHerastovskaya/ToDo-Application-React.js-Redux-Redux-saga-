/* eslint-disable react/prop-types,react/no-unused-state */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as styled from '../Account.styled';
import Button from '../../../components/button/Button';

const validatedFields = ['email', 'username', 'password', 'name', 'repeatPassword'];

const validateEmail = email => ((email.length === 0
    || !email.match('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+\.[a-z]{2,6}$'))
    && 'fill in the field by example: example@mail.com');

const validateUsername = username => ((username.length === 0 || username.length) < 6
    && 'line length must be more than 6 characters');

const validatePassword = password => ((password.length === 0 || password.length) < 6
    && 'line length must be more than 6 characters');

const validateRepeatPassword = (repeatPassword, password) => (
    (repeatPassword.length === 0 || repeatPassword !== password)
    && 'invalid password');

const validateName = name => ((name.length === 0 || name.length < 2) && 'line length must be more than 2 characters');


const registryValidator = {
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    name: validateName,
    repeatPassword: validateRepeatPassword,
};

const validation = (object, keys, validator) => {
    let errors = {};
    keys.forEach((key) => {
        errors = { ...errors, [key]: validator[key](object[key]) };
    });
    return errors;
};

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            repeatPassword: '',
            username: '',
            errors: {},
        };
    }

    onChangeEmail = (e) => {
        this.setState({ email: e.target.value }, () => {
            this.setState({ errors: validation(this.state, validatedFields, registryValidator) });
        });
    };

    onChangeName = (e) => {
        this.setState({ name: e.target.value }, () => {
            this.setState({ errors: validation(this.state, validatedFields, registryValidator) });
        });
    };

    onChangePassword1 = (e) => {
        this.setState({ password: e.target.value }, () => {
            this.setState({ errors: validation(this.state, validatedFields, registryValidator) });
        });
    };

    onChangeUserName = (e) => {
        this.setState({ username: e.target.value }, () => {
            this.setState({ errors: validation(this.state, validatedFields, registryValidator) });
        });
    };


    onChangePassword2 = (e) => {
        this.setState({ repeatPassword: e.target.value }, () => {
            this.setState({ errors: validation(this.state, validatedFields, registryValidator) });
        });
    };

    render() {
        const { actions } = this.props;
        const {
            email, name, password, username, errors,
        } = this.state;

        return (
            <styled.Content>
                <styled.NavigationForm>
                    <styled.Form action="" method="post">
                        <styled.Title>Registration</styled.Title>
                        <styled.EnterInformation>
                            <styled.Input
                                style={{ borderBottom: `1px solid ${errors.email ? 'red' : 'lightgray'}` }}
                                type="email"
                                name="loginEx"
                                placeholder="Enter your email"
                                onBlur={this.onChangeEmail}
                                required
                            />
                        </styled.EnterInformation>
                        <styled.Error>{errors.email}</styled.Error>
                        <styled.EnterInformation>
                            <styled.Input
                                style={{ borderBottom: `1px solid ${errors.name ? 'red' : 'lightgray'}` }}
                                type="text"
                                name="loginEx"
                                placeholder="Enter your name"
                                onBlur={this.onChangeName}
                                required
                            />
                        </styled.EnterInformation>
                        <styled.Error>{errors.name}</styled.Error>
                        <styled.EnterInformation>
                            <styled.Input
                                style={{ borderBottom: `1px solid ${errors.username ? 'red' : 'lightgray'}` }}
                                type="text"
                                name="loginEx"
                                placeholder="Enter your username"
                                onBlur={this.onChangeUserName}
                                required
                            />
                        </styled.EnterInformation>
                        <styled.Error>{errors.username}</styled.Error>
                        <styled.EnterInformation>
                            <styled.Input
                                style={{ borderBottom: `1px solid ${errors.password ? 'red' : 'lightgray'}` }}
                                type="password"
                                name="passEx"
                                placeholder="Enter your password"
                                onBlur={this.onChangePassword1}
                                required
                            />
                        </styled.EnterInformation>
                        <styled.Error>{errors.password}</styled.Error>
                        {/*<styled.EnterInformation>*/}
                        {/*    <styled.Input*/}
                        {/*        style={{ borderBottom: `2px solid ${errors.repeatPassword ? 'red' : 'lightgray'}` }}*/}
                        {/*        type="password"*/}
                        {/*        name="passEx"*/}
                        {/*        placeholder="Repeat password"*/}
                        {/*        onBlur={this.onChangePassword2}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*</styled.EnterInformation>*/}
                        {/*<styled.Error>{errors.repeatPassword}</styled.Error>*/}
                        <styled.SuccessButton
                            onClick={() => {
                                if (!errors.email
                                    && !errors.name
                                    && !errors.username
                                    && !errors.password
                                ) {
                                    actions.registration({
                                        email, name, password, username,
                                    });
                                }
                            }
                            }
                        >GO
                        </styled.SuccessButton>
                    </styled.Form>
                    <styled.HrefButton>
                        <Link to="/auth">
                            <Button
                                value="Return to the login page"
                                style={{
                                    color: 'black',
                                    width: '100%',
                                    padding: '8px',
                                    fontWeight: 'normal',
                                    height: 'auto',
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

export default Registration;
