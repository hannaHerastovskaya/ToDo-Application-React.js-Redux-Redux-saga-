import {
    actions, FETCH_CHANGE_LIST_SUCCESS, reducer,
} from '../../src/scenes/list/duck';

const initialState = {
    data: {
        idDashboard: 5,
        todoListName: 'List',
        tasks: [
            {
                id: 12,
                body: 'Task',
            },
        ],
    },
    dataRaw: {},
    search: '',
    selectedDone: true,
    selectedNotDone: true,
};

describe('List test', () => {
    it('SEARCH_TASK test', () => {
        const action = actions.changeSearch('lk');
        const expected = {
            ...initialState,
            search: 'lk',
        };
        const prevState2 = {
            ...initialState,
            search: 'null',
        };
        const action2 = actions.changeSearch('mama');
        const expected2 = {
            ...initialState,
            search: 'mama',
        };
        expect(reducer(initialState, action)).toEqual(expected);
        expect(reducer(prevState2, action2)).toEqual(expected2);
    });
    it('SELECTED_DONE test', () => {
        const action = actions.selectDoneAction(false);
        const expected = {
            ...initialState,
            selectedDone: true,
        };
        expect(reducer(initialState, action)).toEqual(expected);
    });
    it('SELECTED_NOT_DONE test', () => {
        const action = actions.selectedNotDoneAction(false);
        const expected = {
            ...initialState,
            selectedNotDone: true,
        };
        expect(reducer(initialState, action)).toEqual(expected);
    });
    it('UPDATE_TASK_LIST test', () => {
        const action = actions.updateTaskList({idTask: 12, newTaskName: 'Task'});
        const expected = {
            ...initialState,
            data: {
                ...initialState.data,
                tasks: initialState.data.tasks.map(e => (e.id === 12
                    ? {
                        ...e, body: 'Task',
                    } : e)),
            },
        };
        const prevState2 = {
            ...initialState,
            data: {
                ...initialState.data,
                tasks: initialState.data.tasks.map(e => (e.id === 1
                    ? {
                        ...e, body: 'Test',
                    } : e)),
            },
        };
        const action2 = actions.updateTaskList({idTask: 1, newTaskName: 'NewTask'});
        const expected2 = {
            ...initialState,
            data: {
                ...initialState.data,
                tasks: initialState.data.tasks.map(e => (e.id === 1
                    ? {
                        ...e, body: 'NewTask',
                    } : e)),
            },
        };
        expect(reducer(initialState, action)).toEqual(expected);
        expect(reducer(prevState2, action2)).toEqual(expected2);
    });
    it('FETCH_LIST_SUCCESS test', () => {
        const data = {
            todoListName: 'List 1',
            tasks: [
                {
                    id: 0,
                    body: 'New test',
                },
            ],
        };
        const action = actions.fetchListSuccess(data);
        const expected = {
            ...initialState,
            data: {
                todoListName: 'List 1',
                tasks: [
                    {
                        id: 0,
                        body: 'New test',
                    },
                ],
            },
        };
        expect(reducer(initialState, action)).toEqual(expected);
    });

    it('UPDATE_TITLE_LIST test', () => {
        const action = actions.updateTitleList({ newTitle: 'Dashboard' });
        const expected = {
            ...initialState,
            data: {
                ...initialState.data,
                todoListName: 'Dashboard'
            },
        };
        const prevState2 = {
            ...initialState,
            data: {
                ...initialState.data,
                todoListName: 'New list'
            },
        };
        const action2 = actions.updateTitleList({newTitle: 'Now'});
        const expected2 = {
            ...initialState,
            data: {
                ...initialState.data,
                todoListName: 'Now'
            },
        };
        expect(reducer(initialState, action)).toEqual(expected);
        expect(reducer(prevState2, action2)).toEqual(expected2);
    });
    it('UPDATE_CHECKBOX_LIST test', () => {
        const action = actions.updateCheckboxList({idTask: 12, selected: true});
        const expected = {
            ...initialState,
            data: {
                ...initialState.data,
                tasks: initialState.data.tasks.map(e => (e.id === 12
                    ? {
                        ...e, isComplete: false,
                    } : e)),
            },
        };
        const prevState2 = {
            ...initialState,
            data: {
                ...initialState.data,
                tasks: initialState.data.tasks.map(e => (e.id === 1
                    ? {
                        ...e, isComplete: true,
                    } : e)),
            },
        };
        const action2 = actions.updateCheckboxList({idTask: 1, selected: true});
        const expected2 = {
            ...initialState,
            data: {
                ...initialState.data,
                tasks: initialState.data.tasks.map(e => (e.id === 1
                    ? {
                        ...e, isComplete: false,
                    } : e)),
            },
        };
        expect(reducer(initialState, action)).toEqual(expected);
        expect(reducer(prevState2, action2)).toEqual(expected2);
    });
});
