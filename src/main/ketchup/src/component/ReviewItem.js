import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid #444343;
  padding: 2vh;
  padding-bottom: 3vh;
  margin-top: 3vh;

  & + & {
    margin-top: 3vh;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const Profile = styled.img`
  border-radius: 70%;
  width: 15vw;
  height: 8vh;
  margin-right: 10px;
`;

const Datestyle = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 2vh;
`;

const Name = styled.div`
  color: #bfb4b4;
`;

const ReviewImage = styled.img`
  width: 100%;
  height: 20vh;
  object-fit: cover;
  padding-top: 2vh;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1vh;
  margin-top: 2vh;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.5vh 2vh;
  border: none;
  border-radius: 2vh;
  background-color: #c35050;
  color: white;
  font-size: 2vw;

  &:hover {
    background-color: #a33d3d;
  }
`;

const ReviewItem = ({ review, writer, loggedInUser, onReviewDelete }) => {
  const user = writer.find((user) => user.id === review.userid);
  const [deleted, setDeleted] = useState(false); // 삭제 여부 상태
  const navigate = useNavigate();

  // 리뷰 삭제
  const handleDelete = () => {
    onReviewDelete(review.Rev_id);
    setDeleted(true);
  };

  if (deleted) {
    return null;
  }

  // 리뷰 수정 페이지로 이동
  const handleUpdate = () => {
    navigate(
      `/main/menulist/${review.resid}/reviewList/update/${review.Rev_id}`
    );
  };

  // 글 작성 시간 계산 함수 (몇 분 전 / 몇 시간 전 / 몇 일 전)
  // 작성 시간 계산
  const detailDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    const today = new Date(); // 현재 시간
    const postingDate = new Date(dateString); // 작성일자

    const timeDiff = today.getTime() - postingDate.getTime(); // 시간 차이 (밀리초 단위)
    const minutesDiff = Math.floor(timeDiff / (1000 * 60)); // 분 차이
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60)); // 시간 차이
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // 일자 차이

    if (minutesDiff < 2) {
      return "방금전";
    }
    // 작성한지 1시간 미만
    if (minutesDiff < 60) {
      return minutesDiff + "분 전";
    }

    // 작성한지 1시간 이상 ~ 하루 이내
    if (hoursDiff < 24) {
      return hoursDiff + "시간 전";
    }

    // 작성한지 하루 이상
    return daysDiff + "일 전";
  };

  // 업로드 시간 가공
  const nowDate = detailDate(review.date);

  return (
    <Container>
      <User>
        <div>{user && <Profile src={user.profile} alt="" />}</div>
        <Name>
          {"@"}
          {user && user.nickname}
        </Name>
      </User>
      <Datestyle>{nowDate}</Datestyle>
      <div>{review.content}</div>
      {review.image && <ReviewImage src={review.image} alt="" />}
      {loggedInUser && loggedInUser.id === review.userid && (
        <ButtonGroup>
          <Button onClick={handleUpdate}>수정</Button>
          <Button onClick={handleDelete}>삭제</Button>
        </ButtonGroup>
      )}
    </Container>
  );
};

export default ReviewItem;
