import styled from 'styled-components';
import _DialogContentText from '@material-ui/core/DialogContentText'
import _Close from '@material-ui/icons/Close';

export const Dialog = styled.div`
    display: ${p => (p.visible ? 'flex' : 'none')}; 
`;
export const DialogContentText = styled(_DialogContentText)`
    display: flex;
    flex: auto;
    padding: 16px 16px 32px 16px;
    border: rgb(128, 128, 128, 0.1) solid 1px;
    border-radius: 8px;
`;
export const Close = styled(_Close)`    
    display: flex;
    align-self: flex-end; 
    cursor: pointer;
    padding: 0px 16px 32px 8px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 600px;
    width: 600px;
    align-items: center;
    margin-top: 16px;
`;
