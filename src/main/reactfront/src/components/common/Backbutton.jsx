import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdArrowRoundBack } from "react-icons/io";



const Button = styled.button`
    position:fixed;
    left: 0.84px;
    top: 107.95px;
    background-color: white;
    border:none;

`;
const Backbutton = () => {
    const navigate = useNavigate();

    const BackClick = () => {
        navigate(-1);
    }
    return (
        <div>
            <Button onClick={BackClick}><IoMdArrowRoundBack size={80} color="#F4F0EB"/></Button>
        </div>
    );
};

export default Backbutton;