import styled from "styled-components";
import ImageUpload from "../component/ImageUpload";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Texts = styled.div`
  font-size: 5vw;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  text-align: center;
  margin-top: 18%;
`;

const UserPicture = () => {
  return (
    <Wrapper>
      <Texts>
        <p>Please take a picture of the menu</p>
      </Texts>
      <ImageUpload />
    </Wrapper>
  );
};

export default UserPicture;
