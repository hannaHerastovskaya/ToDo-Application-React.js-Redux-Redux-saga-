/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const TrashTaskOneList = styled.div`
    background-image: url(../../../../image/trash.svg);
    width: 20px;
    height: 20px;
    cursor: pointer;
    &:hover{
        animation: 1.2s ease-in-out 0s normal none infinite running trambling-animation;
    }
    @keyframes trambling-animation {
        0%, 50%, 100% {
            transform: rotate(0deg);
        }
        10%, 30% {
            transform: rotate(-10deg);
        }
        20%, 40% {
            transform: rotate(10deg);
        }
    }
`;
