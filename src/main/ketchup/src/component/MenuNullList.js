import { useLocation, useParams } from "react-router-dom";
import { MdRestaurantMenu } from "react-icons/md";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { saveDataToFirebase, updateMenuInFirebase, fetchDataFromFirebase } from "../component/saveToFirebase"; // Firebase 저장 및 업데이트 함수 임포트

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

const MenuNullList = () => {
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
    const checkAndFetchData = async () => {
      const data = await fetchDataFromFirebase(key);
      if (data) {
        setDataExists(true);
        setMenu(data.menu);
        if (data.menu) {
          const menuArray = data.menu.split(",");
          setMenuItems(menuArray);
        }
      } else {
        setDataExists(false);
        saveDataToFirebase(name, placeLocation, menu);
      }
    };

    if (name && placeLocation) {
      checkAndFetchData();
    }
  }, [name, placeLocation, key, menu]);

  const gotoPicture = () => {
    const newMenu = '감자탕,닭곰탕,칼국수';
    updateMenuInFirebase(name, placeLocation, newMenu);
    setMenu(newMenu);
    setMenuItems(newMenu.split(","));
  };

  return (
    <Wrapper>
      <hr />
      <Icon />
      {!dataExists ? (
        <>
          <Text>메뉴 정보가 없습니다.</Text>
          <Side>메뉴판 사진을 찍어주세요</Side>
          <Button onClick={gotoPicture}>사진 찍기</Button>
        </>
      ) : (
        <>
          <Text>메뉴 정보:</Text>
          {menuItems.map((item, index) => (
            <MenuItem key={index}>{index + 1}. {item}</MenuItem>
          ))}
        </>
      )}
    </Wrapper>
  );
};

export default MenuNullList;



