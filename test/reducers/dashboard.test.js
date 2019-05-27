import {
    actions, FETCH_DASHBOARD_SUCCESS, FETCH_MY_LISTS_SUCCESS, reducer, UPDATE_TITLE_DASHBOARD,
} from '../../src/scenes/dashboard/duck';

const initialState = {
    data: {
        todoTaskName: 'List',
        tasks: [
            {
                id: 12,
                body: 'Task',
            },
        ],
    },
    myList: [],
    sharedList: [],
    toDoBoardRaw: [],
    toDoBoard: [],
    selectedMy: true,
    currentPage: 0,
    selectedShared: false,
    search: '',
    pageSize: 4,
    totalElements: 0,
    sort: 'id,asc',
};

describe('Dashboard redusers test', () => {
    it('CHANGE_SIZE test', () => {
        const action = actions.changeSize(10);
        const expected = {
            ...initialState,
            pageSize: 10,
        };
        const prevState2 = {
            ...initialState,
            currentPage: 10,
            pageSize: 8,
        };
        const action2 = actions.changeSize(7);
        const expected2 = {
            ...initialState,
            pageSize: 7,
            currentPage: 0,
        };
        expect(reducer(initialState, action)).toEqual(expected);
        expect(reducer(prevState2, action2)).toEqual(expected2);
    });
    it('CHANGE_SORT test', () => {
        const change1 = actions.changeSort('id,desc');
        const expected1 = {
            ...initialState,
            sort: 'id,desc',
        };
        const prevSortState = {
            ...initialState,
            sort: 'id,desc',
        };
        const change2 = actions.changeSort('todoListName,asc');
        const expected2 = {
            ...initialState,
            sort: 'todoListName,asc',
        };
        expect(reducer(initialState, change1)).toEqual(expected1);
        expect(reducer(prevSortState, change2)).toEqual(expected2);
    });
    it('SEARCH test', () => {
        const action = actions.search('kate');
        const expected = {
            ...initialState,
            search: 'kate',
        };
        const prevState2 = {
            ...initialState,
            search: 'null',
        };
        const action2 = actions.search('hello');
        const expected2 = {
            ...initialState,
            search: 'hello',
        };
        expect(reducer(initialState, action)).toEqual(expected);
        expect(reducer(prevState2, action2)).toEqual(expected2);
    });
    it('CHANGE_PAGINATION test', () => {
        const action = actions.changePagination(10);
        const expected = {
            ...initialState,
            currentPage: 10,
        };
        const prevState2 = {
            ...initialState,
            currentPage: 10,
        };
        const action2 = actions.changePagination(7);
        const expected2 = {
            ...initialState,
            currentPage: 7,
        };
        expect(reducer(initialState, action)).toEqual(expected);
        expect(reducer(prevState2, action2)).toEqual(expected2);
    });

    it('FETCH_DASHBOARD_SUCCESS test', () => {
        const allList = [
            {
                tasks: [{ body: 'Task', id: 12 }],
                todoTaskName: 'List',
            },
            {
                tasks: [{ body: 'Task', id: 12 }],
                todoTaskName: 'List',
            }];
        const action = actions.fetchDashboardSuccess(allList);
        const expected = {
            ...initialState,
            toDoBoardRaw: allList,
        };
        expect(reducer(initialState, action)).toEqual(expected);
    });

    it('MUTATE_SUCCESS test', () => {
        const allList = [
            {
                tasks: [{ body: 'Task', id: 12 }],
                todoTaskName: 'List',
            },
            {
                tasks: [{ body: 'Task', id: 12 }],
                todoTaskName: 'List',
            }];
        const action = actions.mutateSuccessDashboard(allList);
        const expected = {
            ...initialState,
            toDoBoard: allList,
        };
        expect(reducer(initialState, action)).toEqual(expected);
    });

    it('FETCH_MY_LISTS_SUCCESS test', () => {
        const data = {
            myLists: [
                {
                    tasks: [{ body: 'Task', id: 12 }],
                    todoTaskName: 'List',
                },
                {
                    tasks: [{ body: 'Task', id: 12 }],
                    todoTaskName: 'List',
                },
            ],
            countElements: 2,
            countPages: 0,
        };
        const action = actions.fetchMyListsSuccess(data);
        const expected = {
            ...initialState,
            myList: data.myLists,
            totalElements: data.countElements,
            totalPages: data.countPages,
        };
        expect(reducer(initialState, action)).toEqual(expected);
    });

    it('FETCH_SHARED_LISTS_SUCCESS test', () => {
        const data = [
            {
                tasks: [{ body: 'Task', id: 12 }],
                todoTaskName: 'List',
            },
            {
                tasks: [{ body: 'Task', id: 12 }],
                todoTaskName: 'List',
            },
        ];
        const action = actions.fetchSharedListsSuccess(data);
        const expected = { ...initialState, sharedList: data };
        expect(reducer(initialState, action)).toEqual(expected);
    });

    it('SELECTED_MY_LISTS test', () => {
        const selectedMy = true;
        const action = actions.updateSelectedMyLists(!selectedMy);
        const expected = { ...initialState, selectedMy: !selectedMy };
        expect(reducer(initialState, action)).toEqual(expected);
    });

    it('SELECTED_SHARED_LISTS test', () => {
        const selectedShared = false;
        const action = actions.updateSelectedSharedLists(!selectedShared);
        const expected = { ...initialState, selectedShared: !selectedShared };
        expect(reducer(initialState, action)).toEqual(expected);
    });

});
