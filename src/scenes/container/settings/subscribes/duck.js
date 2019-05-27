import { createAction, handleActions } from 'redux-actions';
import { call, put, select } from 'redux-saga/effects';
import { safeTakeEvery } from '../../../../helpers/saga';
import { getFollowers } from '../../../../api/userController';

export const SEARCH_SUBSCRIBERS = 'subscribeReducer/SEARCH_SUBSCRIBERS';
export const MUTATE = 'subscribeReducer/MUTATE';
export const MUTATE_SUCCESS = 'subscribeReducer/SUCCESS';
export const FETCH_SUBSCRIBERS = 'subscribeReducer/FETCH_SUBSCRIBERS';
export const FETCH_SUBSCRIBERS_SUCCESS = 'subscribeReducer/FETCH_SUBSCRIBERS_SUCCESS';

export const actions = {
    searchSubscribers: createAction(SEARCH_SUBSCRIBERS),
    mutate: createAction(MUTATE),
    mutateSuccess: createAction(MUTATE_SUCCESS),
    fetchSubscribers: createAction(FETCH_SUBSCRIBERS),
    fetchSubscribersSuccess: createAction(FETCH_SUBSCRIBERS_SUCCESS),
};

const initialState = {
    search: '',
    subscribers: [],
    searchRaw: [],
};

export const getSubscribe = state => state.subscribe;

export const reducer = handleActions({
    [SEARCH_SUBSCRIBERS]: (state, action) => ({ ...state, search: action.payload }),
    [MUTATE_SUCCESS]: (state, action) => ({ ...state, subscribers: action.payload }),
    [FETCH_SUBSCRIBERS_SUCCESS]: (state, action) => ({ ...state, searchRaw: action.payload }),
}, initialState);

export function* mutate() {
    const { searchRaw, search } = yield select(getSubscribe);
    const res = searchRaw.filter(list => list.username.toLowerCase().includes(
        search.toLowerCase(),
    ));
    yield put(actions.mutateSuccess(res));
}

export function* getSubscribers() {
    const res = yield call(getFollowers);
    yield put(actions.fetchSubscribersSuccess(res.data));
}

export function* saga() {
    yield safeTakeEvery(FETCH_SUBSCRIBERS, getSubscribers);
    yield safeTakeEvery([FETCH_SUBSCRIBERS_SUCCESS, SEARCH_SUBSCRIBERS], mutate);
}
