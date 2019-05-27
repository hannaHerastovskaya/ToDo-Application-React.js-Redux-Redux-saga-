/* eslint-disable no-console */
import { createAction, handleActions } from 'redux-actions';
import { call, put, select } from 'redux-saga/effects';
import { safeTakeEvery } from '../../helpers/saga';
import { searchUserByUsername } from '../../api/userController';

export const SEARCH_USERS = 'popup/SEARCH_USERS';
export const FETCH_USERS = 'popup/FETCH_USERS';

export const actions = {
    searchUser: createAction(SEARCH_USERS),
    fetchUser: createAction(FETCH_USERS),
};

export const getUser = state => state.profile.currentUser.username;

const initialState = {
    data: {
        users: [],
        currentUserName: '',
    },
    search: '',
};

export const reducer = handleActions({
    [SEARCH_USERS]: (state, action) => ({ ...state, search: action.payload }),
    [FETCH_USERS]: (state, action) => ({ ...state, data: action.payload }),

}, initialState);


export function* fetchUser(action) {
    const currentUserName = yield select(getUser);
    const res = yield call(searchUserByUsername, action.payload);
    yield put(actions.fetchUser({ users: res.data, currentUserName }));
}

export function* saga() {
    yield safeTakeEvery(SEARCH_USERS, fetchUser);
}
