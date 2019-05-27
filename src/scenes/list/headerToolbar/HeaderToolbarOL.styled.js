import styled from 'styled-components';

export const List = styled.span`
    display: flex;
    flex-direction: column;
    flex: auto;
    width: 100%;
    height: 100vh;
    overflow: auto;
`;
export const inputDiv = styled.main`
    display: flex;
    flex-direction: row;
    padding: 6px 0 8px 8px;
    border-radius: 4px;
    box-shadow: 0 0  4px 0  rgba(0,0,0,0.2);
    height: 40px;
    align-items: center;
    width: auto;
`;

export const searchToDo = styled.input`
    display: flex;
    flex: auto;
    outline: none;
    font-size: 18px;
    padding-left: 8px;
    cursor: pointer;
    background-color: ${p => p.theme.backgroundList};
`;
