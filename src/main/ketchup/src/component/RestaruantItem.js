import { Link } from "react-router-dom";
import styled from "styled-components";
import Star from "./Star";

// 스타일드 컴포넌트 정의
const StyledLink = styled(Link)`
  text-decoration: none;
`;

// 스타일드 컴포넌트 정의
const Container = styled.div`
  box-sizing: content-box;
  place-items: center;
  width: 100%; /* 화면에 꽉 차게 설정 */
  height: 30%;

  border-bottom: 0.3px solid #dee2e6;

  & img {
    border-radius: 10px;
    object-fit: cover;
    width: 150px;
    height: 150px;
    float: left; /* 화면에 꽉 차게 설정 */
    margin: 1%;
  }

  .name {
    margin-top: 3vh;
    font-weight: bold;
    text-align: center;
  }

  .box {
    display: flex;
    flex-direction: column;
    align-items: center;

    .star {
      display: flex;
      margin-bottom: 1vh;
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
`;

// 레스토랑 항목을 나타내는 함수형 컴포넌트
function RestaurantItem({ restaurant, distance }) {
  const {
    place_id, // 장소 id
    name,
    rating,
    user_ratings_total,
    vicinity,
    photos,
  } = restaurant;
  return (
    <>
      <Container>
        <StyledLink
          to={`/main/menulist/${place_id}?name=${name}&star=${rating}&location=${vicinity}&img=${photos}`}
        >
          <img
            src={photos ? photos[0].getUrl() : "http://via.placeholder.com/160"}
            alt={name}
          />
          <p className="name">
            {name.length > 20 ? `${name.slice(0, 20)}...` : name}
          </p>
          <div className="box">
            <div className="star">
              <Star
                rating={rating}
                color="yellow"
                style={{ fontSize: "1.5em" }}
              />
              {rating}
            </div>
            <div className="review">리뷰: {user_ratings_total}</div>
            <div className="dist">
              주소:
              {vicinity.length > 18 ? `${vicinity.slice(0, 18)}...` : vicinity}
            </div>
            <div className="dist">
              거리:{" "}
              {distance >= 1000
                ? (distance / 1000).toFixed(1) + "km"
                : distance.toFixed(0) + "m"}
            </div>
          </div>
        </StyledLink>
      </Container>
    </>
  );
}

export default RestaurantItem;
