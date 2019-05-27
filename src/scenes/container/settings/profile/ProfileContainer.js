import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Profile from './Profile';
import { actions } from './duck';

const mapStateToProps = state => ({
    currentUser: state.profile.currentUser,
    statistics: state.profile.statistics,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        fetchCurrentUser: actions.fetchCurrentUser,
        editProfile: actions.editProfile,
        deleteProfile: actions.deleteProfile,
    }, dispatch),
});

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
)(Profile);
