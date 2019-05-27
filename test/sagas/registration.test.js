import {
    call, put, select, delay,
} from 'redux-saga/effects';
import { registration as registrationApi } from '../../src/api/auth';
import { safeTakeEvery } from '../../src/helpers/saga';
import { registration } from '../../src/scenes/account/registration/duck';


describe('Auth saga test', () => {

    const action = {
        payload: {
            email: 'test@ssss.ru',
            name: 'test',
            password: '123456',
            username: 'testtest',
        },
    };
    
    const generator = registration(action);

    it('Reg saga test', () => {
        expect(generator.next(action.payload).value).toEqual(call(registrationApi, action.payload));
    });

    it('Saga done', () => {
        expect(generator.next().done).toBe(true);
    });
});
