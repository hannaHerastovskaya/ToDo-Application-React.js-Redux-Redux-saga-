import styled from 'styled-components';

export const Profile = styled.div`
    display: flex;
    overflow: auto;
    flex-direction:column;
    background: ${p => p.theme.backgroundList};
    margin: 8px;
`;

export const GreetingUser = styled.div`
    display: flex;
    flex-direction: row;
    flex:auto;
    position: relative;
    align-items: flex-end;
    border-bottom: 1px solid whitesmoke;
`;

export const Avatar = styled.img`
    border-radius: 50%;
    padding: 8px;
`;

export const DeleteProfile = styled.div`
    display: flex;
    margin: 8px;
    min-width: 80px;
`;

export const ContainerButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0px 8px 0px auto;
`;

export const EditButton = styled.div`
    display: flex;
    order: 999;
    margin: 8px 8px 8px auto;
`;

export const CurrentUser = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    & > div{
        font-size: 20px;
        margin: 8px;
        font-weight: bold;
        color:${p => p.theme.mainText};
        cursor: default;
    }
`;

export const Info = styled.div`
    display: flex;
    flex-direction:column;
    flex:auto;
`;

export const EditProfile = styled.div`
    display: flex;
    font-weight: bold;
    margin-left: 8px;
    & > p{
        width: 30%;
        color:${p => p.theme.mainText};
        cursor: default;
    }
    & > input{
         border-bottom: 1px solid gray !important;
         outline: none;
         cursor: pointer;
    }
`;

export const Statistics = styled.div`
    display: flex;
    flex-direction:column;
    font-weight: bold;
    margin-left: 8px;
    & > p{
        width: 30%;
        color:${p => p.theme.mainText};
        cursor: default;
    }
    & > h1{
        width: 30%;
        color:${p => p.theme.mainText};
        cursor: default;
    }
    & > input{
         border-bottom: 1px solid gray !important;
         outline: none;
         cursor: pointer;
    }
`;
