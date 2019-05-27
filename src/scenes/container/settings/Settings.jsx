/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Theme from './theme/ThemeContainer';
import Subscribes from './subscribes/SubscribesContainer';
import FollowUser from './followUser/FollowUserContainer';
import * as styled from './Settings.styles';
import { actions as profileActions } from './profile/duck';


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'theme',
        };
    }

    componentWillMount = () => {
        const { actions: { fetchCurrentUser } } = this.props;
        fetchCurrentUser();
    };

    handleSelectTab = (value) => {
        this.setState({
            selectedTab: value,
        });
    };

    render() {
        const { visible, closeSettings } = this.props;
        const { selectedTab } = this.state;
        return (
            <styled.Background style={{ display: visible ? 'flex' : 'none' }}>
                <styled.Window>
                    <styled.CloseWindow onClick={() => closeSettings()}>
                                &times;
                    </styled.CloseWindow>
                    <styled.Main>
                        <styled.TabContainer>
                            <styled.Tab selected={selectedTab === 'theme'}>
                                <input
                                    type="radio"
                                    style={{ visibility: 'hidden' }}
                                    onClick={() => this.handleSelectTab('theme')}
                                />
                                    Theme
                            </styled.Tab>
                            <styled.Tab selected={selectedTab === 'subscribes'}>
                                <input
                                    type="radio"
                                    style={{ visibility: 'hidden' }}
                                    onClick={() => this.handleSelectTab('subscribes')}
                                />
                                    Subscribers
                            </styled.Tab>
                            <styled.Tab selected={selectedTab === 'followers'}>
                                <input
                                    type="radio"
                                    style={{ visibility: 'hidden' }}
                                    onClick={() => this.handleSelectTab('followers')}
                                />
                                    Follow
                            </styled.Tab>
                        </styled.TabContainer>
                        <styled.Content>
                            {selectedTab === 'theme' && <Theme />}
                            {selectedTab === 'subscribes' && <Subscribes />}
                            {selectedTab === 'followers' && <FollowUser />}
                        </styled.Content>
                    </styled.Main>
                </styled.Window>
            </styled.Background>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.profile.currentUser,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        fetchCurrentUser: profileActions.fetchCurrentUser,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
