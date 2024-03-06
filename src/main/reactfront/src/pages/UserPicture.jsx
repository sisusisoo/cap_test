import React from 'react';
import styled from 'styled-components';
import BottomNav from '../components/common/BottomNav';
import Backbutton from "../components/common/Backbutton";
import Header from '../components/common/Header';
import ImageUpload from '../components/ImageUpload';

const Wrapper = styled.div`
  width:100%;
  height:100%;
`;

const Texts = styled.div`
    font-size:5vw;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 800;
    text-align: center;
    margin-top:18%
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
