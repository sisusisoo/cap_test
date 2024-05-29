import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom"; // Link 추가
import { MdHome, MdSearch, MdCameraAlt } from "react-icons/md";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 55px;
  border-top: 1px solid #dee2e6;
  z-index: 3;
`;

const BottomNav = () => {
  const [value, setValue] = useState("Main");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Wrapper>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Main"
          value="main"
          icon={<MdHome size={40} />}
          component={Link} // Link로 변경
          to="/main" // 링크의 목적지 설정
        />
        <BottomNavigationAction
          label="Camera"
          value="camera"
          icon={<MdCameraAlt size={40} />}
          component={Link} // Link로 변경
          to="/main/picture"
        />
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<MdSearch size={40} />}
          component={Link} // Link로 변경
          to="/googleMap" // 링크의 목적지 설정
        />
      </BottomNavigation>
    </Wrapper>
  );
};

export default BottomNav;
