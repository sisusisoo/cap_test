import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Star from "./Star";
import { FaLocationDot } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { getSpeech } from "./TTS";
import { saveToFirebase, updateMenuInFirebase, checkIfDataExists, getDataFromFirebase } from "../component/saveToFirebase"; // Firebase 저장 및 업데이트 함수 임포트

// 스타일드 컴포넌트 정의
const Wrapper = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 4vh;
  padding-bottom: 2vh;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  width: 90%;
  height: 36vh;
  margin-top: 2vh;
  border-radius: 10%;
`;
const SoundImage = styled.img`
  width: 10%;
  cursor: pointer;
`;
const Container = styled.div`
  position: absolute;
  background-color: white;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -90%);
  border: 1px solid black;
  width: 80%;
  padding: 2vw;
  padding-bottom: 6vh;

  .id {
    display: none; //id 숨기기
  }

  .name-sound {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3vh;
  }

  .name-sound .name {
    margin-right: 8px; /* SoundImage와 이름 사이의 간격 조절 */
    font-weight: bold;
    font-size: 6vw;
  }

  .star {
    display: flex;
    text-align: center;
    margin-top: 3vh;
    justify-content: center;
  }

  .location {
    text-align: center;
    margin-top: 3vh;
  }
`;

const ReviewButton = styled.button`
  background-color: transparent;
  position: absolute;
  bottom: -4vh;
  right: -2vw;
  margin: 10vw;
  padding: 1vw 1vw;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 4vw;
  color: #c35050;
`;

const UpdateMenuButton = styled.button`
  background-color: #4CAF50;
  color: white;
  font-size: 4vw;
  margin-top: 5vh;
  padding: 1vw 3vw;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ResInfo = () => {
  const { place_id } = useParams();
  const location = useLocation();
  const [soundImageSrc, setSoundImageSrc] = useState(
    "https://img.icons8.com/?size=100&id=2795&format=png&color=000000"
  );
  const [menu, setMenu] = useState(null); // menu 상태 추가
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const name = params.get("name");
  const rating = params.get("star");
  const placeLocation = params.get("location");

  const key = `${name}-${placeLocation}`;

  useEffect(() => {
    const checkAndSaveData = async () => {
      const exists = await checkIfDataExists(key);
      if (exists) {
        const data = await getDataFromFirebase(key);
        setMenu(data.menu); // 데이터가 존재하면 menu 상태 업데이트

        // menu 문자열을 배열로 변환하고 콘솔에 출력
        if (data.menu) {
          const menuArray = data.menu.split(",");
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

  const handleSoundImageClick = async () => {
    setSoundImageSrc(
      "https://img.icons8.com/?size=100&id=9982&format=png&color=000000"
    );
    try {
      await getSpeech(name);
    } finally {
      setSoundImageSrc(
        "https://img.icons8.com/?size=100&id=2795&format=png&color=000000"
      );
    }
  };

  const gotoReviewList = () => {
    navigate(`/main/menulist/${place_id}/reviewList`);
  };

  const handleUpdateMenuClick = () => {
    const newMenu = '감자탕,닭곰탕,칼국수';
    updateMenuInFirebase(name, placeLocation, newMenu);
    setMenu(newMenu); // 상태 업데이트
  };

  return (
    <Wrapper>
      <Image src={"http://via.placeholder.com/160"} alt={name} />
      <Container>
        <p className="id">{place_id}</p>
        <div className="name-sound">
          <div className="name">{name}</div>
          <SoundImage src={soundImageSrc} onClick={handleSoundImageClick} />
        </div>
        <div className="star">
          <Star rating={rating} color="yellow" style={{ fontSize: "1.5em" }} />
          &nbsp;{rating}
        </div>
        <p className="location">
          <FaLocationDot /> {placeLocation}
        </p>
        {menu && <p className="menu">Menu: {menu}</p>} {/* 메뉴 표시 */}
        <ReviewButton onClick={gotoReviewList}>Review{">"}</ReviewButton>
        <UpdateMenuButton onClick={handleUpdateMenuClick}>Update Menu</UpdateMenuButton>
      </Container>
    </Wrapper>
  );
};

export default ResInfo;
