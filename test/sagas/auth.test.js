import {
    call, put, select, delay,
} from 'redux-saga/effects';
import { authorization as authorizationApi, refreshToken } from '../../src/api/auth';
import { authorization, refreshTokenProcess, setDefaultApiToken, rehydrateSaga, logout, getToken } from '../../src/scenes/account/authorization/duck';


describe('Authorization saga test', () => {
    const action = {
        type: 'LOGIN_SUCCESS',
        payload: {
            password: 'rostik',
            usernameOrEmail: 'rostik',
        },
    };

    const generatorAuth = authorization(action);

    it('Call authorizationApi saga test', () => {
        expect(generatorAuth.next().value).toEqual(call(authorizationApi, action.payload));
    });

    const res = {
        data: {
            user: action.payload.usernameOrEmail,
            accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTU0NzE3ODcwLCJleHAiOjE1NTQ3MTg3NzB9.eGhIZzp6BolVT1W6s6Mv0BkgukgTJbnOI-h__j4aglCHfRfyqF61vMo3piHI5UWeyP83AwP9P85nipwVxbsQUA',
        },
    };

    it('Put loginSuccess saga test', () => {
        expect(generatorAuth.next(res).value).toEqual(put({
            type: 'LOGIN_SUCCESS',
            payload: {
                user: 'rostik',
                token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTU0NzE3ODcwLCJleHAiOjE1NTQ3MTg3NzB9.eGhIZzp6BolVT1W6s6Mv0BkgukgTJbnOI-h__j4aglCHfRfyqF61vMo3piHI5UWeyP83AwP9P85nipwVxbsQUA',
            },
        }));
    });

    it('Call setDefaultApiToken saga test', () => {
        expect(generatorAuth.next().value).toEqual(call(setDefaultApiToken, res.data.accessToken));
    });

    it('Saga done', () => {
        expect(generatorAuth.next().done).toBe(true);
    });
});

describe('Refresh token Process saga test', () => {
    const generatorRefreshToken = refreshTokenProcess();

    it('delay saga test', () => {
        expect(generatorRefreshToken.next().value).toEqual(delay(60000));
    });

    it('call saga test', () => {
        expect(generatorRefreshToken.next().value).toEqual(call(refreshToken));
    });

    const accessToken = { data: { accessToken: 'sdsdsdsd' } };

    it('call saga test', () => {
        expect(generatorRefreshToken.next(accessToken).value).toEqual(call(setDefaultApiToken, accessToken.data.accessToken));
    });

    it('put saga test', () => {
        expect(generatorRefreshToken.next().value).toEqual(put({
            type: 'REFRESH_TOKEN',
        }));
    });

    it('put saga test', () => {
        expect(generatorRefreshToken.next().value).toEqual(put({
            type: 'REFRESH_TOKEN_SUCCESS',
            payload: accessToken.data.accessToken,
        }));
    });

    it('Saga done', () => {
        expect(generatorRefreshToken.next().done).toBe(true);
    });
});

describe('Rehydrate saga test', () => {
    const generatorRehydrate = rehydrateSaga();

    it('GetToken select saga test', () => {
        expect(generatorRehydrate.next().value).toEqual(select(getToken));
    });

    const token = { token: 'sdsdsd' };

    it('Call setDefaultApiToken saga test', () => {
        expect(generatorRehydrate.next(token).value).toEqual(call(setDefaultApiToken, token.token));
    });

    it('Call refreshTokenProcess saga test', () => {
        expect(generatorRehydrate.next().value).toEqual(call(refreshTokenProcess));
    });

    it('Saga done', () => {
        expect(generatorRehydrate.next().done).toBe(true);
    });

});

describe('Logout saga test', () => {
    const generatorLogout = logout();

    it('Call setDefaultApiToken saga test', () => {
        expect(generatorLogout.next().value).toEqual(call(setDefaultApiToken, ''));
    });

    it('Put loginSuccess saga test', () => {
        expect(generatorLogout.next().value).toEqual(put({
            type: 'LOGIN_SUCCESS',
            payload: {
                user: '',
                token: '',
            },
        }));
    });

    it('Saga done', () => {
        expect(generatorLogout.next().done).toBe(true);
    });
});
