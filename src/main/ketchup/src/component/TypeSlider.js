import Slider from "react-slick";
import "../style/slick.css";
import "../style/slick-theme.css";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react"; // useRef 추가
import RestaruantList from "./RestaruantList";

const Wrapper = styled.div`
  margin: 0 auto;
  padding-top: 15vh;
  padding-left: 10vw;
  padding-right: 10vw;
  font-size: 2vh;
`;

const Title = styled.div`
  color: #c35050;
  font-weight: bold;
`;

const Category = styled.h4`
  color: #000;

  &.active {
    color: #c35050;
    font-weight: bold;
  }
`;

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function TypeSlider() {
  const [category, setCategory] = useState("All");
  const sliderRef = useRef(null); // useRef 추가

  const settings = {
    className: "center",
    dots: false,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    slidesToScroll: 1, // 한번에 스크롤되는 슬라이드의 수를 지정하는 속성 
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current) => {
      // 변경: 슬라이드가 변경될 때 실행되는 콜백 추가
      const categoryList = ["All", "Korean", "Japanese", "Chinese", "Western", "Dessert"];
      setCategory(categoryList[current]); // 현재 슬라이드의 카테고리 선택
    },
  };

  const onCategory = (category) => {
    setCategory(category);
    let index;
    if (category === "All") {
      index = 0; // 전체 카테고리 선택 시 첫 번째 슬라이드로 이동
    } 
    else {
      index = ["Korean", "Japanese", "Chinese", "Western", "Dessert"].indexOf(category); // 선택한 카테고리의 인덱스 + 1 (첫 번째는 전체이므로)
    }
    sliderRef.current.slickGoTo(index); // 해당 카테고리가 중앙에 오도록 슬라이드 이동
  };

  return (
    <Wrapper>
      <Title>Category</Title>
      <div className="slider-container">
        <Slider ref={sliderRef} {...settings}> {/* sliderRef 추가 */}
          <div onClick={() => onCategory("All")}>
            <Category className={category === "All" ? "active" : ""}>
              All
            </Category>
          </div>
          <div onClick={() => onCategory("Korean")}>
            <Category className={category === "Korean" ? "active" : ""}>
              Korean
            </Category>
          </div>
          <div onClick={() => onCategory("Japanese")}>
            <Category className={category === "Japanese" ? "active" : ""}>
              Japanese
            </Category>
          </div>
          <div onClick={() => onCategory("Chinese")}>
            <Category className={category === "Chinese" ? "active" : ""}>
              Chinese
            </Category>
          </div>
          <div onClick={() => onCategory("Western")}>
            <Category className={category === "Western" ? "active" : ""}>
              Western
            </Category>
          </div>
          <div onClick={() => onCategory("Dessert")}>
            <Category className={category === "Dessert" ? "active" : ""}>
              Dessert
            </Category>
          </div>
        </Slider>
      </div>
      <div>
        {category && <RestaruantList key={category} type={category} />}
      </div>
    </Wrapper>
  );
}

export default TypeSlider;
