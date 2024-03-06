import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import MenuItem from '../components/MenuItem';
import BottomNav from '../components/common/BottomNav';
import Header from "../components/common/Header";
import Backbutton from "../components/common/Backbutton";

const MenuBlock = styled.div`
    .logo {
        img {
            margin: 0 auto;
            display: flex;
            width: 30vw;
            height: 10vh;
        }
    }

    .text {
        h1 {
            width:100%;
            text-align:center;
            display: block;
            margin:2vw;
            font-family: 'IBM Plex Mono';
            font-style: normal;
            font-weight: 400;
            font-size: 8vw;
        }
    }


`;
const MenuList = () => {
    const imogi = "/img/imogimenu.png";
    const [menu, setMenu] = useState([]);

    //API 요청이 대기 중인지 판별
    //요청이 대기 중일때는 true, 요청이 끝나면 false
    const [loading, setLoading] = useState(false);

    const getMenu = async() => {
     setLoading(true);
     try{
         //axios.get()을 사용하여 데이터 가져오기
         const response = await axios.get(`http://localhost:3001/food`);
         setMenu(response.data);
     } catch(error) {
         console.log('Error fetching data:',error);
       }
       setLoading(false);
     }

    useEffect(()=>{
     getMenu();
    },[]);

    //대기 중일때
    if(loading) {
        return <div>대기 중...</div>;
    }

    //menu값이 유효할 때
    return (
        <>
        <Header/>
        <Backbutton/>
        <MenuBlock>
            <div className="logo">
                <img src={imogi} alt=""/>
            </div>

            <div className="text">
                <h1>This is the menu of the Resutraunt</h1>
            </div>
            <div>
                 <>
                 {menu.map((food) => (
                     <Link key={food.id} to={`/login/main/picture/menu/detail/${food.id}`}>
                         <MenuItem key={food.id} food={food} />
                    </Link>
                ))}
                </>
            </div>
            <BottomNav />
        </MenuBlock>
    </>
    );
};


export default MenuList;