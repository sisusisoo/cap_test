import styled from "styled-components";
import ImageUpload from "../component/ImageUpload";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const NameBox = styled.div`
  margin-top: 6vh;
  margin-left: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3vh;

  .add_photo {
    font-size: 3vh;
    font-weight: bold;
    color: #c35050;
    margin-left: 3vw;
  }

  img {
    width: 10vh;
    height: 10vh;
    filter: invert(38%) sepia(58%) saturate(747%) hue-rotate(320deg) brightness(90%) contrast(92%);
  }
`;

const UserPicture = () => {
  return (
    <Wrapper>
      <NameBox>
      <div className="add_photo">Photo the Menu!</div>
        <img 
          width="100" 
          height="100" 
          src="https://img.icons8.com/carbon-copy/100/screenshot.png" 
          alt="screenshot" 
        />
      </NameBox>
      <ImageUpload />
    </Wrapper>
  );
};

export default UserPicture;
