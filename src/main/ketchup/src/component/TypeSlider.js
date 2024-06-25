import styled from "styled-components";
import { useState } from "react";
import RestaruantList from "./RestaruantList";

const Wrapper = styled.div`
  margin: 0 auto;
  padding-top: 14vh;
  font-size: 2vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 5vw;
  margin-right: 3vw;
`;

const Title = styled.div`
  color: #c35050;
  font-weight: bold;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 3vw;
  padding-right: 3vw;
  padding-top: 2vh;
  padding-bottom: 1vh;
  border-bottom: 1px solid #dee2e6;
`;

const Category = styled.h5`
  color: #000;
  cursor: pointer;
  margin: 0;
  &.active {
    color: #c35050;
    font-weight: bold;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  background-color: ${(props) => (props.active ? "#c35050" : "white")};
  border: 2px solid #c35050;
  color: ${(props) => (props.active ? "white" : "black")};
  padding: 0.5em 1.2em;
  cursor: pointer;
  font-size: 1.5vh;
`;

function TypeSlider() {
  const [state, setState] = useState({
    selectedCategory: "All",
    locationType: "me",
  });

  const onCategoryClick = (category) => {
    setState((prevState) => ({
      ...prevState,
      selectedCategory: category,
    }));
  };

  const handleButtonClick = (type) => {
    setState((prevState) => ({
      ...prevState,
      locationType: type,
    }));
  };

  const categories = ["All", "Korean", "Japanese", "Chinese", "Western", "Dessert"];

  return (
    <>
      <Wrapper>
        <Header>
          <Title>Category</Title>
          <ButtonContainer>
            <Button
              active={state.locationType === "kmu"}
              onClick={() => handleButtonClick("kmu")}
            >
              KMU
            </Button>
            <Button
              active={state.locationType === "me"}
              onClick={() => handleButtonClick("me")}
            >
              ME
            </Button>
          </ButtonContainer>
        </Header>
        <CategoryWrapper>
          {categories.map((category, index) => (
            <Category
              key={index}
              className={state.selectedCategory === category ? "active" : ""}
              onClick={() => onCategoryClick(category)}
            >
              {category}
            </Category>
          ))}
        </CategoryWrapper>
      </Wrapper>
      <div style={{ paddingTop: "22vh", paddingBottom: "8vh" }}>
        <RestaruantList
          key={state.selectedCategory}
          type={state.selectedCategory}
          locationType={state.locationType}
        />
      </div>
    </>
  );
}

export default TypeSlider;
