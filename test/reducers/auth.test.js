import {
    actions, reducer,
} from '../../src/scenes/account/authorization/duck';

const initialState = {
    user: '',
    token: '',
};

describe('Authorization test', () => {
    it('LOGIN_SUCCESS test', () => {
        const action = actions.loginSuccess({ user: 'user', token: 'token' });
        const expected = {
            ...initialState,
            user: 'user',
            token: 'token',
        };

        const previousState = {
            ...initialState,
            user: 'oldUser',
            token: 'oldToken',
        };
        const action1 = actions.loginSuccess({ user: 'newUser', token: 'newToken' });
        const expected1 = {
            ...initialState,
            user: 'newUser',
            token: 'newToken',
        };
        expect(reducer(initialState, action)).toEqual(expected);
        expect(reducer(previousState, action1)).toEqual(expected1);
    });

    it('REFRESH_TOKEN test', () => {
        const action = actions.refreshTokenSuccess('newToken');
        const expected = {
            ...initialState,
            token: 'newToken',
        };
        expect(reducer(initialState, action)).toEqual(expected);
    });
});
