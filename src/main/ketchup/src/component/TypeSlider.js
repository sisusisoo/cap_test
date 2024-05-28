import styled from "styled-components";
import { useState } from "react";
import RestaruantList from "./RestaruantList";

const Wrapper = styled.div`
  margin: 0 auto;
  padding-top: 15vh;
  font-size: 2vh;
  position: fixed; /* 요소를 고정 */
  top: 0; 
  left: 0; 
  width: 100%; /* 화면 전체 너비를 차지 */
  z-index: 2; 
  background-color: white;
`;

const Title = styled.div`
  color: #c35050;
  font-weight: bold;
  margin-left: 5vw;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 3vw;
  padding-right: 3vw;
  padding-top: 1vh; /* 위쪽에 2vh의 여백 */
  padding-bottom: 1vh; /* 아래쪽에 1vh의 여백 */
  border-bottom: 1px solid #dee2e6; /* 얇은 밑줄 추가 */
`;

const Category = styled.h5`
  color: #000;
  cursor: pointer;
  margin: 0; // 기본 마진 제거
  &.active {
    color: #c35050;
    font-weight: bold;
  }
`;

function TypeSlider() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const onCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const categories = ["All", "Korean", "Japanese", "Chinese", "Western", "Dessert"];

  return (
    <>
      <Wrapper>
        <Title>Category</Title>
        <CategoryWrapper>
          {categories.map((category, index) => (
            <Category
              key={index}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => onCategoryClick(category)}
            >
              {category}
            </Category>
          ))}
        </CategoryWrapper>
      </Wrapper>      
      <div style={{ paddingTop: "22vh" , paddingBottom: "8vh"}}> {/* 이전 Wrapper의 높이만큼 여백을 추가 */}
        <RestaruantList key={selectedCategory} type={selectedCategory} />
      </div>    </>
  );
}

export default TypeSlider;
