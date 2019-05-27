/* eslint-disable react/prop-types,jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { Dashboard } from './Dashboard';
import * as styled from './DashboardList.styles';
import VisibleSidebar from './sidebar/SidebarContainer';
import { Alert } from '../../components/dialog/Alert';
import { DropDownMaterial } from '../../components/dropDown/DropDownMaterial';
import WebSocketContainer from '../../WebSocketContainer';

class DashboardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    componentWillMount = ({ actions } = this.props) => actions.initialize();

    showAlert = () => {
        const { visible } = this.state;
        this.setState({
            visible: !visible,
        });
    };

    handlePageChange = ({ selected }) => {
        const { actions } = this.props;
        actions.changePagination(selected);
    };

    render() {
        const {
            actions,
            toDoBoard,
            pageSize,
            totalPages,
            currentUser,
            tags,
            tagTaskKeys,
            actionsBasket,
            errorMessage,
        } = this.props;

        return ([
            <styled.App key="app">
                {
                    errorMessage === '' ? (
                        <styled.DashboardList>
                            {
                                toDoBoard.length === 0
                                    ? (
                                        <styled.NullLenghtDashboards>
                                            You don't have to-do yet. Plan your tasks with DI To-do! Press to +
                                        </styled.NullLenghtDashboards>
                                    )
                                    : toDoBoard.map(i => (
                                        <Dashboard
                                            userOwnerId={i.userOwnerId}
                                            idList={i.id}
                                            key={i.id}
                                            title={i.todoListName}
                                            tasks={i.tasks}
                                            toDoBoard={toDoBoard}
                                            actions={actions}
                                            actionsBasket={actionsBasket}
                                            shared={i.shared}
                                            createdBy={i.createdBy}
                                            modifiedBy={i.modifiedBy}
                                            createdDate={i.createdDate}
                                            modifiedDate={i.modifiedDate}
                                            currentUser={currentUser}
                                            allTags={tags}
                                            todoListStatus={i.todoListStatus}
                                            comment={i.comment}
                                            tagTaskKeys={tagTaskKeys}
                                        />
                                    ))
                            }
                        </styled.DashboardList>
                    ) : (
                        <Alert
                            visible={errorMessage === '' ? visible : this.showAlert}
                            onClose={this.showAlert}
                            value={errorMessage}
                            onConfirm={() => {
                                actions.fetchErrors('');
                            }}
                            button=""
                        />
                    )
                }
            </styled.App>,
            <styled.Footer key="footer">
                <div style={{ display: 'flex' }}>
                    <styled.Pagination>
                        <ReactPaginate
                            pageCount={totalPages}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            previousLabel="&laquo;"
                            nextLabel="&raquo;"
                            containerClassName="pagination-container"
                            onPageChange={this.handlePageChange}
                        />
                    </styled.Pagination>
                    <DropDownMaterial
                        style={{ width: '150px', height: '41px', marginTop: '8px' }}
                        styleLabel={{ fontSize: '10px' }}
                        value={[
                            '6/page',
                            '9/page',
                            '12/page',
                        ]}
                        selectSorting={actions.changeSize}
                        defaultValue={pageSize}
                    />
                </div>
                <VisibleSidebar />
            </styled.Footer>,
        ]
        );
    }
}

DashboardList.propTypes = {
    toDoBoard: PropTypes.arrayOf(PropTypes.shape),
};

DashboardList.defaultProps = {
    toDoBoard: [],
};

export default DashboardList;
