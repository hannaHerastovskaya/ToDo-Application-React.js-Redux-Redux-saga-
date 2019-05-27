import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import Registration from './Registration';
import { actions } from './duck';

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        registration: actions.registration,
    }, dispatch),
});

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
)(Registration);
