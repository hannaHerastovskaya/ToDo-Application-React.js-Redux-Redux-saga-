import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import 'jspdf-autotable';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Keyboard from '@material-ui/icons/KeyboardTab';
import Comment from '@material-ui/icons/Comment';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Cancel from '@material-ui/icons/Cancel';
import Done from '@material-ui/icons/CheckCircle';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Search from '@material-ui/icons/Search';
import Empty from '@material-ui/icons/ArrowUpward';
import Arrow from '@material-ui/icons/ArrowBackIos';
import TaskForList from './tasksForList/TaskForList';
import { AlertDialog } from '../../components/dialog/AlertDialog';
import * as styled from './OneList.styles';
import * as styledHeaderToolbar
    from '../dashboard/headerToolbar/HeaderToolbar.styled';
import low from '../../image/low.svg';
import medium from '../../image/medium.svg';
import high from '../../image/high.svg';

const CustomTableCell = withStyles(() => ({
    head: {
        backgroundColor: 'gray',
        color: 'white',
        fontSize: 16,
        width: 5,
        height: 10,
    },
}))(TableCell);

const styles = () => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        height: 'auto',
    },
    table: {
        minWidth: 700,
    },
    header: {
        color: 'red',
    },
    width: {
        maxWidth: '4px',
    },
    max: {
        maxWidth: '2px',
    },
});

