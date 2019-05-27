/* eslint-disable template-curly-spacing */
import styled from 'styled-components';
import _ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import _ToggleButton from '@material-ui/lab/ToggleButton';

export const ToggleButtonGroup = styled(_ToggleButtonGroup)`
    border-radius: 4px;
    height: 52px;
    display: flex;
    align-self: center;
`;

export const ToggleButton = styled(_ToggleButton)`
    border-radius: 4px;
    height: 52px;
    display: flex;
    align-self: center;
`;

export const Head = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 0 16px 8px;
    justify-content: space-between;
   position:relative;
`;

export const SearchContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: auto;
`;

export const CheckboxDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 7px;
    @media (max-width: 600px) {
        margin-bottom: 8px;
    }
`;

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   height: 100vh;
   background-color: ${p => p.theme.background};
   input{
        border: none;
        background-color: inherit;
        color: grey;
   }
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    padding: 8px;
    box-shadow: 0 0  4px 0  rgba(0,0,0,0.2);
    z-index:1;
    background-color: ${ p => p.theme.backgroundHeader };
    & > b{
        font-size: 40px;
        color: ${ p => p.theme.textHeader };
    }
`;

export const Logo = styled.svg`
    width: 50px;
    height: 50px;
    fill: ${ p => p.theme.textHeader };
    cursor: pointer;
`;

export const Line = styled.div`
    height: 5px;
    display: flex;
    flex: auto;
    background-color: ${ p => p.theme.textHeader };
`;

export const Icon = styled.img`
    width: 32px;
    height: 32px;
    cursor: pointer;
    padding: 0 8px;
`;
