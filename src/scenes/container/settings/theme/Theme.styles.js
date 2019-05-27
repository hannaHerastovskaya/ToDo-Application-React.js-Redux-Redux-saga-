import styled from 'styled-components';

export const Theme = styled.div`
    display: flex;   
    width: 100%;
    height: fit-content;
    justify-content: space-around;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;

`;

export const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ColumnTitle = styled.div`
    font-size: 30px;
    align-self: center;
    font-weight: 400; 
    color: ${p => p.theme.mainText};
    border-bottom: 1px solid grey; 
`;

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    height: 24px;
    margin-top: 8px;
`;

export const Text = styled.p`
    font-size: 14px;
    color: ${p => p.theme.mainText};
    align-self: center;
`;

export const ThemeTitle = styled.div`
    font-size: 30px;
    color: ${p => p.theme.mainText};
    
`;

export const NewTheme = styled.div`
    display: flex;
    flex-direction: row;   
    justify-content: center;
    align-self: center;
    margin: 0px auto;
    width: 90%;
    height: 70%
`;

export const BlockTheme = styled.div`
    display: flex;
    flex-direction: column;  
    max-width: 380px;
`;

export const NewAddingTheme = styled.div`
    display: flex;
    flex-direction: row;   
    align-item: center;
    margin-left: 65px;
    margin-top: 50px;
`;

export const ImageTheme = styled.img`
    width: 70%;
    height: 70%;
    border-radius: 10px;
    margin: 16px 0;
    cursor: pointer;
    align-self: center;
`;

export const NameTheme = styled.span`
    align-self: center;
    font-size: 20px;
    color: ${p => p.theme.mainText};
    &:hover {
        cursor: pointer;
    }
`;

export const PaintTheme = styled.img`
    width: 50px;
    height: 50px;
    margin: 20px 10px;
`;

export const TextTheme = styled.span`
    font-size: 24px;
    color: ${p => p.theme.mainText};
    margin-top: 40px;
    margin-left: 10px;
    &:hover {
    cursor: pointer;
    }
`;

export const ApplyButton = styled.button`
    background-color: ${p => p.theme.backgroundButton};
    -moz-border-radius:10px;
    -webkit-border-radius:10px;
    border-radius:6px;
    border: none;
    margin-top: 16px;
    align-self: center;
    text-decoration:none;
    outline: none;
    cursor: pointer;
    color: ${p => p.theme.buttonText};
    font-size: 15px;
    font-weight: 400;
    width: 20%;
    height: 8%;

    &:hover {
        background-color:${p => p.theme.hoverButton};
    }

    &:active {
        position:relative;
        top: 1px;
    }
`;
