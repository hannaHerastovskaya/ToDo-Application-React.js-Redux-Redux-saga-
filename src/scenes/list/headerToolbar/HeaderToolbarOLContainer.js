import { withRouter } from 'react-router-dom';
import { createSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { actions as actionsBoard } from '../../dashboard/duck';
import { actions } from '../duck';
import HeaderToolbarOL from './HeaderToolbarOL';

const getDoneFilter = state => state.list.selectedDone;
const getNotDoneFilter = state => state.list.selectedNotDone;
const getSearch = state => state.list.search;
const getTasksRaw = state => state.list.data.tasks;
const getTaskTagKeys = state => state.dashboard.tagTaskKeys;

const getFilteredTasks = createSelector(
    getTasksRaw,
    getSearch,
    (tasks, search) => (search === '' ? tasks : tasks.filter(i => i.body.indexOf(search.search) >= 0)),
);

const getTasks = createSelector(
    getFilteredTasks,
    getDoneFilter,
    getNotDoneFilter,
    // eslint-disable-next-line no-bitwise
    (tasks, done, notDone) => (!(done ^ notDone) ? tasks : tasks.filter(task => task.isComplete === done)),
);

const getTasksWithTags = createSelector(
    getTasks,
    getTaskTagKeys,
    (tasks, tagsConnections) => tasks.map(t => ({ ...t, tags: tagsConnections.filter(c => c.taskId === t.id).map(c => c.tag) })),
);

const mapStateToProps = state => (
    {
        data: state.list.data,
        tasks: getTasksWithTags(state),
        done: state.list.selectedDone,
        notDone: state.list.selectedNotDone,
        todo: state.dashboard.toDoBoardRow,
        search: state.list.search,
        tags: state.list.tags,
        tagTaskKeys: state.list.tagTaskKeys,
    }
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        fetchList: actions.fetchList,
        updateTitleList: actions.updateTitleList,
        updateTaskList: actions.updateTaskList,
        changeSearch: actions.changeSearch,
        addTaskList: actions.addTaskList,
        deleteList: actions.deleteList,
        deleteTaskList: actions.deleteTaskList,
        updateCheckboxList: actions.updateCheckboxList,
        selectDoneAction: actions.selectDoneAction,
        selectedNotDoneAction: actions.selectedNotDoneAction,
        updateComment: actions.updateCommentSuccess,
        clean: actions.clean,
    }, dispatch),
    actionsBoard: bindActionCreators({
        onBlurs: actionsBoard.updateTitleSuccess,
        fetchDashboard: actionsBoard.fetchDashboard,
    }, dispatch),
});

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
)(HeaderToolbarOL);
