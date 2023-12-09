import React from 'react';
import styled from 'styled-components';
import BottomNav from '../components/common/BottomNav';
import Backbutton from "../components/common/Backbutton";
import Header from '../components/common/Header';
import ImageUpload from '../components/ImageUpload';

const Wrapper = styled.div`
    width: 1440px;
    height: 1024px;
`;

const Texts = styled.div`
    font-size: 70px;
    font-weight:bold;
    width:1300px;
    margin:0 auto;

`;

const UserPicture = () => {

    return (
        <Wrapper>
            <Header/>
            <Backbutton/>
            <Texts>
                <p>Please take a picture of the menu</p>
            </Texts>
            <ImageUpload />
            <BottomNav/>
        </Wrapper>
    );
};

export default UserPicture;
