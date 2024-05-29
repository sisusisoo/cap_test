import GetUserLocation from "../getUserLocation";
import { FaLocationArrow } from "react-icons/fa";
import styled from "styled-components";

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  border-bottom: 1px solid #dee2e6; /* 얇은 밑줄 추가 */
  z-index: 3; /* 가장 높은 레이어 */
`;

const Wrapper = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = () => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <FaLocationArrow size={30} color="C35050" />
          <GetUserLocation />
        </Wrapper>
      </HeaderBlock>
    </>
  );
};

export default Header;