class OneList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueNewTask: '',
            stateComment: false,
            newComment: props.comment,
            priority: 'NOT_SPECIFIED',
            visible: false,
            visibleButton: false,
            visibleInfoList: true,
            alignment: ['notDone', 'done'],
        };
    }

    componentWillMount = ({ match, actions, actionsBoard } = this.props) => {
        actionsBoard.fetchDashboard();
        actions.fetchList({ idList: match.params.id });
    };

    componentWillUnmount = () => {
        this.props.actions.clean();
    };

    changeValueNewTask = e => this.setState({ valueNewTask: e.target.value });

    handleFormat = (event, alignment) => this.setState({ alignment });

    handlerOnBlur = (e) => {
        e.target.blur();
        this.setState({
            valueNewTask: '',
            priority: 'NOT_SPECIFIED',
        });
    };

    toggleComment = () => {
        const { visibleButton } = this.state;
        this.setState({
            visibleButton: !visibleButton,
        });
    };

    handleUpdateComment = (e) => {
        this.setState({ newComment: e.target.value });
    };

    handleUpdate = () => {
        const { actions, data } = this.props;
        const { newComment } = this.state;
        actions.updateComment({ id: data.id, newComment });
        this.toggleComment();
    };

    handleChangePriority = (e) => {
        this.setState({ priority: e.target.value });
    };

    showAlertDialog = () => {
        const { visible } = this.state;
        this.setState({
            visible: !visible,
        });
    };

    showBlockListDetails = () => {
        const { visibleInfoList } = this.state;
        this.setState({
            visibleInfoList: !visibleInfoList,
        });
    };

    showButton = () => {
        this.setState({
            visibleButton: true,
        });
    };

    render() {
        const {
            valueNewTask, stateComment, priority, visible, visibleInfoList, alignment, visibleButton,
        } = this.state;
        const {
            match, actions, data, actionsBoard, done, notDone, tasks, classes, tagTaskKeys, tags,
        } = this.props;
        return (
            <styled.List>
                <styled.inputBlock>
                    <Link to="/lists">
                        <Arrow style={{ color: 'black', padding: '2px 0px 0px 4px' }} />
                    </Link>
                    <styled.titleNameOneList
                        type="text"
                        placeholder="Enter dashboard title"
                        defaultValue={data.todoListName}
                        onChange={e => actions.updateTitleList({ idDashboard: data.id, newTitle: e.target.value })}
                    />
                    {
                        visibleInfoList ? (
                            <Tooltip title="Hide detail information">
                                <styled.Info
                                    onClick={this.showBlockListDetails}
                                    alt="Info"
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip title="Show detail information">
                            <styled.InfoOutlined
                                onClick={this.showBlockListDetails}
                                alt="Info"
                            />
                        </Tooltip>)
                    }
                        <Tooltip title="Delete list">
                            <DeleteOutline
                                style={{ height: '50px', width: '35px', color: 'black' }}
                                onClick={this.showAlertDialog}
                                alt="Delete this list"
                            />
                        </Tooltip>
                        <AlertDialog
                            visible={visible}
                            onClose={this.showAlertDialog}
                            value="Do you want to delete this list?"
                            onConfirm={() => actions.deleteList({ idDashboard: match.params.id })}
                        />
                </styled.inputBlock>
                <styled.BlockInfoContent>
                    <styled.blockTask>

                        {
                            tasks.length === 0
                                ? (
                                    <styled.nullTask>
                                        You have no tasks yet, it's time to be active!
                                    </styled.nullTask>
                                ) : (
                                    <div>
                                        <Paper className={classes.root}>
                                            <Table className={classes.table}>
                                                <TableHead>
                                                    <TableRow className={classes.header}>
                                                        <CustomTableCell align="left" />
                                                        <CustomTableCell align="left">Name</CustomTableCell>
                                                        <CustomTableCell align="left">Priority</CustomTableCell>
                                                        <CustomTableCell align="left">Created date</CustomTableCell>
                                                        <CustomTableCell align="left">Completed date</CustomTableCell>
                                                        <CustomTableCell align="left">Duration time</CustomTableCell>
                                                        <CustomTableCell align="center">Tags</CustomTableCell>
                                                        <CustomTableCell align="center" />
                                                    </TableRow>
                                                </TableHead>
                                                {
                                                    tasks.map(i => (
                                                        <TableBody key={i.id}>
                                                            <TaskForList
                                                                idTask={i.id}
                                                                idList={match.params.id}
                                                                selected={i.isComplete}
                                                                nameTask={i.body}
                                                                actionsBoard={actionsBoard}
                                                                actionsList={actions}
                                                                priority={i.priority}
                                                                createdDate={i.createdDate}
                                                                completedDate={i.completedDate}
                                                                durationTime={i.durationTime}
                                                                tags={i.tags}
                                                                tagTaskKeys={tagTaskKeys}
                                                            />
                                                        </TableBody>
                                                    ))
                                                }
                                            </Table>
                                        </Paper>
                                    </div>
                                )
                        }
                        <styled.addTaskContainer
                            visible={!stateComment}
                        >
                            <styled.addNewTask
                                className="addNewTask"
                                placeholder="add to-do"
                                style={{ outline: 'none', fontSize: '20px', marginLeft: '15px' }}
                                value={valueNewTask}
                                onChange={this.changeValueNewTask}
                                onKeyPress={event => event.key === 'Enter' && (
                                    event.target.blur(),
                                    actions.addTaskList({
                                        idDashboard: match.params.id,
                                        nameTask: valueNewTask,
                                        priority,
                                    }),
                                    this.setState({ valueNewTask: '', priority: 'NOT_SPECIFIED' })
                                )}
                                // onBlur={e => e.target.blur()}
                            />
                            <FormControl
                                style={{ marginTop: '-4px', marginLeft: 'auto' }}
                            >
                                <InputLabel htmlFor="age-simple">Priority</InputLabel>
                                <Select
                                    value={priority}
                                    onChange={this.handleChangePriority}
                                    inputProps={{
                                        name: 'age',
                                        id: 'age-simple',
                                    }}
                                    style={{ width: '190px' }}
                                >
                                    <MenuItem value="NOT_SPECIFIED">
                                        <div>
                                            <Empty
                                                style={{
                                                    width: '15px', height: '15px', paddingLeft: '4px', marginLeft: '4px',
                                                }}
                                            />
                                            <span style={{ marginLeft: '8px' }}>NOT SPECIFIED</span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem value="LOW">
                                        <styled.PriorityImage
                                            src={low}
                                            alt="LOW"
                                        />
                                        LOW
                                    </MenuItem>
                                    <MenuItem value="MEDIUM">
                                        <styled.PriorityImage
                                            src={medium}
                                            alt="MEDIUM"
                                        />
                                        MEDIUM
                                    </MenuItem>
                                    <MenuItem value="HIGH">
                                        <styled.PriorityImage
                                            src={high}
                                            alt="HIGH"
                                        />
                                        HIGH
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </styled.addTaskContainer>
                    </styled.blockTask>
                    <styled.DetailsList
                        visibleInfo={visibleInfoList}
                    >
                        <Tooltip title="Created time">
                            <styled.ListCreateData>
                                {new Date(data.createdDate).toLocaleString()}
                            </styled.ListCreateData>
                        </Tooltip>
                        <styled.DetailTitle>
                            List details
                        </styled.DetailTitle>
                        <styled.Create>
                            Created by: {data.createdBy}
                        </styled.Create>
                        <styled.Create>
                            Modified by: {data.modifiedBy}
                        </styled.Create>
                        <styled.Create>
                            Modified time: {new Date(data.modifiedDate).toLocaleString()}
                        </styled.Create>
                        <styled.BlockComment>
                            <styled.Expand
                                visible={true}
                            >
                                <React.Fragment>
                                    { (data.comment !== undefined && data.comment !== null) ? (
                                        <TextField
                                            onChange={this.handleUpdateComment}
                                            onFocus={this.showButton}
                                            defaultValue={data.comment}
                                            multiline
                                            rowsMax="8"
                                            variant="outlined"
                                            margin="normal"
                                            placeholder="Type comment about this list"
                                            style={{width: '90%', fontWeight: '400', marginTop: '8px', }}
                                            InputProps={{
                                                style: {
                                                    height: '20vh', alignItems: 'flex-start',
                                                },
                                            }}
                                        />
                                    ) : null
                                    }
                                </React.Fragment>
                                <div
                                    style={{
                                        display: !visibleButton ? 'none' : 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}>
                                    <IconButton
                                        style={{ padding: '4px' }}
                                        onClick={this.toggleComment}
                                    >
                                        <Cancel style={{ color: 'red' }} />
                                    </IconButton>
                                    <IconButton
                                        style={{ padding: '4px' }}
                                        onClick={() => this.handleUpdate()}
                                    >
                                        <Done style={{ color: 'green' }} />
                                    </IconButton>
                                </div>
                                <div
                                    style={{
                                        display: visibleButton ? 'none' : 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end'
                                    }}>
                                    <Tooltip title="Hide detail information">
                                        <IconButton
                                            style={{ padding: '4px' }}
                                            onClick={this.showBlockListDetails}
                                        >
                                            <Keyboard />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </styled.Expand>
                        </styled.BlockComment>

                    </styled.DetailsList>
                </styled.BlockInfoContent>
            </styled.List>
        );
    }
}


OneList.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number,
    todoListName: PropTypes.string,
    tasks: PropTypes.array,
};

OneList.defaultProps = {
    data: {},
};

export default withStyles(styles)(OneList);
