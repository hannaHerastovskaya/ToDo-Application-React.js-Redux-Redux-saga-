/* eslint-disable no-console */
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import {
    call, put, select, delay,
} from 'redux-saga/effects';
import history from '../../../config/history';
import { authorization as authorizationApi, refreshToken } from '../../../api/auth';
import { safeTakeEvery } from '../../../helpers/saga';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const ERRORS = 'login/ERRORS';


export const actions = {
    login: createAction(LOGIN),
    loginSuccess: createAction(LOGIN_SUCCESS),
    logout: createAction(LOGOUT),
    refreshToken: createAction(REFRESH_TOKEN),
    refreshTokenSuccess: createAction(REFRESH_TOKEN_SUCCESS),
    fetchErrors: createAction(ERRORS),
};

const initialState = {
    user: '',
    token: '',
    errorMessage: '',
};

export const getToken = state => state.auth;

export const reducer = handleActions({
    [LOGIN_SUCCESS]: (state, action) => ({
        ...state,
        user: action.payload.user,
        token: action.payload.token,
    }),
    [REFRESH_TOKEN_SUCCESS]: (state, action) => ({ ...state, token: action.payload }),
    [ERRORS]: (state, action) => ({ ...state, errorMessage: action.payload }),
}, initialState);

export function setDefaultApiToken(token) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
}

export function* authorization(action) {
    try {
        const token = yield call(authorizationApi, action.payload);
        yield put(actions.loginSuccess({
            user: action.payload.usernameOrEmail,
            token: token.data.accessToken,
        }));
        yield call(setDefaultApiToken, token.data.accessToken);
        history.replace('/lists');
    }
    catch (e) {
        e.response.status === 401 ? (yield put(actions.fetchErrors('Data is not correct!'))) : null;
    }

}

export function* refreshTokenProcess() {
    const { location: { pathname } } = history;
    if (pathname === '/reg' || pathname === '/auth') {
        // no authorization
    } else {
        yield delay(60000);
        const { data: { accessToken } } = yield call(refreshToken);
        yield call(setDefaultApiToken, accessToken);
        yield put(actions.refreshToken());
        yield put(actions.refreshTokenSuccess(accessToken));
    }
}

export function* rehydrateSaga() {
    const { token } = yield select(getToken);
    yield call(setDefaultApiToken, token);
    yield call(refreshTokenProcess);
}

export function* logout() {
    yield call(setDefaultApiToken, '');
    history.replace('/auth');
    yield put(actions.loginSuccess({
        user: '',
        token: '',
    }));
}

export function* saga() {
    yield safeTakeEvery(LOGIN, authorization);
    yield safeTakeEvery(['persist/REHYDRATE'], rehydrateSaga);
    yield safeTakeEvery(LOGOUT, logout);
    yield safeTakeEvery(REFRESH_TOKEN, refreshTokenProcess);
}
