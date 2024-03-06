import GetUserLocation from "../components/getUserLocation";
import styled from 'styled-components';
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/common/BottomNav";
import Header from "../components/common/Header";
import Backbutton from "../components/common/Backbutton";

const Wrapper = styled.div`
   width: 100%;
`;

const Texts = styled.div`
    width: 100%;
    margin-top:8vh;
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-size: 4vw;
    line-height: 26px;
    color: #111010;
    line-height: 1;

`;

const Inputs = styled.input`
    box-sizing: border-box;
    width: 100%;
    height: 4vh;
    margin:2% 0 3% 0;
    border: 1px solid #000000;
    border-radius: 10px;
    font-size:4vw;

    @media (min-width:900px) {
        height:100px;
    }


`;

const SmallBox = styled.div`
    display:flex;
`;

const Halal = styled.div`
    flex:1;
    margin:4vw 0 0 4vw;

    img {
        width:20vw;
        height:100%;
        object-fit:fill;
    }

`;

const Vegun = styled.div`
    flex:1;
    margin:5vw 0 0 4vw;

    img {
        width:20vw;
        height:100%;
        object-fit:fill;
    }
`;

const Spicy = styled.div`
   flex:1;
   margin:5vw 0 0 4vw;
   img {
        width:20vw;
        height:100%;
        object-fit:fill;
    }

`;

const Dessert = styled.div`
   flex:1;
   margin:5vw 0 0 4vw;
   img {
        width:20vw;
        height:100%;
        object-fit:fill;

    }
`;

const BigBox =styled.div`
    display:flex;
`;

const Inside = styled.div`
   flex:1;
   margin:10vw 0 2vw 4vw;
   img {
        width:40vw;
        height:100%;
        object-fit: fill;
    }

`;

const Outside = styled.div`
   flex:1;
   margin:10vw 0 2vw 4vw;
   img {
        width:40vw;
        height:100%;
        object-fit: fill;
    }
`;

const UserLocation = styled.div`
    float:left;
    margin:-1vh 0 0 3vw;
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    font-size: 5vw;
    line-height: 15px;
    color: #A08E8E;
`;

const LocationIcon = styled(FaLocationDot)`
  margin-top:1vw;
  float:left;
  width:4vw;
  height:4vh;
  color:grey;

  @media (min-width:700px){
    width:10vw;
    height:10vh;
  }

`;


const Main = () => {
    const outside = "/img/outsidereas.png";
    const inside = "/img/insiderest.png";
    const halal = "/img/HalalFood.png";
    const spicy = "/img/SpicyFood.png";
    const vegun = "/img/VegunFood.png";
    const dessert = "/img/dessert.png";

    const navigate = useNavigate();

    const gotoPicture = () => {
        navigate("picture");
    }

    const gotoMap = () => {
        navigate("map");
    }
   const gotoTest = () => {
            navigate("FileData");
        }


    return (
        <>
         <Header/>
         <Backbutton/>
        <Wrapper>
            <Texts>
                <h1>what would you like to eat today?</h1>
            </Texts>
            <LocationIcon>
                <FaLocationDot size="22" color="grey" />
            </LocationIcon>
            <UserLocation>
                <GetUserLocation />
            </UserLocation>
            <div>
                <Inputs placeholder="Restruant, cuisines, dishes"></Inputs>

            </div>
            <SmallBox>
                <Halal>
                    <img src={halal} onClick={gotoTest} alt=" "/>
                 </Halal>
                <Vegun>
                    <img src={vegun} alt=" "/>
                </Vegun>
                <Spicy>
                    <img src={spicy} alt=" " />
                </Spicy>
                <Dessert>
                    <img src={dessert} alt=" "/>
                </Dessert>

            </SmallBox>

            <BigBox>
                <Outside>
                    <img src={outside} onClick={gotoMap} alt=' ' />
                </Outside>
                <Inside>
                    <img src={inside} onClick={gotoPicture} alt=' '/>
                </Inside>

            </BigBox>
            <BottomNav />
        </Wrapper>
        </>


    );
};
export default Main;