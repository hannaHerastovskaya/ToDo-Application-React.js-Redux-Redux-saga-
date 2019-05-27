import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderToolbar from './HeaderToolbar';
import { actions } from '../duck';

const mapStateToProps = state => ({
    sort: state.dashboard.sort,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        updateViewLists: actions.updateViewLists,
        search: actions.search,
        changeSort: actions.changeSort,
        fetchDashboard: actions.fetchDashboard,
    }, dispatch),
});

export default
connect(
    mapStateToProps,
    mapDispatchToProps,
)(HeaderToolbar);
