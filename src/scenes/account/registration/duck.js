import { createAction } from 'redux-actions';
import { call } from 'redux-saga/effects';
import { registration as registrationApi } from '../../../api/auth';
import history from '../../../config/history';
import { safeTakeEvery } from '../../../helpers/saga';

export const REGISTRATION = 'REGISTRATION';

export const actions = {
    registration: createAction(REGISTRATION),
};

export function* registration(action) {
    yield call(registrationApi, action.payload);
    history.replace('/list');
}

export function* saga() {
    yield safeTakeEvery(REGISTRATION, registration);
}
