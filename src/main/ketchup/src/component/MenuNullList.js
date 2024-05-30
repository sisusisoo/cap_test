import { useNavigate } from "react-router-dom";
import { MdRestaurantMenu } from "react-icons/md";
import styled from "styled-components";

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
const MenuNullList = () => {
  const navigate = useNavigate();

  const gotoPicture = () => {
    navigate("/main/picture");
  };

  return (
    <Wrapper>
      <hr />
      <Icon />
      <Text>메뉴 정보가 없습니다.</Text>
      <Side>메뉴판 사진을 찍어주세요</Side>
      <Button onClick={gotoPicture}>사진 찍기</Button>
    </Wrapper>
  );
};

export default MenuNullList;
