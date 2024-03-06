import React from 'react';
import BottomNav from '../components/common/BottomNav';
import Header from '../components/common/Header';
import Backbutton from "../components/common/Backbutton";

const Mypage = () => {
    return (
        <div>
            <Header/>
            <Backbutton/>
            <h1>마이페이지(임시)</h1>
            <BottomNav/>
        </div>
    );
};

export default Mypage;