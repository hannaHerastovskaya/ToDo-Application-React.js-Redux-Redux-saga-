import { actions, reducer } from '../../src/scenes/popup/duck';

const initialState = {
    data: {
        users: [],
        currentUserName: '',
    },
    search: '',
};

describe('Popup test', () => {
    it('SEARCH_USERS test', () => {
        const action = actions.searchUser('lk');
        const expected = {
            ...initialState,
            search: 'lk',
        };
        const prevState2 = {
            ...initialState,
            search: 'null',
        };
        const action2 = actions.searchUser('mama');
        const expected2 = {
            ...initialState,
            search: 'mama',
        };
        expect(reducer(initialState, action)).toEqual(expected);
        expect(reducer(prevState2, action2)).toEqual(expected2);
    });
    it('FETCH_USERS test', () => {
        const res = {
            data: ['Daria', 'Mila'],
        };
        const action = actions.fetchUser({ users: res.data, currentUserName: 'Mila' });
        const expected = {
            ...initialState,
            data: {
                ...initialState.data,
                users: ['Daria', 'Mila'],
                currentUserName: 'Mila',
            },
            search: '',
        };
        const prevState2 = {
            ...initialState,
            data: {
                ...initialState.data,
                users: ['Maria'],
                currentUserName: 'Maria',
            },
            search: '',
        };
        const action2 = actions.fetchUser({ users: ['Lilia'], currentUserName: 'Lilia' });
        const expected2 = {
            ...initialState,
            data: {
                ...initialState.data,
                users: ['Lilia'],
                currentUserName: 'Lilia',
            },
            search: '',
        };
        expect(reducer(initialState, action)).toEqual(expected);
        expect(reducer(prevState2, action2)).toEqual(expected2);
    });
});