import { useLocation, useParams, useNavigate } from "react-router-dom";
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

const ResInfo = () => {
  const { place_id } = useParams(); // useParams로 파라미터 가져오기
  const Location = useLocation(); // useLocation() 호출, location 객체 반환
  const [soundImageSrc, setSoundImageSrc] = useState(
    "https://img.icons8.com/?size=100&id=2795&format=png&color=000000"
  );
  const navigate = useNavigate();

  // search 부분을 URLSearchParams 객체로 생성
  const params = new URLSearchParams(Location.search);

  // 쿼리 가져오기
  const name = params.get("name");
  //const img = params.get("img"); // 단일 이미지 URL로 변경
  const rating = params.get("star");
<<<<<<< HEAD
  const location = params.get("location");
  //const user_ratings_total = null;
=======
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
          const response = await axios.post('http://localhost:8080/compare-food', {
                 foodName: menu, // Set an empty string or any default value as needed
          });
          console.log(response.data);
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
>>>>>>> 0bc70600ad971915cfe9fed51c8bcd77556398fe

  const handleSoundImageClick = async () => {
    setSoundImageSrc(
      "https://img.icons8.com/?size=100&id=9982&format=png&color=000000"
    ); // 음향 이미지
    try {
      await getSpeech(name);
    } finally {
      setSoundImageSrc(
        "https://img.icons8.com/?size=100&id=2795&format=png&color=000000"
      );
    }
  };

  //리뷰리스트 페이지 이동시 id 데이터도 함께 전달
  const gotoReviewList = () => {
    navigate(`/main/menulist/${place_id}/reviewList`);
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
          <Star rating={rating} color="yellow" style={{ fontSize: "1.5em" }} />{" "}
          &nbsp;{rating}
        </div>
        <p className="location">
          <FaLocationDot /> {location}
        </p>
        <ReviewButton onClick={gotoReviewList}>Review{">"}</ReviewButton>
      </Container>
    </Wrapper>
  );
};

export default ResInfo;
