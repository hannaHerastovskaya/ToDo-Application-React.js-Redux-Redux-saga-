import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as profileActions } from './profile/duck';
import Settings from './Settings';

const mapStateToProps = state => ({
    currentUser: state.profile.currentUser,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        fetchCurrentUser: profileActions.fetchCurrentUser,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
