/* eslint-disable react/no-unused-state,no-unused-expressions,no-sequences */
import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Empty from '@material-ui/icons/ArrowUpward';
import InputGlobal from '../../../components/input/InputGlobal';
import plus from '../../../image/plus.svg';
import low from '../../../image/low.svg';
import medium from '../../../image/medium.svg';
import high from '../../../image/high.svg';
import * as styled from './Sidebar.styles';
import { Close } from '../../../components/dialog/AlertDialog.styles';


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoListName: '',
            displayStyle: 'none',
            tasks: [],
            animation: '',
            bool: false,
            displayTrash: 'none',
        };
    }

    updateDisplayTrashVisible = () => this.setState({ displayTrash: 'flex' });

    updateDisplayTrashHide = () => this.setState({ displayTrash: 'none' });

    updateDisplaySidebar = ({ bool } = this.state) => {
        bool ? this.setState({ displayStyle: 'none', animation: '' })
            : this.setState({ displayStyle: 'flex', animation: 'move 1s' });
        this.setState({ bool: !bool });
    };

    addBoard = (title, tasks, { addNewDashboard } = this.props) => {
        const titleValue = !title ? 'To do list' : title;
        addNewDashboard({
            todoListName: titleValue,
            tasks,
            comment: '',
        });
        this.setState({
            todoListName: '',
            tasks: [{ body: '', priority: 'NOT_SPECIFIED', isComplete: false }],
        });
    };

    changeValueTitle = e => this.setState({ todoListName: e.target.value });

    changeValueName = i => (e) => {
        const newTaskHolders = this.state.tasks.map((task, sidx) => {
            if (i !== sidx) return task;
            return { ...task, body: e.target.value };
        });
        this.setState({ tasks: newTaskHolders });
    };

    handlerOnClick = (e) => {
        e.target.blur();
        this.setState({ tasks: [] });
    };

    handleAddInputTask = () => {
        this.setState({
            tasks: this.state.tasks.concat([{ body: '', priority: 'NOT_SPECIFIED', isComplete: false }]),
        });
    };

    handleRemoveInputTask = (i, { tasks } = this.state) => () => this.setState({
        tasks: tasks.filter((s, sidx) => i !== sidx),
    });

    changeValuePriority = i => (e) => {
        const newTaskHolders = this.state.tasks.map((task, sidx) => {
            if (i !== sidx) return task;
            return { ...task, priority: e.target.value };
        });
        this.setState({ tasks: newTaskHolders });
    };

    render() {
        const {
            displayTrash, displayStyle, animation, todoListName, tasks,
        } = this.state;
        const displaysTrash = { display: displayTrash };
        return (
            [
                <div
                    className="fon"
                    style={{ backgroundColor: 'whitesmoke', opacity: 0.98, zIndex: 10 }}
                    key="rootDivSidebar"
                />,
                <Tooltip title="Add list" placement="left" key="Add list">
                    <styled.Plus
                        key="plus"
                        className="plus"
                        onClick={this.updateDisplaySidebar}
                    >
                        <styled.ButtonPlus src={plus} alt="Plus" />
                    </styled.Plus>
                </Tooltip>,
                <styled.Sidebar key="sidebar" style={{ display: displayStyle, zIndex: 5 }}>
                    <styled.Background
                        onClick={(e) => { this.updateDisplaySidebar(); this.handlerOnClick(e); }}
                    />
                    <styled.Aside style={{ animation }}>
                        <Close
                            style={{padding: '8px 4px', marginTop: '8px'}}
                            onClick={(e) => { this.updateDisplaySidebar(); this.handlerOnClick(e); }}
                        />
                        <styled.InputTitle
                            type="text"
                            placeholder="Add title"
                            value={todoListName}
                            onChange={this.changeValueTitle}
                        />
                        <styled.TaskList>
                            {tasks.map((task, i) => (
                                <styled.AddTaskPlace
                                    onMouseOut={this.updateDisplayTrashHide}
                                    onMouseOver={this.updateDisplayTrashVisible}
                                    key={task}
                                >
                                    <styled.InputTask
                                        type="text"
                                        placeholder={`Add ${i + 1} to-do`}
                                        value={task.body}
                                        onChange={this.changeValueName(i)}
                                        required="required"
                                    />
                                    <Tooltip title="Select priority" placement="left-end">
                                        <FormControl
                                            style={{
                                                marginTop: '-20px',
                                                marginRight: '90px',
                                                minWidth: '30px',
                                                padding: '8px',
                                            }}
                                        >
                                            <InputLabel htmlFor="age-simple">Priority</InputLabel>
                                            <Select
                                                value={task.priority}
                                                onChange={this.changeValuePriority(i)}
                                                inputProps={{
                                                    name: 'age',
                                                    id: 'age-simple',
                                                }}
                                                style={{ width: '170px' }}
                                            >
                                                <MenuItem value="NOT_SPECIFIED">
                                                    {/* <img
                                                    src={empty}
                                                    width="15px"
                                                    alt="EMPTY"
                                                    style={{ marginLeft: '8px' }}
                                                /> */}
                                                    <Empty style={{
                                                        width: '15px', height: '15px', paddingLeft: '4px', marginLeft: '4px',
                                                    }}
                                                    />
                                                    <span style={{ marginLeft: '8px' }}>NOT SPECIFIED</span>
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
                                                        style={{ color: 'gray' }}
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
                                    </Tooltip>
                                    <Tooltip title="Delete task">
                                        <IconButton
                                            aria-label="trash"
                                            onClick={this.handleRemoveInputTask(i)}
                                            style={{ borderRadius: '40%', padding: '4px' }}
                                            alt="Delete this task"

                                        >
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </styled.AddTaskPlace>
                            ))}
                            </styled.TaskList>
                        <styled.AddTask type="button" onClick={this.handleAddInputTask}>
                            Add task
                        </styled.AddTask>
                        <styled.AddButton
                            type="submit"
                            onClick={(e) => {
                                this.updateDisplaySidebar();
                                this.addBoard(todoListName, tasks);
                                this.handlerOnClick(e);
                            }}
                        >Add
                        </styled.AddButton>
                    </styled.Aside>
                </styled.Sidebar>,
            ]
        );
    }
}
export default Sidebar;
