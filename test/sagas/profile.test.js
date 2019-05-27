import {
    call, put, select, delay, takeEvery, fork, all, take,
} from 'redux-saga/effects';
import { safeTakeEvery, safeTakeLatest } from '../../src/helpers/saga';
import {
    getCurrentUser, editProfile as editProfileApi, deleteProfile as deleteProfileApi,
} from '../../src/api/userController';
import {
    saga, fetchUser, editProfile, deleteProfile, FETCH_CURRENT_USER
} from '../../src/scenes/container/settings/profile/duck';

describe('Profile saga test', () => {
    const generatorFetch = fetchUser();
    it('Fetch user call saga test', () => {
        expect(generatorFetch.next().value).toEqual(call(getCurrentUser));
    });

    const res = {
        data: {
            email: 'test@ssss.ru',
            gravatarUrl: 'https://www.gravatar.com/avatar/d77228c264655f9edef0809a19958f6f',
            name: 'test',
            username: 'testtest',
        },
    };

    it('Fetch user put saga test', () => {
        expect(generatorFetch.next(res).value).toEqual(put({
            type: 'settings/FETCH_CURRENT_USER_SUCCESS',
            payload: res.data,
        }));
    });

    it('Saga done', () => {
        expect(generatorFetch.next().done).toBe(true);
    });
});

describe('Edit profile saga test', () => {
    const action = {
        payload: {
            email: 'test@ssss.ru',
            name: 'test',
            password: '123456',
            username: 'testtest',
        },
    };

    const generatorEdit = editProfile(action);

    it('Edit profile saga test', () => {
        expect(generatorEdit.next(action).value).toEqual(call(editProfileApi, action.payload));
    });

    it('Fetch user call saga test', () => {
        expect(generatorEdit.next().value).toEqual(call(fetchUser));
    });

    it('Saga done', () => {
        expect(generatorEdit.next().done).toBe(true);
    });
});

describe('Delete profile saga test', () => {
    const generatorDelete = deleteProfile();

    it('Delete profile call saga test', () => {
        expect(generatorDelete.next().value).toEqual(call(deleteProfileApi));
    });

    it('Fetch user call saga test', () => {
        expect(generatorDelete.next().value).toEqual(call(fetchUser));
    });

    it('Saga done', () => {
        expect(generatorDelete.next().done).toBe(true);
    });
});
