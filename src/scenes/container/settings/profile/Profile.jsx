import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as styled from './Profile.styles';
import Button from '../../../../components/button/Button';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newName: props.currentUser.name || '',
            newUsername: props.currentUser.username || '',
            newEmail: props.currentUser.email || '',
            newPassword: '',
            newRepeatPassword: '',
            selectedAvatar: null,
            visibleContainer: true,
        };
    }

    changeValueNewName = e => this.setState({ newName: e.target.value });

    changeValueNewUsername = e => this.setState({ newUsername: e.target.value });

    changeValueNewEmail = e => this.setState({ newEmail: e.target.value });

    changeValueNewPassword = e => this.setState({ newPassword: e.target.value });

    changeValueNewRepeatPassword = e => this.setState({ newRepeatPassword: e.target.value });

    avatarSelectHandler = e => this.setState({ selectedAvatar: e.target.files[0] });

    componentWillMount = () => {
        const { actions: { fetchCurrentUser } } = this.props;
        fetchCurrentUser();
    };

    handleClickDelete = () => {
        const { actions, toggleSettings } = this.props;
        toggleSettings();
        actions.deleteProfile();
    };

    handleClickEdit = () => {
        const { visibleContainer } = this.state;
        this.setState({
            visibleContainer: !visibleContainer,
        });
    };

    handleClickSave = () => {
        const { actions } = this.props;
        const {
            newName, newUsername, newEmail, newPassword, newRepeatPassword, visibleContainer,
        } = this.state;
        if (newPassword === newRepeatPassword
            && newPassword.length >= 6) {
            actions.editProfile({
                email: newEmail,
                name: newName,
                password: newPassword,
                username: newUsername,
            });
        }
        this.setState({
            visibleContainer: !visibleContainer,
        });
    };

    render() {
        const { currentUser: { name, email, gravatarUrl }, statistics } = this.props;
        const {
            newPassword, newRepeatPassword, newName, newUsername, newEmail, visibleContainer,
        } = this.state;
        return (
            <styled.Profile>
                <styled.GreetingUser>
                    <styled.Avatar src={`${gravatarUrl}?s=120&d=retro`} />
                    <styled.CurrentUser>
                        <p> Hello, {name || 'name'} !</p>
                        <p>{email || 'email'}</p>
                    </styled.CurrentUser>
                    <styled.EditButton>
                        <Button
                            onClick={this.handleClickEdit}
                            value="Edit profile"
                            style={{ height: 'auto', padding: '4px 8px' }}
                        />
                    </styled.EditButton>
                </styled.GreetingUser>
                {
                    visibleContainer === false ? (
                        <styled.Info>
                            <styled.EditProfile>
                                <p> Name </p>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newName}
                                    onChange={this.changeValueNewName}
                                />
                            </styled.EditProfile>
                            <styled.EditProfile>
                                <p> Username </p>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={newUsername}
                                    onChange={this.changeValueNewUsername}
                                />
                            </styled.EditProfile>
                            <styled.EditProfile>
                                <p> Email </p>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={newEmail}
                                    onChange={this.changeValueNewEmail}
                                />
                            </styled.EditProfile>
                            <styled.EditProfile>
                                <p> Password </p>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={this.changeValueNewPassword}
                                />
                            </styled.EditProfile>
                            <styled.EditProfile>
                                <p> Repeat password </p>
                                <input
                                    type="password"
                                    placeholder="Repeat new password"
                                    value={newRepeatPassword}
                                    onChange={this.changeValueNewRepeatPassword}
                                />
                            </styled.EditProfile>
                            <styled.ContainerButtons>
                                <styled.DeleteProfile>
                                    <Link to="/auth">
                                        <Button
                                            onClick={this.handleClickDelete}
                                            value="Delete profile"
                                            style={{ height: 'auto', padding: '4px 8px' }}
                                        />
                                    </Link>
                                </styled.DeleteProfile>
                                <Button
                                    onClick={this.handleClickSave}
                                    value="Save"
                                    style={{
                                        width: 'auto',
                                        minWidth: '80px',
                                        alignSelf: 'flex-end',
                                        padding: '4px 8px',
                                        margin: '8px',
                                    }}
                                >
                                    Save
                                </Button>
                            </styled.ContainerButtons>
                        </styled.Info>
                    ) : (
                        <styled.Statistics>
                            <p style={{ fontSize: '24px' }}>Profile statistics</p>
                            <p> { `Number of lists: ${statistics.todoListsNumber}` } </p>
                            <p> { `Number of tasks: ${statistics.tasksNumber}`} </p>
                            <p> { `Number of completed tasks:  ${statistics.completedTasksNumber}` } </p>
                            <p> { `Number of subscribers: ${statistics.followersNumber}`} </p>
                            <p> { `Number of followers: ${statistics.followedUsersNumber}`} </p>
                        </styled.Statistics>
                    )
                }

            </styled.Profile>
        );
    }
}
export default Profile;

Profile.propTypes = {
    statistics: PropTypes.objectOf(PropTypes.number),
    currentUser: PropTypes.objectOf(PropTypes.string),
    actions: PropTypes.objectOf(PropTypes.func),
    toggleSettings: PropTypes.func,
};

Profile.defaultProps = {
    currentUser: {},
    actions: {},
    statistics: {},
    toggleSettings: undefined,
};
