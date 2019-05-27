import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import DashboardListBasket from './DashboardListBasket';
import { actions } from './duck';

const mapStateToProps = state => ({
    toDoBoard: state.basket.deletedListsRaw,
    pageSize: state.basket.pageSize,
    currentPage: state.basket.currentPage,
    totalPages: state.basket.totalPages,
    currentUser: state.profile.currentUser,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        fetchDeletedDashboard: actions.fetchDeletedDashboard,
        changeSize: actions.changeSize,
        changePagination: actions.changePagination,
        deletedList: actions.deletedList,
        restoreList: actions.restoreList,
        deleteAllLists: actions.deleteAllLists,
    }, dispatch),
});

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
)(DashboardListBasket);
