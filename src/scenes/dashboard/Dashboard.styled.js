import styled from 'styled-components';
import _IconButton from '@material-ui/core/IconButton';
import _FormControl from '@material-ui/core/FormControl';
import _Empty from '@material-ui/icons/ArrowUpward';
import _Done from '@material-ui/icons/CheckCircle';
import _Comment from '@material-ui/icons/Comment';

export const Empty = styled(_Empty)`
    width: 15px;
    height: 15px;
    padding-left: 4px;
    margin-left: 4px;
`;

export const Dashboard = styled.section`
    display: flex;
    flex-direction: column;
    background-color: ${p => p.theme.backgroundList};
    box-shadow: 0 0  4px 0  rgba(0,0,0,0.1);
    
    width: 32%;
    margin: 8px;
    border-radius: 4px;
    min-height: 300px;
    max-height: 300px;
    height: auto;
    animation: show 500ms 1;
    animation-fill-mode: forwards;
    animation-delay: 0s;
    @keyframes show{
        0%{
           opacity:0;
        }
        100% {
            opacity:1;
        }
    }
    @media (max-width: 1151px) {
        min-width: 98.5%; 
    }
`;

export const DashboardHeader = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin: 8px;
    width: 100%;
`;

export const AllTagsContainer = styled.div`
    display:  ${p => (p.show ? 'flex' : 'none')};
    margin: 0 8px 0 0,
    opacity: 0.8,
`;

export const Tag = styled.span`
    background-color:  ${p => p.color};
    padding: 4px 8px;
    margin: 4px;
    border-radius: 8px;
`;

export const AllTagsVisible = styled.div`
    display: flex;
    align-items: center;
    color: grey;
    cursor: default;
`;

export const IconContainer = styled.div`
    visibility: hidden;
    width: auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-right: 16px;
    ${Dashboard}:hover & {
        visibility: visible;
    }
`;

export const Icon = styled.img`
    width: 25px;
    height: 22px;
    color: ${p => p.theme.mainText};
    opacity: 0.5; 
    margin-right: 4px;
`;

export const IconInfo = styled.div`
    position: relative;
     
    p{
        border-radius: 8px;
        display: none;
        padding: 8px;
    }
    &:hover p{
     z-index: 20;
        display: block;
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 12px;
        color: black;
        margin-top: 16px;
        width:300px;
        min-height: 70px;
        max-height: 100px;
        height: auto;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-weight: 400;
        line-height: 1.5;
        letter-spacing: 0.00938em;
        overflow-y: auto;
        overflow-x: hidden;
        background: white;
        box-shadow: 0 0px 4px rgba(0,0,0,0.4);
        ::-webkit-scrollbar {
            width: 6px;
        };
        ::-webkit-scrollbar-track {
            background: #f1f1f1; 
        };
        ::-webkit-scrollbar-thumb {
            background: lightgrey; 
        };
        ::-webkit-scrollbar-thumb:hover {
            background: grey; 
        };
    } 
`;

export const TaskList = styled.div`
    height: 240px;
    overflow-y: auto;
    overflow-x: hidden;
    outline: none;
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }
    ::-webkit-scrollbar-thumb {
        background: lightgrey; 
    }  
    ::-webkit-scrollbar-thumb:hover {
        background: grey; 
    }
    margin-right: 8px;
`;

export const addTaskContainer = styled.div`
    display: ${p => (p.visible ? 'flex' : 'none')};
    // display: flex;
    //visibility: visible;

    /* ${Dashboard}:hover & {
        visibility: visible;
    } */
`;

export const InputAddingTask = styled.input`
    display: flex;
    flex-direction: row;
    align-self: flex-start;
    font-size: 16px;
    outline: none;
    margin: 8px;
    width: 90%;
`;

export const FormControl = styled(_FormControl)`
    margin-top: -10px;
    margin-right: 80px;
    visibility: visible;
    // visibility: ${p => (p.visible ? 'visible' : 'hidden')};
`;

export const NullLenghtTask = styled.p`
    color: ${p => p.theme.mainText};
    margin: 8px;
    opacity: 0.6
`;
export const Avatar = styled.img`
    border-radius: 50%;
    width: 30px;
    height: 30px;
`;

export const Expand = styled.div`
    display: ${p => (p.visible ? 'flex' : 'none')};
    height: auto;
    min-height: 100px;
    padding: 8px 0 0 8px;
    justify-content: space-between;
`;

export const PriorityImage = styled.img`
    width: 15%;
    height: 15px;
`;

export const CommentContainer = styled.div`
    display: ${p => (p.visible ? 'block' : 'none')};
`;

export const DoneContainer = styled.div`
    display: ${p => (p.visible ? 'block' : 'none')};
`;

export const IconButton = styled(_IconButton)`
    border-radius: 40%;
`;

export const Done = styled(_Done)`
    color: green;
`;

export const Comment = styled(_Comment)`
    display: ${p => (p.visible ? 'block' : 'none')};  
`;
