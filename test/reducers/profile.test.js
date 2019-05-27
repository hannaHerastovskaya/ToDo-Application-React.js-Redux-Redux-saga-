import { actions, reducer } from '../../src/scenes/container/settings/profile/duck';

const initialState = {
    currentUser: undefined,
};

describe('Profile test', () => {
    it('FETCH_CURRENT_USER_SUCCESS test', () => {
        const action = actions.fetchCurrentUserSuccess({
            username: 'rostik',
            name: 'Rostik',
            email: 'rostik@rostik.ru',
            gravatarUrl: 'https://www.gravatar.com/avatar/a2a0c92d5d0209e92370f11ef4b1b828',
        });
        const expected = {
            ...initialState,
            currentUser: {
                username: 'rostik',
                name: 'Rostik',
                email: 'rostik@rostik.ru',
                gravatarUrl: 'https://www.gravatar.com/avatar/a2a0c92d5d0209e92370f11ef4b1b828',
            },
        };
        const previousState = {
            ...initialState,
            currentUser: {
                username: 'rostik',
                name: 'Rostik',
                email: 'rostik@rostik.ru',
                gravatarUrl: 'https://www.gravatar.com/avatar/a2a0c92d5d0209e92370f11ef4b1b828',
            },
        };
        const action1 = actions.fetchCurrentUserSuccess({
            username: 'user',
            name: 'username',
            email: 'user@user.ru',
            gravatarUrl: 'https://www.gravatar.com/avatar/a2a0c92d5d0209e92370f11ef4b1b828',
        });
        const expected1 = {
            ...initialState,
            currentUser: {
                username: 'user',
                name: 'username',
                email: 'user@user.ru',
                gravatarUrl: 'https://www.gravatar.com/avatar/a2a0c92d5d0209e92370f11ef4b1b828',
            },
        };
        expect(reducer(initialState, action)).toEqual(expected);
        expect(reducer(previousState, action1)).toEqual(expected1);
    });
});
