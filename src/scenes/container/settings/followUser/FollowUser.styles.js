import styled from 'styled-components';

export const Follow = styled.div`
    display: flex;
    flex-direction: column;
    flex:auto;
`;

export const Label = styled.div`
    font-family: Helvetica;
    align-self: center;
    margin-top: 8px;
    font-size: 30px;
    font-weight: bold;
    color:${p => p.theme.mainText};
`;
export const SearchBlock = styled.div`
    display: flex;
    flex-direction: row;
    margin: 24px 8px;
    border-radius: 5px;
    
`;
export const Search = styled.main`
    display: flex;
    flex: auto;
    flex-direction: column;
`;
export const SearchInput = styled.input`
    width: 100%;
    border-radius: 5px 0 0 0 ;
    padding-left: 8px;
    outline: none;
    height: 34px;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.2);
`;

export const UsernameList = styled.div`
    border-radius: 0 0 5px 5px;
    background-color: ${p => p.theme.background};
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.2);
    color:${p => p.theme.mainText};
`;
export const Ul = styled.div`
    list-style-type: none;
`;

export const Result = styled.p`
    align-self: center;
    margin-top: 10px;
    font-size: 20px;
    color:${p => p.theme.mainText};
`;

export const SearchUserBtn = styled.div`
    width: 100px;
    height: 20px;
    text-align: center;
    padding: 8px 32px;
    border: none;
    border-radius: 0  5px 5px 0;
    font: 18px Arial,Helvetica,sans-serif;
    font-weight: bold;
    color: ${p => p.theme.mainText};
    background-color: ${p => p.theme.background};
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.2);
    cursor: pointer;
    user-select: none;
`;
