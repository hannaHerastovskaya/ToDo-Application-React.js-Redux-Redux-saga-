import { createAction, handleActions } from 'redux-actions';
import theme from '../../../../config/theme';

export const CHANGE_THEME = 'settings/theme/CHANGE_THEME';

export const actions = {
    changeTheme: createAction(CHANGE_THEME),
};

const initialState = {
    type: 'day',
    data: theme.day,
};

export const reducer = handleActions({
    [CHANGE_THEME]: (state, { payload }) => ({ ...state, ...payload }),
}, initialState);
