import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import SnackbarContent from '@material-ui/core/SnackbarContent/index';
import IconButton from '@material-ui/core/IconButton/index';
import CloseIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Snackbar from '@material-ui/core/Snackbar/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from './scenes/container/settings/profile/duck';

const socket = new SockJS('http://localhost:8080/ws');
class WebSocketContainer extends Component {
    constructor(props) {
        super(props);
        const { user } = props;
        this.state = {
            message: '',
            open: false,
        };
        let stompClient = null;
        const headers = {
            Accept: '*/*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': true,
        };

        console.log(user);
        stompClient = Stomp.over(socket);

        stompClient.connect(headers, () => {
            const { open } = this.state;
            stompClient.subscribe(`/${user}`, (notification) => {
                this.setState({ message: notification.body, open: !open });
            });
        });
    }


    // componentWillUnmount() {Stomp.over(socket).disconnect(()=>{},{});}

    handleClose = () => this.setState({ open: false });

    render() {
        const { message, open } = this.state;
        const { children } = this.props;
        return (
            <div>
                { children }
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    style={{ margin: ' 0 -12px -16px 0', zIndex: 100 }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    autoHideDuration={600000}
                >
                    <SnackbarContent
                        style={{}}
                        aria-describedby="client-snackbar"
                        message={(<span id="id">{message}</span>)}
                        action={(
                            <IconButton
                                key="close"
                                href=""
                                aria-label="Close"

                                onClick={this.handleClose}
                            >
                                <CloseIcon color="white" style={{ color: 'white' }} />
                            </IconButton>
                        )}
                    />
                </Snackbar>
            </div>
        );
    }
}


WebSocketContainer.propTypes = {
    // children: PropTypes.object.isRequired,
    user: PropTypes.string,
};

WebSocketContainer.defaultProps = {
    user: '',
};

const mapStateToProps = state => ({
    user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        fetchCurrentUser: actions.fetchCurrentUser,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WebSocketContainer);
