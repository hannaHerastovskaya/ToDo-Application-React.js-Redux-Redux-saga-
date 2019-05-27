import { actions, reducer } from '../../src/scenes/container/settings/theme/duck';
import theme from '../../src/config/theme';

const initialState = {
    type: 'day',
    data: theme.day,
};

describe('Theme test', () => {
    it('CHANGE THEME test', () => {
        const action = actions.changeTheme({
            type: 'custom',
            data: {
                activeButton: '#000000',
                activeButtonText: '#FFFFFF',
                activeCheckbox: '#000000',
                background: '#F5F5F4',
                backgroundButton: '#D3D3D3',
                backgroundHeader: '#FFFFFF',
                backgroundList: '#FFFFFF',
                backgroundWindow: '#FFFFFF',
                buttonText: '#000000',
                checkboxBackground: '#FFFFFF',
                hoverButton: '#A9A9A9',
                hrefButton: '#FFFFFF',
                mainText: '#808080',
                navButton: '#EAEAEA',
                textHeader: '#000000',
            },
        });

        const expected = {
            ...initialState,
            data: {
                activeButton: '#000000',
                activeButtonText: '#FFFFFF',
                activeCheckbox: '#000000',
                background: '#F5F5F4',
                backgroundButton: '#D3D3D3',
                backgroundHeader: '#FFFFFF',
                backgroundList: '#FFFFFF',
                backgroundWindow: '#FFFFFF',
                buttonText: '#000000',
                checkboxBackground: '#FFFFFF',
                hoverButton: '#A9A9A9',
                hrefButton: '#FFFFFF',
                mainText: '#808080',
                navButton: '#EAEAEA',
                textHeader: '#000000',
            },
            type: 'custom',
        };

        expect(reducer(initialState, action)).toEqual(expected);
    });
});
