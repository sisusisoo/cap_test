//메뉴판 재구성 아이템
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import { getSpeech } from "./TTS";

const Box = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  padding: 20px;
  max-width: 300px;
  transition: transform 0.2s;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  overflow: hidden;
  display: flex;
  border-radius: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* 수평 중앙 정렬 */
  text-align: center; /* 텍스트를 가운데 정렬 */
  margin: 20px; /* 마진 추가 */
`;

const Name = styled(Link)`
  font-size: 1.5rem;
  color: #c35050; /* 색상 설정 */
  font-weight: bold; /* 글자 굵게 설정 */
  text-align: center; /* 텍스트를 가운데 정렬 */
  flex: 1; /* 남은 공간을 차지하여 중앙 정렬 */
  margin-right: 10px; /* 이름과 아이콘 사이의 간격 조정 */
`;

const SoundImage = styled.img`
  width: 30px;
  cursor: pointer;
`;
const CollapsibleDescription = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? '1000px' : '100px')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;

`;

const Description = styled.p`
  font-size: 1rem;
  color: #6d6b6b;
  margin: 0;
  line-height: 1.5;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #c35050;
  font-size: 2rem;
  padding: 10px 0; /* 위아래로 각각 10px의 여백 */
`;

const Icon = styled.span`
  display: inline-block;
  margin-right: 5px;
  font-size: 2rem;
  color: #c35050; // 아이콘의 색상

`;

const MinusIcon = styled(MdRemove)``;
const PlusIcon = styled(MdAdd)``;

const RestructureItem = ({ food }) => {
  const [soundImageSrc, setSoundImageSrc] = useState("https://img.icons8.com/?size=100&id=2795&format=png&color=000000");
  const handleSoundImageClick = async () => {
    setSoundImageSrc("https://img.icons8.com/?size=100&id=9982&format=png&color=000000"); // 음향 이미지
    try {
      await getSpeech(foodname);
    }
    finally {
      setSoundImageSrc("https://img.icons8.com/?size=100&id=2795&format=png&color=000000");
    }
  };
  const {
    id = 1,
    base64Image = "",
    foodcalcium = 0,
    foodcalorie = 0,
    foodcarbohydrate = 0,
    foodfat = 0,
    foodimagepath = "",
    foodingredient = "",
    foodiron = 0,
    foodname = "",
    foodpotassium = 0,
    foodprofile = "",
    foodprotein = 0,
    foodsalt = 0,
    foodsugars = 0
  } = food || {};

  console.log(food);

  // 각 음식 설명의 접기/펼치기 상태를 관리하는 useState 훅 사용.
  const [expanded, setExpanded] = useState({});

  const toggleDescription = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  return (
    <Box key={id}>
      <ImageWrapper>
        <Image src={base64Image ? base64Image[0].getUrl() : 'http://via.placeholder.com/200'} alt={foodname} />
      </ImageWrapper>
      <NameWrapper>
        <Name to={`/main/picture/restructure/detail/${id}`}>
          {foodname}
        </Name>
        <SoundImage src={soundImageSrc} onClick={handleSoundImageClick} />
      </NameWrapper>
      {/* CollapsibleDescription을 사용하여 설명을 감싸고, 접기/펼치기 버튼을 추가합니다. */}
      <CollapsibleDescription isOpen={expanded[id]}>
        <Description onClick={() => toggleDescription(id)}>{foodprofile}</Description>
      </CollapsibleDescription>
      {/* 접기/펼치기 버튼을 클릭할 때 해당 음식 설명의 상태를 변경합니다. */}

      <ToggleButton onClick={() => toggleDescription(id)}>
        {expanded[id] ?
          <Icon><MinusIcon /></Icon> :
          <Icon><PlusIcon /></Icon>
        }
      </ToggleButton>
    </Box>
  );
};


export default RestructureItem;