import {
    call, put, delay,
} from 'redux-saga/effects';
import {
    fetchChangeSearch, fetchDeleteList, fetchDeleteTask, fetchList, getList, updateTitle,
    fetchUpdateTask, addNewTask, fetchUpdateCheckbox,
} from '../../src/scenes/list/duck';
import getOneList from '../../src/api/list';
import { deleteList, updateList } from '../../src/api/dashboard';
import { addTask, deleteTask, updateTask } from '../../src/api/task';

describe('List saga test fetchList', () => {
    const action = { payload: { idList: 4, idTask: 2 } };
    const generator = fetchList(action);
    const r = {
        data: {
            id: 3,
            todoListName: 'Dashboard',
            createdDate: 1551878535186,
            modifiedDate: 1551878535389,
            createdBy: 1,
            modifiedBy: 1,
            tasks: {
                id: 4,
                body: 'new taskklk',
                isComplete: false,
            },
        },
    };

    it('Call getOneList', () => {
        expect(generator.next(action).value).toEqual(call(getOneList, action.payload.idList));
    });

    it('Put FETCH_LIST_SUCCESS', () => {
        expect(generator.next(r).value)
            .toEqual(
                put({
                    type: 'list/FETCH_LIST_SUCCESS',
                    payload: {
                        ...r.data,
                        tasks: r.data.tasks,
                    },
                }),
            );
    });

    it('Saga done', () => {
        expect(generator.next().done).toBe(true);
    });
});

describe('List saga test updateTitle', () => {
    const action = {
        payload: {idDashboard: 10, newTitle: 'New list'},
        list: {
            data: {
                todoListName: 'NewList',
            },
        },
    };
    const generator = updateTitle(action);
    it('Delay', () => {
        expect(generator.next().value).toEqual(delay(1000));
    });

    it('Call getOneList', () => {
        expect(generator.next(action).value).toEqual(call(getOneList, action.payload.idDashboard));
    });
    it('Call updateList', () => {
        expect(generator.next(action).value).toEqual(call(updateList, action.payload.idDashboard,
            {...action.list.data, todoListName: action.payload.newTitle}));
    });
    it('Saga done', () => {
        expect(generator.next().done).toBe(true);
    });
});

describe('List saga test fetchUpdateTask', () => {
    const action = {
        payload: {
            idDashboard: 10,
            idTask: 10,
            newTaskName: 'Task 1',
            elected: false,
        },
    };
    const r = {
        data: {
            body: 'Task1',
            isComplete: false,
        },
    };
    const generator = fetchUpdateTask(action);

    it('Delay', () => {
        expect(generator.next().value).toEqual(delay(1000));
    });

    it('Call updateTask', () => {
        expect(generator.next(action).value).toEqual(call(updateTask, action.payload.idTask, {
            body: action.payload.newTaskName,
            isComplete: action.payload.selected,
        }));
    });

    it('Call getOneList', () => {
        expect(generator.next(action).value).toEqual(call(getOneList, action.payload.idDashboard));
    });

    it('Put FETCH_LIST_SUCCESS', () => {
        expect(generator.next(r).value)
            .toEqual(
                put({
                    type: 'list/FETCH_LIST_SUCCESS',
                    payload: r.data,
                }),
            );
    });

    it('Saga done', () => {
        expect(generator.next().done).toBe(true);
    });
});

describe('List saga test fetchChangeSearch', () => {
    const action = { payload: { idDashboard: 3 } };
    const list = {
        data: {
            id: 3,
            todoListName: 'Dashboard',
            createdDate: 1551878535186,
            modifiedDate: 1551878535389,
            createdBy: 1,
            modifiedBy: 1,
            tasks: {
                id: 4,
                body: 'new taskklk',
                isComplete: false,
            },
        },
    };
    const generator = fetchChangeSearch(action);

    it('Call getOneList', () => {
        expect(generator.next(action).value).toEqual(call(getOneList, action.payload.idDashboard));
    });
    it('Put FETCH_LIST_SUCCESS', () => {
        expect(generator.next(list).value)
            .toEqual(
                put({
                    type: 'list/FETCH_LIST_SUCCESS',
                    payload: list.data,
                }),
            );
    });
    it('Saga done', () => {
        expect(generator.next().done).toBe(true);
    });
});

