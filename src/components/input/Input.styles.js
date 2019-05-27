import styled from 'styled-components';

export default styled.input`
    font-size: 20px;
    text-overflow: ellipsis;
    z-index: 5;
    margin-left: 5px;
    outline: none;
    border: ${p => (p.border ? '1px solid black !important' : 'none')};
`;
