/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import _InfoOutlined from '@material-ui/icons/InfoOutlined';
import _Info from '@material-ui/icons/Info';

export const List = styled.span`
    display: flex;
    flex-direction: column;
    flex: auto;
    width: 100%;
    height: 100vh;
    overflow: auto;
`;

export const inputBlock = styled.span`
    display: flex;
    flex-direction: row;
    flex: auto;
    background-color: ${p => p.theme.backgroundList};
    margin: 8px;
    border-radius: 5px;
    padding: 8px;
    box-shadow: 0 0  4px 0  rgba(0,0,0,0.2);
    font-size: 15px;
    cursor: pointer;
    height: auto;
    min-height: 34.4px;
    max-height: 40px;
    align-items: center;
    width: auto;
`;

export const animationButton = styled.div`
    color: ${p => p.theme.mainText};
    height: auto;
    width: 20px;
    padding: 2px 3px;
    margin: 2px;

    &:hover {
         box-shadow: 3px 3px  8px 0  rgba(0,0,0,0.1);
         border-radius: 4px;
         background-color:white;
    }    
`;

export const iconTrash = styled.img`
    margin-top: -2px;
    margin-left: 8px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: ${p => p.theme.mainText}
`;

export const BlockInfoContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;    
`;

export const blockTask = styled.article`
    display: flex;
    flex: auto;
    flex-direction: column;
    align-content: space-between;
    background-color:  ${p => p.theme.backgroundList};
    box-shadow: 0 0  4px 0  rgba(0,0,0,0.2);
    margin: 0px 8px;
    border-radius: 4px;
    font-size: 15px;
    cursor: pointer;
    height: 78vh;
    padding: 8px;
    width: 65%;
    & > div {
        height: 85vh;
        overflow: auto;
        margin: 8px 0px;
    }
`;

export const DetailsList = styled.div`
    display: ${p => p.visibleInfo ? 'flex' :  'none'};
    flex-direction: column;
    background-color:  ${p => p.theme.backgroundList};
    height: 78vh;
    width: 25%;
    margin: 0px 8px;
    padding: 8px; 
    box-shadow: 0 0  4px 0  rgba(0,0,0,0.2);
    border-radius: 4px;
`;

export const ListCreateData = styled.div`
    display: flex;
    font-size: 14px;
    margin: 8px 8px 8px auto;
    color: gray;
`;

export const Create = styled.div`
    font-size: 16px;
    margin: 8px 16px;
`;

export const BlockComment = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto 8px 8px 16px;
`;

export const Comment = styled.div`
    font-size: 16px;
    height: 20vh;
    border-radius: 4px;
    border: rgb(128, 128, 128, 0.1) solid 1px;
`;

export const DetailTitle = styled.div`
    font-size: 28px;
    margin: 8px 16px;
`;

export const titleNameOneList = styled.input`
    font-size: 30px;
    font-weight: bold;
    outline: none;
    display: flex;
    width: 97%;
    margin-left: 8px;
    text-overflow: ellipsis;
    color: ${p => p.theme.buttonText} !important; 
    font-weight: 400;
    cursor: pointer;
`;

export const Info = styled(_Info)`
    height: 50px !important; 
    width: 35px !important; 
    color: black; 
    padding: 0px;
`;

export const InfoOutlined = styled(_InfoOutlined)`
    height: 50px !important; 
    width: 35px !important; 
    color: black; 
    padding: 0px;
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

export const addNewTask = styled.input`
    font-size: 20px;
    margin: 8px;
    outline: none;
    margin-top: auto;
`;

export const nullTask = styled.div`
    margin: 10px 20px;
    opacity: 0.6;
    font-size: 20px;
    align-self: center;
`;

export const addTaskContainer = styled.div`
    display: ${p => (p.visible ? 'flex' : 'none')};
    height: auto !important;
    flex-direction: row;
    align-items: center;
    min-height: 50px;
`;

export const Expand = styled.div`
    display: ${p => (p.visible ? 'flex' : 'none')};
    height: auto;
    min-height: 100px;
    justify-content: space-between;
`;

export const Textarea = styled.textarea`
    width: 100%;
    height: 60px;
`;

export const PriorityImage = styled.img`
    width: 15%;
    height: 20px;
`;