import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Comment from '@material-ui/icons/Comment';
import Delete from '@material-ui/icons/Delete';
import Restore from '@material-ui/icons/RestoreFromTrash';
import Done from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';
import Empty from '@material-ui/icons/ArrowUpward';
import Share from '@material-ui/icons/Share';
import Info from '@material-ui/icons/Info';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import InputGlobal from '../../components/input/InputGlobal';
import * as styled from './Dashboard.styled';
import * as styledDialog from '../../components/dialog/AlertDialog.styles';
import { AlertDialog } from '../../components/dialog/AlertDialog';
import Task from './task/Task';
import pushpin from '../../image/pushpin.svg';
import low from '../../image/low.svg';
import medium from '../../image/medium.svg';
import high from '../../image/high.svg';
import PopupContainer from '../popup/PopupContainer';

export const getTaskList = (tasks, props) => (
    !tasks.length
        ? (
            <styled.NullLenghtTask>
                You have no tasks yet, it's time to be active!
            </styled.NullLenghtTask>
        )
        : tasks.map(i => (
            <Task
                idTask={i.id}
                idList={props.idList}
                selected={i.isComplete}
                nameTask={i.body}
                actions={props.actions}
                key={i.id}
                allTags={props.allTags}
                todoListStatus={props.todoListStatus}
                createdDate={i.createdDate}
                completedDate={i.completedDate}
                durationTime={i.durationTime}
                tagTaskKeys={props.tagTaskKeys}
                priority={i.priority}
                shared={props.shared}
            />
        )));

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueNewTask: '',
            statePopup: false,
            stateComment: false,
            newTitle: props.title,
            newComment: props.comment,
            priority: 'NOT_SPECIFIED',
            visibleAllDashboardTags: true,
            visibleDelete: false,
            visibleRestore: false,
            tags: props.allTags,
            tagTaskKeys: props.tagTaskKeys,
            priorityVisible: false,
            doneVisible: false,
            commentVisible: true,
            addVisible: true,
        };
    }

    changeValueNewTask = e => this.setState({
        valueNewTask: e.target.value,
        newTaskEdited: e.target.value !== '',
    });

    handlerOnBlur = (e) => {
        e.target.blur();
    };

    toggleComment = () => {
        const { stateComment, addVisible } = this.state;
        this.setState({
            stateComment: !stateComment,
            addVisible: !addVisible,
        });
    };

    showPopup = () => {
        this.setState({
            statePopup: true,
        });
    };

    closePopup = () => {
        this.setState({
            statePopup: false,
        });
    };

    showAlertDeleteDialog = () => {
        const { visibleDelete } = this.state;
        this.setState({
            visibleDelete: !visibleDelete,
        });
    };

    showAlertRestoreDialog = () => {
        const { visibleRestore } = this.state;
        this.setState({
            visibleRestore: !visibleRestore,
        });
    };

    handleUpdateTitle = (newValue) => {
        const { actions, idList } = this.props;
        const { newTitle } = this.state;
        this.setState({ newTitle: newValue });
        actions.updateTitleDashboard({
            id: idList, newTitle,
        });
    };

    handleUpdateComment = (newValue) => {
        this.setState({ newComment: newValue });
    };

    handleUpdateTitleSuccess = () => {
        const { actions, idList } = this.props;
        const { newTitle } = this.state;
        actions.updateTitleSuccess({ id: idList, newTitle });
    };

    handleUpdateCommentSuccess = () => {
        const { actions, idList, title } = this.props;
        const { newComment } = this.state;
        this.setState({ stateComment: !this.state.stateComment, addVisible: !this.state.addVisible });
        actions.updateComment({ id: idList, title, newComment });
    };

    handleChangePriority = (e) => {
        this.setState({ priority: e.target.value });
    };

    handleFocusAddTaskInput = () => {
        console.log('focus!!!');
        this.setState(state => ({
            newTaskInputFocused: true,
            priorityVisible: !state.priorityVisible,
            commentVisible: !state.commentVisible,
            doneVisible: !state.doneVisible,
        }));
    };

    handleBlurAddTaskInput = () => {
        this.setState({
            newTaskInputFocused: false,
        });
    }

    handleBlurAddTask = () => {
        console.log('blur!!!');
        this.setState(state => ({
            priorityVisible: !state.priorityVisible,
            commentVisible: !state.commentVisible,
            doneVisible: !state.doneVisible,
        }));
    };

    render() {
        const {
            idList,
            title,
            todoListStatus,
            tasks,
            actions,
            actionsBasket,
            shared,
            createdBy,
            createdDate,
            modifiedBy,
            modifiedDate,
            comment,
            currentUser: { gravatarUrl },
        } = this.props;
        const {
            valueNewTask, statePopup, stateComment, priority, visibleDelete, visibleRestore, tags,
            tagTaskKeys, priorityVisible, doneVisible, commentVisible, newTaskEdited, newTaskInputFocused, addVisible,
        } = this.state;

        return ([
            <PopupContainer
                statePopup={statePopup}
                closePopup={this.closePopup}
                idList={idList}
                key="popup"
            />,
            <styled.Dashboard
                key={idList}
                id={idList}
            >
                <styled.DashboardHeader>
                    {
                        gravatarUrl && !shared ? (
                            <styled.Avatar
                                src={`${gravatarUrl}?s=120&d=retro`}
                            />
                        ) : null
                    }
                    <InputGlobal
                        onChange={this.handleUpdateTitle}
                        value={title}
                        onBlur={this.handleUpdateTitleSuccess}
                        style={todoListStatus === 'ACTIVE' && !shared ? {
                            textDecoration: 'none', width: '80%', fontWeight: 'bold', margin: '0 8px', fontSize: '20px',
                        } : {
                            textDecoration: 'none',
                            pointerEvents: 'none',
                            width: '90%',
                            fontWeight: 'bold',
                            marginLeft: '8px',
                            fontSize: '20px',
                        }}
                        placeholder="Add title"
                    />
                    {
                        !shared
                            ? (todoListStatus === 'ACTIVE'
                                ? (
                                    <styled.IconContainer>
                                        <Link
                                            to={{
                                                pathname: `/lists/${idList}`,
                                                state: { tags, tagTaskKeys },
                                            }}
                                        >
                                            <styled.IconInfo style={{zIndex: 4}}>
                                                <p>
                                                    <b>Information about list "{title}":</b><br />
                                                    Created by: {createdBy}<br />
                                                    Created time: {new Date(createdDate).toLocaleString()}<br />
                                                    Modyfied by: {modifiedBy}<br />
                                                    Modyfied time: {new Date(modifiedDate).toLocaleString()}<br />
                                                    Comment: {comment || 'not written yet'}
                                                </p>
                                                <IconButton
                                                    href=""
                                                    aria-label="info"
                                                    style={{ borderRadius: '40%', padding: '4px 4px 8px' }}
                                                    alt="Information about this list"
                                                >
                                                    <Info />
                                                </IconButton>
                                            </styled.IconInfo>
                                        </Link>
                                        <Tooltip title="Share list">
                                            <IconButton
                                                href=""
                                                aria-label="share"
                                                style={{ borderRadius: '40%', padding: '4px 4px 8px' }}
                                                onClick={this.showPopup}
                                                alt="Share list"
                                            >
                                                <Share />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete list">
                                            <IconButton
                                                href=""
                                                aria-label="trash"
                                                onClick={this.showAlertDeleteDialog}
                                                style={{ borderRadius: '40%', padding: '4px 4px 8px' }}
                                                alt="Delete this list"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                        <styledDialog.Dialog>
                                            <AlertDialog
                                                visible={visibleDelete}
                                                onClose={this.showAlertDeleteDialog}
                                                value="Do you want to delete this list?"
                                                onConfirm={() => actions.deleteDashboard({ id: idList })}
                                            />
                                        </styledDialog.Dialog>
                                    </styled.IconContainer>
                                )
                                : (
                                    <styled.IconContainer>
                                        <Tooltip title="Restore list">
                                            <IconButton
                                                href=""
                                                aria-label="restore"
                                                onClick={this.showAlertRestoreDialog}
                                                alt="Restore this list"
                                                style={{ borderRadius: '40%', padding: '4px' }}
                                            >
                                                <Restore
                                                    style={{ borderRadius: '40%' }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                        <AlertDialog
                                            visible={visibleRestore}
                                            onClose={this.showAlertRestoreDialog}
                                            value="Do you want to restore this list?"
                                            onConfirm={() => actionsBasket.restoreList({ id: idList })}
                                        />
                                        <Tooltip title="Delete list forever">
                                            <IconButton
                                                href=""
                                                aria-label="trash"
                                                onClick={this.showAlertDeleteDialog}
                                                style={{ borderRadius: '40%', padding: '4px' }}
                                                alt="Delete this list"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                        <styledDialog.Dialog>
                                            <AlertDialog
                                                visible={visibleDelete}
                                                onClose={this.showAlertDeleteDialog}
                                                value="Do you want to delete this list forever?"
                                                onConfirm={() => actionsBasket.deletedList({ id: idList })}
                                            />
                                        </styledDialog.Dialog>
                                    </styled.IconContainer>
                                )
                            )
                            : (
                                <styled.IconContainer>
                                    <styled.Icon src={pushpin} alt="List is shared" />
                                </styled.IconContainer>
                            )
                    }
                </styled.DashboardHeader>
                <styled.TaskList>
                    {getTaskList(tasks, this.props)}
                </styled.TaskList>
                {
                    todoListStatus === 'ACTIVE' && (
                        shared ? ''
                            : (
                                <styled.addTaskContainer
                                    visible={addVisible}
                                >
                                    <styled.InputAddingTask
                                        style={{ alignSelf: 'center' }}
                                        placeholder="Add to-do"
                                        value={valueNewTask}
                                        onChange={this.changeValueNewTask}
                                        // onFocus={this.handleFocusAddTaskInput}
                                        // onBlur={this.handleBlurAddTaskInput}
                                        onKeyPress={e => valueNewTask
                                        && (e.key === 'Enter'
                                            && (e.target.blur(), actions.addTask({
                                                idDashboard: idList, nameTask: valueNewTask, priority,
                                            }), this.setState({ valueNewTask: '', priority: 'NOT_SPECIFIED', newTaskEdited: false })
                                            
                                            ))
                                        }
                                        
                                    />
                                    <styled.FormControl
                                        // visible={newTaskEdited || newTaskInputFocused}
                                        style={{ marginTop: -10, marginRight: 80 }}
                                    >
                                        <InputLabel htmlFor="age-simple">Priority</InputLabel>
                                        <Select
                                            value={priority}
                                            onChange={this.handleChangePriority}
                                            inputProps={{
                                                name: 'age',
                                                id: 'age-simple',
                                            }}
                                            style={{ maxWidth: '190px', width: '120px' }}
                                        >
                                            <MenuItem
                                                value="NOT_SPECIFIED"
                                                component=""
                                            >
                                                <Empty
                                                    style={{
                                                        width: '15px',
                                                        height: '15px',
                                                        paddingLeft: '4px',
                                                        marginLeft: '4px',
                                                    }}
                                                />
                                                <span style={{ marginLeft: '8px' }}>NOT SPECIFIED</span>
                                            </MenuItem>
                                            <MenuItem
                                                value="LOW"
                                                component=""
                                            >
                                                <styled.PriorityImage
                                                    src={low}
                                                    alt="LOW"
                                                />
                                                LOW
                                            </MenuItem>
                                            <MenuItem
                                                value="MEDIUM"

                                                component=""
                                            >
                                                <styled.PriorityImage
                                                    src={medium}
                                                    alt="MEDIUM"
                                                    style={{ color: 'gray' }}
                                                />
                                                MEDIUM
                                            </MenuItem>
                                            <MenuItem
                                                value="HIGH"

                                                component=""
                                            >
                                                <styled.PriorityImage
                                                    src={high}
                                                    alt="HIGH"
                                                />
                                                HIGH
                                            </MenuItem>
                                        </Select>
                                    </styled.FormControl>

                                    
                                    <styled.CommentContainer visible={!newTaskEdited && commentVisible}>
                                        <Tooltip title="Comment" placement="top">
                                            <IconButton
                                                href=""
                                                aria-label="Comment"
                                                onClick={this.toggleComment}
                                            >
                                                <Comment />
                                            </IconButton>
                                        </Tooltip>
                                    </styled.CommentContainer>
                                   
                                    <styled.DoneContainer visible={newTaskEdited}>
                                        <IconButton
                                            onClick={() => {
                                                actions.addTask({
                                                    idDashboard: idList, nameTask: valueNewTask, priority,
                                                });
                                                this.setState({ valueNewTask: '', priority: 'NOT_SPECIFIED', newTaskEdited: false });
                                            }}
                                        >
                                            <styled.Done />
                                        </IconButton>
                                    </styled.DoneContainer>
                                </styled.addTaskContainer>
                            )
                    )
                }
                <styled.Expand
                    visible={stateComment}
                >
                    <TextField
                        onChange={e => this.handleUpdateComment(e.target.value)}
                        defaultValue={comment}
                        multiline
                        autoFocus
                        rowsMax="3"
                        variant="outlined"
                        margin="normal"
                        placeholder="Type comment about this list"
                        style={{
                            width: '100%', fontWeight: 'bold',
                        }}
                        InputProps={{
                            style: {
                                height: '150px',
                                marginTop: '-10px',
                            },
                        }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <IconButton
                            href=""
                            style={{ padding: '12px' }}
                            onClick={this.toggleComment}
                        >
                            <Cancel style={{ color: 'red' }} />
                        </IconButton>
                        <IconButton
                            href=""
                            style={{ padding: '12px' }}
                            onClick={() => this.handleUpdateCommentSuccess()}
                        >
                            <Done style={{ color: 'green' }} />
                        </IconButton>
                    </div>
                </styled.Expand>
            </styled.Dashboard>,
        ]);
    }
}

Dashboard.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object),
    idList: PropTypes.number,
    title: PropTypes.string,
    actions: PropTypes.objectOf(PropTypes.func),
    todoListStatus: PropTypes.string,
    tagTaskKeys: PropTypes.arrayOf(PropTypes.object),
    comment: PropTypes.string,
    actionsBasket: PropTypes.objectOf(PropTypes.func),
    shared: PropTypes.bool,
    currentUser: PropTypes.object,
};

Dashboard.defaultProps = {
    tasks: [],
    idList: undefined,
    title: 'To-do list',
    actions: {},
    todoListStatus: 'ACTIVE',
    tagTaskKeys: [],
    comment: '',
    actionsBasket: {},
    shared: false,
    currentUser: {},
};
