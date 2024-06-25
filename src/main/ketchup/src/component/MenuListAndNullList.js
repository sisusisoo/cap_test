import { useLocation, useParams } from "react-router-dom";
import { MdRestaurantMenu } from "react-icons/md";
import styled from "styled-components";
import { useState, useEffect } from "react";
import RestructureItem from "./RestructureItem";
import ImageUploadCustom from "./ImageUploadCustom";
import axios from "axios";
import { saveToFirebase, updateMenuInFirebase, checkIfDataExists, getDataFromFirebase,checkIfMenuExists } from "../component/saveToFirebase"; // Firebase 저장 및 업데이트 함수 임포트
import { DeployIP,DevIP } from "../DeploySetting"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Icon = styled(MdRestaurantMenu)`
  font-size: 9vh;
  margin: 2vh;
  color: #d5d0d0;
`;

const Text = styled.div`
  font-size: 4vh;
  font-weight: bold;
  margin: 2vh;
`;

const Side = styled.div`
  font-size: 2.5vh;
  color: #d5d0d0;
  margin: 2vw;
`;

const Button = styled.button`
  border-radius: 3vh;
  border: none;
  background-color: #c35050;
  color: white;
  font-size: 6vw;
  margin: 4vh;
  padding: 2vh;
  width: 20vh;
`;

const MenuItem = styled.div`
  font-size: 3vh;
  margin: 1vh 0;
`;

const MenuListAndNullList = () => {
  const { place_id } = useParams();
  const location = useLocation();
  const [menu, setMenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [dataExists, setDataExists] = useState(false); // 데이터 존재 여부 상태 추가

  const params = new URLSearchParams(location.search);
  const name = params.get("name");
  const placeLocation = params.get("location");

  const key = `${name}-${placeLocation}`;

  useEffect(() => {
    const checkAndSaveData = async () => {
      const exists = await checkIfDataExists(key);
      const existsMenu = await checkIfMenuExists(key);
      if (exists && existsMenu) {
        setDataExists(true);
        const data = await getDataFromFirebase(key);
        setMenu(data.menu); // 데이터가 존재하면 menu 상태 업데이트

        // menu 문자열을 배열로 변환하고 콘솔에 출력
        if (data.menu) {
          const menuArray = data.menu.split(",");
          console.log(menu);
          const response = await axios.post(DevIP+'/compare-food', {
                 foodName: menu, // Set an empty string or any default value as needed
          });
          console.log(response.data);
          setMenuItems(response.data);
          menuArray.forEach((item, index) => {
            console.log(`Menu item ${index + 1}: ${item}`);
          });
        }
      } else {
        saveToFirebase(name, placeLocation, menu);
      }
    };

    if (name && placeLocation) {
      checkAndSaveData();
    }
  }, [name, placeLocation, key, menu]);

  //일단 안씀 
  const gotoPicture = () => {
    const newMenu = '감자탕,닭곰탕,칼국수';
    updateMenuInFirebase(name, placeLocation, newMenu);
    setMenu(newMenu);
    setMenuItems(newMenu.split(","));
  };

  return (
    <Wrapper>
      {dataExists ? (
        <>
          {menuItems.map((food, index) => (
            <RestructureItem key={index} food={food} />
          ))}
        </>
      ) : (
        <>
          <Text>메뉴 정보가 없습니다.</Text>
          <Side>메뉴판 사진을 찍어주세요</Side>
          <ImageUploadCustom/>
        </>
      )}
    </Wrapper>
  );
};

export default MenuListAndNullList;



