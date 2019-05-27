import styled from 'styled-components';
import _Select from '@material-ui/core/Select';
import _InputLabel from '@material-ui/core/InputLabel';
import _MenuItem from '@material-ui/core/MenuItem';

export const Select = styled(_Select)`
    color: black;
    border: none;
    display: flex;
    width: 75%;
    margin: 6px 8px 6px 0;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 0  4px 0  rgba(0,0,0,0.2);
    padding: 8px;
    
`;

export const MenuItem = styled(_MenuItem)`
    min-height: 30px !important;
    color: grey !important;
    & > span {
        
    }
`;

export const InputLabel = styled(_InputLabel)`
     color: black;
     font-size: 14px;
     font-weight: 600;
     margin: 4px 0 0 4px;
`;

export const Container = styled.div`
    position: relative;
`;

export const Button = styled.button`
    display: flex;
    justify-content: space-between;
	border: none;
	background-color: ${p => (p.checked ? p.theme.activeButton : p.theme.backgroundList)};
    box-shadow: 0 0  40px 0  rgba(0,0,0,0.1);
    color: ${p => (p.checked ? p.theme.activeButtonText : p.theme.buttonText)};
    border-radius:5px;
	font-size: 14px;
	cursor:pointer;
	outline: none !important;
    &:hover, &:active{
        background-color: ${p => p.theme.hoverButton}; 
    }
    ${p => p.stylesButton}
`;

export const Down = styled.div`
    font-size: 20px;
`;
export const Ul = styled.div`
    ${p => p.stylesContainer}
    position: absolute;
	font-size: 20px;
	cursor: pointer;
	z-index: 5;
    display: ${p => (p.visible ? 'block' : 'none')};
    box-shadow: 0 0  40px 0  rgba(0,0,0,0.2);
    border-radius: 8px;
`;

export const Li = styled.div`
    ${p => p.stylesValues}
    padding: 8px;
	text-size: 20px;
	cursor: pointer;
    &:hover {
      background-color: grey;
    }
    background-color: ${p => (p.checked ? 'black' : p.theme.backgroundList)};
    color: ${p => (p.checked ? p.theme.activeButtonText : p.theme.buttonText)}  ;
`;

export const Icon = styled.img`
    width: 30px;
    height: 30px;
    margin-left: 8px;
`;