describe('List saga test addNewTask', () => {
    const action = {payload: {idDashboard: 4, nameTask: 'New task', isComplete: false}};
    const r = {
        data: {
            id: 3,
            todoListName: 'Dashboard',
            createdDate: 1551878535186,
            modifiedDate: 1551878535389,
            createdBy: 1,
            modifiedBy: 1,
            tasks: {
                id: 4,
                body: 'new taskklk',
                isComplete: false,
            },
        },
    };
    const generator = addNewTask(action);

    it('Call addTask', () => {
        expect(generator.next(action).value).toEqual(call(addTask, action.payload.idDashboard, {
            body: action.payload.nameTask,
            isComplete: false,
        }));
    });

    it('Call getOneList', () => {
        expect(generator.next(action).value).toEqual(call(getOneList, action.payload.idDashboard));
    });
    it('Put FETCH_LIST_SUCCESS', () => {
        expect(generator.next(r).value)
            .toEqual(
                put({
                    type: 'list/FETCH_LIST_SUCCESS',
                    payload: r.data,
                }),
            );
    });
    it('Saga done', () => {
        expect(generator.next().done).toBe(true);
    });
});

describe('List saga test fetchDeleteList', () => {
    const action = {payload: {idDashboard: 4, idTask: 2}};
    const generator = fetchDeleteList(action);

    it('Call deleteList', () => {
        expect(generator.next(action).value).toEqual(call(deleteList, action.payload.idDashboard));
    });
    it('Saga done', () => {
        expect(generator.next().done).toBe(true);
    });
});

describe('List saga test fetchDeleteTask', () => {
    const action = {payload: {idDashboard: 4}};
    const generator = fetchDeleteTask(action);

    const r = {
        data: {
            id: 3,
            todoListName: 'Dashboard',
            createdDate: 1551878535186,
            modifiedDate: 1551878535389,
            createdBy: 1,
            modifiedBy: 1,
            tasks: {
                id: 4,
                body: 'new taskklk',
                isComplete: false,
            },
        },
    };

    it('Call getOneList', () => {
        expect(generator.next(action).value).toEqual(call(getOneList, action.payload.idDashboard));
    });
    it('Call deleteTask', () => {
        expect(generator.next(action).value).toEqual(call(deleteTask, action.payload.idTask));
    });
    it('Call getOneList', () => {
        expect(generator.next(action).value).toEqual(call(getOneList, action.payload.idDashboard));
    });
    it('Put FETCH_LIST_SUCCESS', () => {
        expect(generator.next(r).value)
            .toEqual(
                put({
                    type: 'list/FETCH_LIST_SUCCESS',
                    payload: r.data,
                }),
            );
    });
    it('Saga done', () => {
        expect(generator.next().done).toBe(true);
    });
});
describe('List saga test fetchUpdateCheckbox', () => {
    const action = {payload: {idDashboard: 4, nameTask: 'New task', isComplete: false}};
    const generator = fetchUpdateCheckbox(action);

    const r = {
        data: {
            id: 3,
            todoListName: 'Dashboard',
            createdDate: 1551878535186,
            modifiedDate: 1551878535389,
            createdBy: 1,
            modifiedBy: 1,
            tasks: {
                id: 4,
                body: 'new taskklk',
                isComplete: false,
            },
        },
    };
    it('Call updateTask', () => {
        expect(generator.next(action).value).toEqual(call(updateTask, action.payload.idTask, {
            body: action.payload.nameTask,
            isComplete: !action.payload.selected,
        }));
    });
    it('Call getOneList', () => {
        expect(generator.next(action).value).toEqual(call(getOneList, action.payload.idDashboard));
    });
    it('Put FETCH_LIST_SUCCESS', () => {
        expect(generator.next(r).value)
            .toEqual(
                put({
                    type: 'list/FETCH_LIST_SUCCESS',
                    payload: r.data,
                }),
            );
    });
    it('Saga done', () => {
        expect(generator.next().done).toBe(true);
    });
});
