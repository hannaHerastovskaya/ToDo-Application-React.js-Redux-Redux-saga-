/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import _AlertIcon from '@material-ui/icons/Share';

export const AlertIcon = styled(_AlertIcon)`
    margin: 16px 24px 16px 24px;
    color: grey;
    width: 20px !important;
    height: 20px !important;
`;

export const users = styled.div`
    display: ${props => (props.search === '' ? 'none' : 'flex')};
    flex: auto;
    cursor: pointer;
    overflow: auto;
    position: absolute;
    flex-direction: column;
    height: 50px;
    z-index: 60;
    top: 140px;
    left: 16px;
    right: 16px;
    padding: 8px;
    background: ${p => p.theme.backgroundList};
    opacity: 0.9;
    border: rgb(128, 128, 128, 0.1) solid 1px;
    border-radius: 8px;
`;
