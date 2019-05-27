import styled from 'styled-components';

export default styled.button`
        width: ${p => (p.width ? p.width : '115px')}; 
        outline: none;
        border: none;
        -moz-border-radius:10px;
        -webkit-border-radius:10px;
        border-radius:6px;
        cursor:pointer;
        background-color: ${p => p.theme.backgroundButton};
        color:  ${p => p.theme.buttonText};
        font-family:Arial;
        font-size:15px;
        font-weight:bold;

        &:hover {
            background-color: ${p => p.theme.hoverButton};
        }
    
        &:active{
            position:relative;
            top: 1px;
        }
`;
