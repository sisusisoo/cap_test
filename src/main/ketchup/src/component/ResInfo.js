import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Star from "./Star";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
import { getSpeech } from "./TTS";

// 스타일드 컴포넌트 정의
const Wrapper = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 4vh;
  padding-bottom: 2vh;
  justify-content: center;
  align-content: center;
`;
const Image = styled.img`
  width: 90%;
  height: 36vh;
  margin-top: 2vh;
  border-radius: 10%;
`;
const SoundImage = styled.img`
  width: 10%;
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
    margin-left: 25vw;

  }

  .location {
    text-align: center;
    margin-top: 3vh;
  }

`;

const ResInfo = () => {
  const { place_id } = useParams(); // useParams로 파라미터 가져오기
  const Location = useLocation(); // useLocation() 호출, location 객체 반환
  const [soundImageSrc, setSoundImageSrc] = useState("https://img.icons8.com/?size=100&id=2795&format=png&color=000000");

  // 현재 경로가 '/main/menulist/'인지 확인하여 렌더링 여부 결정
  if (!Location.pathname.startsWith("/main/menulist/")) {
    return null;
  }
  // search 부분을 URLSearchParams 객체로 생성
  const params = new URLSearchParams(Location.search);

  // 쿼리 가져오기
  const name = params.get("name");
  const img = params.get("img"); // 단일 이미지 URL로 변경
  const rating = params.get("star");
  const location = params.get("location");
  const user_ratings_total = null;


  const handleSoundImageClick = async () => {
    setSoundImageSrc("https://img.icons8.com/?size=100&id=9982&format=png&color=000000"); // 음향 이미지
    try {
      await getSpeech(name);
    } 
    finally {
      setSoundImageSrc("https://img.icons8.com/?size=100&id=2795&format=png&color=000000");
    }
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
          <Star rating={rating} color="yellow" style={{ fontSize: "1.5em" }} /> &nbsp;{rating}
        </div>
        <p className="location">
          <FaLocationDot /> {" "}{location}
        </p>
      </Container>
    </Wrapper>
  );
}

export default ResInfo;
