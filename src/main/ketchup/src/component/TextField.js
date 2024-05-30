import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { database } from "../firebase_db";
import styled from "styled-components";
import PhotoField from "./PhotoField";

const ContentBox = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin-top: 4vh;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .profile {
    border-radius: 70%;
    width: 15vw;
    height: 10vh;
  }

  .name {
    color: gray;
    font-weight: bold;
  }
`;

const StyledInput = styled.input`
  height: 10vh;
  width: 95%;
  margin-top: 3vh;
  padding: 8px;
  border: none;
  font-size: 3vh;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  .cancel {
    order: 1;
    font-size: 3vh;
    border: none;
    background-color: transparent;
    color: #c35050;
    font-weight: bold;
  }

  .complete {
    order: 2;
    font-size: 3vh;
    border-radius: 5vw;
    border: none;
    background-color: #c35050;
    color: white;
  }
`;

const TextField = ({ buttonText, reviewData }) => {
  const [content, setContent] = useState(reviewData ? reviewData.content : "");
  const [image, setImage] = useState(reviewData ? reviewData.image : ""); // eslint-disable-line no-unused-vars
  const navigate = useNavigate();
  const { place_id, reviewId } = useParams(); // 식당 ID와 리뷰 ID
  const user = JSON.parse(localStorage.getItem("user"));
  const photoFieldRef = useRef();

  useEffect(() => {
    if (reviewData) {
      setContent(reviewData.content);
      setImage(reviewData.image);
    }
  }, [reviewData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 이미지가 있는지 확인
      const imageUrl = photoFieldRef.current
        ? await photoFieldRef.current.uploadImage()
        : "";
      const currentDate = new Date().toISOString();

      if (reviewId) {
        // 리뷰 수정
        await database.ref(`RestrauntReview/${reviewId}`).update({
          content: content,
          image: imageUrl,
          date: currentDate,
        });
        alert("리뷰가 수정되었습니다!");
      } else {
        // 리뷰 작성
        const newReviewRef = database.ref("RestrauntReview").push();
        await newReviewRef.set({
          content: content,
          userid: user.id,
          resid: place_id,
          image: imageUrl,
          date: currentDate,
          Rev_id: newReviewRef.key,
        });
        alert("리뷰가 등록되었습니다!");
      }

      navigate(`/main/menulist/${place_id}/reviewList`);
      setContent("");
    } catch (error) {
      console.error("리뷰 게시 중 오류가 발생하였습니다.:", error);
    }
  };

  return (
    <div>
      <ButtonGroup>
        <button className="cancel" onClick={() => navigate(-1)}>
          취소
        </button>
        <button className="complete" onClick={handleSubmit}>
          {buttonText}
        </button>
      </ButtonGroup>
      <ContentBox>
        <User>
          {user && user.profile && (
            <img className="profile" src={user.profile} alt="User Profile" />
          )}
          {user && <div className="name">@{user.nickname}</div>}
        </User>
        <form>
          <StyledInput
            placeholder="리뷰를 작성해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </form>
      </ContentBox>
      <PhotoField ref={photoFieldRef} />
    </div>
  );
};

export default TextField;
