import styled from 'styled-components';
import _SearchIcon from '@material-ui/icons/Search';

export const SearchCont = styled.div`
    display: flex;
    height: 52px;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
    box-shadow: 0 0  4px 0 rgba(0,0,0,0.2);
    border-radius: 4px;
    margin-top: 6px;
    padding: 0px 8px;
`;

export const SearchIcon = styled(_SearchIcon)`
    width: 4%;
    margin: auto;
    color: rgba(0, 0, 0, 0.54);
`;
