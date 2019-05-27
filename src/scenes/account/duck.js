import { all } from 'redux-saga/effects';
import { saga as registrationSaga } from './registration/duck';
import { saga as authorizationSaga } from './authorization/duck';

export function* loginPageSaga() {
    yield all([
        registrationSaga(),
        authorizationSaga(),
    ]);
}

export default loginPageSaga;
