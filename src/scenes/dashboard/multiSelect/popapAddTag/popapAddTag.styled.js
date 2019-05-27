import styled from 'styled-components';

export const showPopup = styled.div`
    display: ${props => (props.show ? 'block' : 'none')};
`;

export const Title = styled.div`
    font-size:20px;
    color: rgba(34,37,33,0.87);
    width: 290px;
    margin-left: 4px;
`;

export const Line = styled.div`
    width: 270px;
    margin: 8px 12px ;
    display:flex;
    flex-wrap: wrap;
`;

export const Label = styled.div`
    margin-right: 8px;
    font-size:15px;
    color: grey;
    padding-top: 8px;
`;

export const ButtonLine = styled.div`
    display: flex;
    width: 270px;
    justify-content: flex-end;
    margin: 8px;
`;

export const ButtonSuccess = styled.button`
    border-radius: 4px;
    border: none;
    background-color: black;
    color: white;
    padding: 8px 22px;
    &:disabled{
        background-color: rgba(74,74,74,100);
        color: grey;
    }
`;

export const ButtonCancel = styled.div`
    border-radius: 4px;
    background-color: rgba(74,74,74,100);
    color: white;
    padding: 8px 22px;
    margin-right: 8px;
    margin-left: 8px;
    cursor: default;
`;

export const Input = styled.input`
    display: flex;
    flex: auto;
    font-size:15px;
    padding: 8px;
    outline: none;
    border: 1px solid whitesmoke important!;
`;

export const Error = styled.div`
    display: flex;
    justify-content: flex-end;
    text-align:center;
    font-size: 12px;
    color: red;
    padding-left: 48px;
`;