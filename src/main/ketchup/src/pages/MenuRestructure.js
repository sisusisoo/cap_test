import React from 'react';
import RestructureItem from "../component/RestructureItem";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  border-bottom: 1px solid #dee2e6;
  z-index: 3;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3vh;
  font-weight: bold;
  color: #c35050;
`;

const BodyContainer = styled.div`
  flex: 1;
  margin-top: 7vh; /* Ensure content starts below the header */
  padding-bottom: 7vh; /* Ensure content is not hidden behind the bottom navigation */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

//메뉴판 이미지 업로드했을 때 메뉴판 재구성 화면
const MenuRestructure = () => {
  const location = useLocation();
  const { foodNamesList } = location.state || { foodNamesList: [] };

  // console.log(foodNamesList);

  return (
    <PageContainer>
      <HeaderContainer>
        Food Description
      </HeaderContainer>
      <BodyContainer>
        {foodNamesList.map((food, index) => (
          <RestructureItem key={index} food={food} />
        ))}
      </BodyContainer>
    </PageContainer>
  );
};

export default MenuRestructure;