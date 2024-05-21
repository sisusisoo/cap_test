import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

// 링크 스타일 컴포넌트 정의
const StyledLink = styled(Link)`
  text-decoration: none; /* 링크에 대한 밑줄 제거 */
`;

const Container = styled.div`
  box-sizing: content-box;
  border-radius: 30px;
  place-items: center;
  border: 1px solid #dee2e6;

  & img {
    border-radius: 30px;
    object-fit: cover; /* 수정된 부분 */
    width: 100%; /* 추가된 부분 */
    height: 100%; /* 추가된 부분 */
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
      margin-top: 2.0em; /* 아이콘과 텍스트 사이의 간격 조정 */
      margin-bottom: 0.8em; /* 아이콘과 텍스트 사이의 간격 조정 */
      display: flex;
      align-items: center;
    }

    .dist,
    .phone,
    .review {
      text-align: center;
      font-size: 0.8em; /* 더 작은 글자 크기 */
    }

    .dist {
      color: black; /* 검정색으로 변경 */
    }

    .phone {
      color: #444; /* 조금 진한 회색 */
    }

    .review {
    }
  }

  //컴포넌트간 간격
  & {
    border-top: 1px solid #dee2e6;
    margin: 2vh;
  }
`;

function RestaruantItem({ restaurant }) {
  // item에서 필요한 정보 추출
  const { place } = restaurant;
  const {
    //address_name = null,
    //category_group_code = null,
    //category_group_name,
    //category_name,
    id,
    phone,
    place_name,
    distance,
    //place_url,
    //road_address_name
  } = place;

  const star = null;
  const review = null;
  const img = null;
  const food = null;

  return (
    <StyledLink
      to={`/main/menulist/${id}?name=${place_name}&star=${star}&location=${distance}&img=${img}&food=${food}`}
    >
      <Container>
        <img src={img || "http://via.placeholder.com/160"} alt={place_name} />
        <p className="name">{place_name.length > 8 ? `${place_name.slice(0, 7)}...` : place_name}</p>
        <div className="box">
          <p className="star">
            <FaStar color="yellow" style={{ fontSize: "1.5em" }} />
            {star}
          </p>
          <div className="review">리뷰:{review}</div>
          <div className="dist">거리:{distance}m</div>
          <div className="phone">번호:{phone}</div>
          <div></div>
        </div>
      </Container>
    </StyledLink>
  );
}

export default RestaruantItem;
