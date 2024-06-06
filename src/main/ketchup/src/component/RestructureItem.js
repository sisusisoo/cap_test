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
  width: 300px; /* 고정 너비 설정 */
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

const PlusIcon = styled(MdAdd)``;
const MinusIcon = styled(MdRemove)``;

const AccordionContent = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  p {
    font-size: 1.0rem; /* 글자 크기 더 작게 설정 */
    color: #6d6b6b;
    margin: 0;
    line-height: 1.5;
  }
`;

const RestructureItem = ({ food }) => {
  const [soundImageSrc, setSoundImageSrc] = useState("https://img.icons8.com/?size=100&id=2795&format=png&color=000000");
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <Box key={id}>
      {/* 음식 이미지 */}
      <ImageWrapper>
        <Image src={base64Image ? base64Image[0].getUrl() : 'http://via.placeholder.com/200'} alt={foodname} />
      </ImageWrapper>

      {/* 음식 이름과 소리 이미지 */}
      <NameWrapper>
        <Name to={`/main/picture/restructure/detail/${id}`}>
          {foodname}
        </Name>
        <SoundImage src={soundImageSrc} onClick={handleSoundImageClick} />
      </NameWrapper>

      {/* 음식 설명 */}
      {!isOpen && <Description>{foodprofile}</Description>}

      {/* 아코디언 콘텐츠 */}
      {isOpen && (
        <AccordionContent isOpen={isOpen}>
          <p>calorie: {foodcalorie} kcal</p>
          <p>protein: {foodprotein} g</p>
          <p>fat: {foodfat} g</p>
          <p>carbohydrate: {foodcarbohydrate} g</p>
          <p>sugars: {foodsugars} g</p>
          <p>calcium: {foodcalcium} mg</p>
          <p>iron: {foodiron} mg</p>
          <p>potassium: {foodpotassium} mg</p>
          <p>salt: {foodsalt} g</p>
        </AccordionContent>
      )}

      {/* + 버튼 */}
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        <Icon>{isOpen ? <MinusIcon /> : <PlusIcon />}</Icon>
      </ToggleButton>


    </Box>
  );
};

export default RestructureItem;