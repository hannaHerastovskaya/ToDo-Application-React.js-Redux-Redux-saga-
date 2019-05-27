import { actions, reducer } from '../../src/scenes/container/settings/followUser/duck';

const initialState = {
    search: '',
    usersNamesRaw: [],
    usersNames: [],
    message: '',
};

describe('Follow user test', () => {
    it('SEARCH test', () => {
        const action = actions.searchUsers('word');
        const expected = {
            ...initialState,
            search: 'word',
        };
        expect(reducer(initialState, action)).toEqual(expected);
    });
    it('GET_MESSAGE test', () => {
        const action = actions.getMessageOnAccessFollowing('Error');
        const expected = {
            ...initialState,
            message: 'Error',
        };
        expect(reducer(initialState, action)).toEqual(expected);
    });
    it('MUTATE_SUCCESS test', () => {
        const action = actions.mutateSuccess(['dwdw','dwd']);
        const expected = {
            ...initialState,
            usersNames: ['dwdw','dwd'],
        };
        expect(reducer(initialState, action)).toEqual(expected);
    });
    it('FETCH_USERS_SUCCESS test', () => {
        const action = actions.fetchUsersSuccess(['dwdw','dwd','dwdw','dwd','dwdw','dwd','dwdw','dwd']);
        const expected = {
            ...initialState,
            usersNamesRaw: ['dwdw','dwd','dwdw','dwd','dwdw','dwd','dwdw','dwd'],
        };
        expect(reducer(initialState, action)).toEqual(expected);
    });
});