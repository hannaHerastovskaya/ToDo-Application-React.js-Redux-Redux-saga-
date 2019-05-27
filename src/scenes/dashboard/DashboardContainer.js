import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import DashboardList from './DashboardList';
import { actions } from './duck';

const mapStateToProps = state => ({
    toDoBoard: state.dashboard.toDoBoard,
    viewList: state.dashboard.view,
    pageSize: state.dashboard.pageSize,
    sort: state.dashboard.sort,
    currentPage: state.dashboard.currentPage,
    totalPages: state.dashboard.totalPages,
    currentUser: state.profile.currentUser,
    tags: state.dashboard.tags,
    tagTaskKeys: state.dashboard.tagTaskKeys,
    errorMessage: state.dashboard.errorMessage,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        clean: actions.clean,
        initialize: actions.initialize,
        fetchDashboard: actions.fetchDashboard,
        updateTitleDashboard: actions.updateTitleDashboard,
        updateTitleSuccess: actions.updateTitleSuccess,
        deleteDashboard: actions.deleteDashboard,
        deleteTask: actions.deleteTask,
        addTask: actions.addTask,
        updateCheckbox: actions.updateCheckbox,
        updateTaskName: actions.updateTaskName,
        updateTaskNameSuccess: actions.updateTaskNameSuccess,
        updateViewLists: actions.updateViewLists,
        search: actions.search,
        togglePopup: actions.togglePopup,
        changeSize: actions.changeSize,
        changePagination: actions.changePagination,
        changeSort: actions.changeSort,
        addTagToTask: actions.addTagToTask,
        removeTagFromTask: actions.removeTagFromTask,
        updateComment: actions.updateComment,
        updateCommentSuccess: actions.updateCommentSuccess,
        fetchErrors: actions.fetchErrors,
    }, dispatch),
});

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
)(DashboardList);
