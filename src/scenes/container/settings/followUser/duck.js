/* eslint-disable no-unused-expressions */
import { createAction, handleActions } from 'redux-actions';
import { call, put, select } from 'redux-saga/effects';
import { safeTakeEvery } from '../../../../helpers/saga';
import { followUser as followUserApi, searchUserByUsername } from '../../../../api/userController';

export const SEARCH = 'followUserReducer/SEARCH';
export const FETCH_USERS = 'followUserReducer/FETCH_USERS_SUCCESS';
export const FETCH_USERS_SUCCESS = 'followUserReducer/FETCH_USERS';
export const MUTATE = 'followUserReducer/MUTATE';
export const MUTATE_SUCCESS = 'followUserReducer/MUTATE_SUCCESS';
export const FOLLOW_USER = 'followUserReducer/FOLLOW_USER';
export const GET_MESSAGE_ON_ACCESS_FOLLOWING = 'followUserReducer/GET_MESSAGE_ON_ACCESS_FOLLOWING';

export const actions = {
    searchUsers: createAction(SEARCH),
    followUsers: createAction(FOLLOW_USER),
    fetchUsers: createAction(FETCH_USERS),
    fetchUsersSuccess: createAction(FETCH_USERS_SUCCESS),
    getMessageOnAccessFollowing: createAction(GET_MESSAGE_ON_ACCESS_FOLLOWING),
    mutate: createAction(MUTATE),
    mutateSuccess: createAction(MUTATE_SUCCESS),
};

const initialState = {
    search: '',
    usersNamesRaw: [],
    usersNames: [],
    message: '',
};

export const getFollowUser = state => state.followUser;

export const getUsername = state => state.profile.currentUser.username;

export const reducer = handleActions({
    [SEARCH]: (state, action) => ({ ...state, search: action.payload }),
    [FETCH_USERS_SUCCESS]: (state, action) => ({ ...state, usersNamesRaw: action.payload }),
    [MUTATE_SUCCESS]: (state, action) => ({ ...state, usersNames: action.payload }),
    [GET_MESSAGE_ON_ACCESS_FOLLOWING]: (state, action) => ({ ...state, message: action.payload }),
}, initialState);

export function* fetchUsersNames() {
    const res = yield call(searchUserByUsername, ' ');
    yield put(actions.fetchUsersSuccess(res.data));
}

export function* followUsers(action) {
    try {
        const res = yield call(followUserApi, action.payload);
        yield put(actions.getMessageOnAccessFollowing(res.data.message));
    } catch (e) {
        e.response.status === 404 && (yield put(actions.getMessageOnAccessFollowing("You can't follow this user!")));
        e.response.status === 403 && (yield put(actions.getMessageOnAccessFollowing('You are'
            + ' already subscribed to this user!')));
    }
}

export function* mutate() {
    const { usersNamesRaw, search } = yield select(getFollowUser);
    const currentUserName = yield select(getUsername);
    const followUsers = usersNamesRaw.filter(i => i !== currentUserName);
    yield put(actions.mutateSuccess(followUsers));
    const res = followUsers.filter(s => s.indexOf(search) >= 0);
    yield put(actions.mutateSuccess(res));
}

export function* saga() {
    yield safeTakeEvery(FETCH_USERS, fetchUsersNames);
    yield safeTakeEvery([FETCH_USERS_SUCCESS, SEARCH], mutate);
    yield safeTakeEvery(FOLLOW_USER, followUsers);
}
