import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Subscribes from './Subscribes';
import { actions } from './duck';

const mapStateToProps = state => ({
    subscribers: state.subscribe.subscribers,
    search: state.subscribe.search,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        searchSubscribers: actions.searchSubscribers,
        fetchSubscribers: actions.fetchSubscribers,
    }, dispatch),
});

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
)(Subscribes);
