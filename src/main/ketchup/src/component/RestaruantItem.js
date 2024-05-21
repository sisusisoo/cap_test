import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

// 스타일드 컴포넌트 정의
const StyledLink = styled(Link)`
  text-decoration: none;
`;

// 스타일드 컴포넌트 정의
const Container = styled.div`
  box-sizing: content-box;
  border-radius: 30px;
  place-items: center;
  border: 1px solid #dee2e6;
  width: 160px;


  & img {
    border-radius: 30px;
    object-fit: cover;
    width: 160px;
    height: 160px;
  }

  .name {
    font-weight: bold;
    margin-bottom: -1vw;
    text-align: center;
  }

  .box {
    display: flex;
    flex-direction: column;
    align-items: center;

    .star {
      margin-top: 2.0em;
      margin-bottom: 0.8em;
      display: flex;
      align-items: center;
    }

    .dist,
    .phone,
    .review {
      text-align: center;
      font-size: 0.8em;
    }

    .dist {
      color: black;
    }

    .phone {
      color: #444;
    }
  }

  & {
    border-top: 1px solid #dee2e6;
    margin: 2vh;
  }
`;

// 레스토랑 항목을 나타내는 함수형 컴포넌트
function RestaurantItem({ restaurant, distance }) {
  // props로 전달된 레스토랑 정보를 추출
  const {
    id,
    name,
    rating,
    user_ratings_total,
    vicinity,
    geometry,
    photos,
  } = restaurant;

  // 레스토랑의 위치 정보 추출
  const { location } = geometry;

  return (
    <StyledLink
      to={`/main/menulist/${id}?name=${name}&rating=${rating}&total_ratings=${user_ratings_total}&address=${vicinity}`}
    >
      <Container>
        <img src={photos ? photos[0].getUrl() : "http://via.placeholder.com/160"} alt={name} />
        <p className="name">{name.length > 8 ? `${name.slice(0, 7)}...` : name}</p>
        <div className="box">
          <p className="star">
            <FaStar color="yellow" style={{ fontSize: "1.5em" }} />
            {rating}
          </p>
          <div className="review">리뷰: {user_ratings_total}</div>
          <div className="dist">주소: {vicinity}</div>
          <div className="dist">
            거리: {distance >= 1000 ? (distance / 1000).toFixed(1) + "km" : distance.toFixed(1) + "m"}
          </div>
        </div>
      </Container>
    </StyledLink>
  );
}

export default RestaurantItem;
