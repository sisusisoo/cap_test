import React from 'react';
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Profile from '../components/Profile';
import Nutrition from '../components/Nutrition';
import Receipe from '../components/Receipe';
import BottomNav from '../components/common/BottomNav';
import Header from "../components/common/Header";
import Backbutton from "../components/common/Backbutton";

const DetailBlock = styled.div`
    margin: 0 auto;
    text-align: center;
    img {
        display:block;
        width: 90vw;
        height: 30vh;
        border-radius: 10px;
    }

    button {
        border: 3px solid #fff;
        border-radius: 5px;
        color: black;
        font-size:5vw;
        margin:1vw;
        border:none;
        background-color:black;
        color:white;
        padding: 0.25rem 1rem;
        &:hover {
            background-color:pink;
        };

    }
`;

const ButtonGroup = styled.div`
   button {
    & + & {
            margin-left:10rem;
            margin-top:2rem;
        }
    }
`;

const MenuDetail = () => {
    //useParams를 통해 URL에서 추출한 id 가져오기 
    const {id} = useParams();
    const [food, setFood] = useState({});
    const [error, setError] = useState(null);
    const [content, setContent] = useState(null);


    useEffect(() => {
        const getData = async() => {
            try {
            //수정~~~~~~~~~~~~~~~~~
                const response = await axios.get(`http://localhost:8080/food/${id}`);
                setFood(response.data);
            }catch(error) {
                setError(error);
            }
        };
        getData();
    },[id]);

    if(error) {
        return <div>Error:{error.message}</div>
    };

    if(!food) {
      return <div>Loading...</div>;
    }

    const ButtonClick = (type) => {
        if(type === "profile") {
            setContent("profile");
        }else if (type === "nutrition") {
            setContent("nutrition");
        }else if(type === "receipe") {
            setContent("receipe");
        }
    };

    return (
        <>
            <Header/>
            <Backbutton/>
            <DetailBlock>
             <>
                <h2>{food.id}</h2>
                <img src={food.FoodImage} alt={food.caption} />
                <h1>{food.FoodName}</h1>
             </>
            <div>
            <ButtonGroup>
                <button onClick={()=>ButtonClick("profile")}>description</button>
                <button onClick={()=>ButtonClick("nutrition")}>nutrition</button>
                <button onClick={()=>ButtonClick("receipe")}>Receipe</button>
                {content === 'profile' && <Profile food={food} />}
                {content === 'nutrition' && <Nutrition food={food} />}
                {content === 'receipe' && <Receipe/>}
            </ButtonGroup>
            </div>
            <BottomNav />

          </DetailBlock>
        </>
        );
}

export default MenuDetail;