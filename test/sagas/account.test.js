import { all } from 'redux-saga/effects';
import { saga as registrationSaga } from '../../src/scenes/account/registration/duck';
import { saga as authorizationSaga } from '../../src/scenes/account/authorization/duck';
import loginPageSaga from '../../src/scenes/account/duck';

describe('Login page Saga test', () => {
    const generator = loginPageSaga();

    // it('call saga test', () => {
    //     expect(generator.next().value).toEqual(all([registrationSaga(), authorizationSaga()]));
    // });
});
