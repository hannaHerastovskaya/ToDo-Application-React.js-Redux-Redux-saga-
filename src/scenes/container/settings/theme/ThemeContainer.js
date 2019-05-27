import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Theme from './Theme';
import { actions } from './duck';

const mapStateToProps = state => ({
    type: state.theme.type,
    data: state.theme.data,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        changeTheme: actions.changeTheme,
    }, dispatch),
});

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
)(Theme);
