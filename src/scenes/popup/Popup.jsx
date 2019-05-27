import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { SearchContent } from '../dashboard/headerToolbar/HeaderToolbar.styled';
import Search from '../../components/search/Search';
import * as styled from '../../components/dialog/AlertDialog.styles';
import * as styles from './Popup.styles';

export class Popup extends Component {

    handleChange = (newValue) => {
        const { actions } = this.props;
        actions.searchUser(newValue);
    };

    render() {
        const {
            statePopup, closePopup, actions, actionsBoard, users, search, idList, errorMessage,
        } = this.props;
        console.log(errorMessage);
        return (
            <Dialog
                open={statePopup}
                onClose={closePopup}
            >
                <styled.Content>
                    <DialogTitle
                        id="form-dialog-title"
                        style={{display: 'flex', flex: 'auto', padding: '8px 0px 8px 24px',}}
                    >
                        Share list
                    </DialogTitle>
                    <styled.Close
                        onClick={() => {
                            closePopup();
                            actions.searchUser('');
                        }}
                    />
                </styled.Content>
                <SearchContent style={{ margin: '0px 16px 24px 24px' }}>
                    <Search
                        onChange={this.handleChange}
                        value={search}
                        style={{
                            width: '95%',
                        }}
                        placeholder="Enter username ..."
                        visible
                    />
                </SearchContent>
                <DialogActions style={{ margin: '56px 8px 8px 8px' }}>
                    <Button
                        href=""
                        onClick={() => {
                            closePopup();
                            actions.searchUser('');
                        }}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        href=""
                        onClick={() => {
                            const conformity = users.map(i => search !== i);
                            if (users[0] === 'User is not found!' || search === '' || conformity[0] === true) {
                                alert('Data is not correct!');
                            }
                            else {
                                actionsBoard.shareList({ idList, userName: search });
                            }
                        }}
                        color="primary"
                    >
                        Enter
                    </Button>
                    {
                        users.length === 1 && users[0] === search ? (<styles.users search="" />) : (
                            <styles.users search={search}>
                                {
                                    users.map(i => (
                                        i === 'User is not found!'
                                            ? (
                                                <List key={i}>
                                                    <ListItemText primary={i} />
                                                </List>
                                            )
                                            : (
                                                <div onClick={() => actions.searchUser(i)} key={i}>
                                                    <List>
                                                        <ListItemText primary={i} />
                                                    </List>
                                                </div>
                                            )))
                                }
                            </styles.users>
                        )
                    }
                </DialogActions>
            </Dialog>
        );
    }
}

Popup.propTypes = {
    users: PropTypes.arrayOf(PropTypes.string),
    idList: PropTypes.number,
    search: PropTypes.string,
    statePopup: PropTypes.bool,
    closePopup: PropTypes.func,
    actions: PropTypes.objectOf(PropTypes.func),
    actionsBoard: PropTypes.objectOf(PropTypes.func),
};

Popup.defaultProps = {
    users: [],
    idList: undefined,
    search: '',
    statePopup: false,
    closePopup: undefined,
    actions: {},
    actionsBoard: {},
};

export default Popup;
