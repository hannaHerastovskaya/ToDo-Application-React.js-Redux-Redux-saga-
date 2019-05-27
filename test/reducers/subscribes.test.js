import { actions, reducer } from '../../src/scenes/container/settings/subscribes/duck';

const initialState = {
    search: '',
    subscribers: [],
    searchRaw: [],
};

describe('Subscribes test', () => {
    it('SEARCH_SUBSCRIBERS test', () => {
        const action = actions.searchSubscribers('searchValue');
        const expected = {
            ...initialState,
            search: 'searchValue',
        };

        const previousState = {
            ...initialState,
            search: 'searchValue',
        };

        const action1 = actions.searchSubscribers('newSearchValue');
        const expected1 = {
            ...initialState,
            search: 'newSearchValue',
        };

        expect(reducer(initialState, action)).toEqual(expected);
        expect(reducer(previousState, action1)).toEqual(expected1);
    });


    it('MUTATE_SUCCESS test', () => {
        const action = actions.mutateSuccess(['user1', 'user2', 'user3']);
        const expected = {
            ...initialState,
            subscribers: ['user1', 'user2', 'user3'],
        };

        const previousState = {
            ...initialState,
            subscribers: ['user1', 'user2', 'user3'],
        };
        const action1 = actions.mutateSuccess(['user1', 'user3']);
        const expected1 = {
            ...initialState,
            subscribers: ['user1', 'user3'],
        };
        expect(reducer(initialState, action)).toEqual(expected);
        expect(reducer(previousState, action1)).toEqual(expected1);
    });

    it('FETCH_SUBSCRIBERS_SUCCESS test', () => {
        const action = actions.fetchSubscribersSuccess([]);
        const expected = {
            ...initialState,
            searchRaw: [],
        };

        const previousState1 = {
            ...initialState,
            searchRaw: [],
        };

        const action1 = actions.fetchSubscribersSuccess(['1', '2', '3']);
        const expected1 = {
            ...initialState,
            searchRaw: ['1', '2', '3'],
        };

        expect(reducer(initialState, action)).toEqual(expected);
        expect(reducer(previousState1, action1)).toEqual(expected1);
    });
});
