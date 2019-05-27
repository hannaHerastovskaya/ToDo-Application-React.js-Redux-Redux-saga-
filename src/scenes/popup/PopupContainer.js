import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import { createSelector } from 'reselect/lib/index';
import { actions } from './duck';
import { actions as actionsBoard } from '../dashboard/duck';
import Popup from './Popup';


const getCurrentUserName = state => state.popup.data.currentUserName;

const getUsersRaw = state => state.popup.data.users;

const getUsers = createSelector(
    getUsersRaw,
    getCurrentUserName,
    (users, currentUserName) => (users.length === 0
        ? users.concat(['User is not found!']) : users.filter(i => i !== currentUserName)),
);

const mapStateToProps = state => (
    {
        users: getUsers(state),
        search: state.popup.search,
        currentUserName: state.popup.data.currentUserName,
        errorMessage: state.dashboard.errorMessage,
    }
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        searchUser: actions.searchUser,
    }, dispatch),
    actionsBoard: bindActionCreators({
        shareList: actionsBoard.shareList,
        fetchErrors: actionsBoard.fetchErrors,
    }, dispatch),

});

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
)(Popup);
