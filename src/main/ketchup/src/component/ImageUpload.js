import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { DeployIP,DevIP } from "../DeploySetting"


const BoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
position: relative;
border-radius:1vh;
height: 50vh;
width: 90%;
border: 1px solid #c35050;

display: flex; 
justify-content: center; 
align-items: center; 

overflow: hidden;

img {
  max-width: 100%;
  max-height: 100%;
}
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 2vh;

  display: flex; 
  justify-content: center; 
  align-items: center; 
`;

const Button = styled.div`
  background-color: white;
  border: 1px solid #c35050;
  border-radius: 1vh;
  width: 80%;

  padding: 2vw;
  margin-top: 2vh;

  color: #c35050;
  font-size: 3vh;
  font-weight: bold;
  text-align: center; 

  gap: 1vh;
  transition: transform 0.2s;

  &:hover {
    transform: scale(0.95);
  }
`;

const ImageUpload = ({ id }) => {
  const [image, setImage] = useState(null);
  // const [imageUrl, setImageUrl] = useState(null); // 이미지 출력을 위해 추가
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const foodName = ""

  const onImageUpload = (e) => {
    setImage(e.target.files[0]);
    //setImageUrl(URL.createObjectURL(e.target.files[0])); // 
  };

  // 이미지 파일 서버로 전송
  const onUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      await axios.post(DevIP+"/upload.do", formData, {
      withCredentials: true // 쿠키 cors 통신 설정
      })
      const response = await axios.post(DevIP+'/compare-food', {
        foodName: foodName, // Set an empty string or any default value as needed
      });
      console.log("image upload compareFood");
      const foodNamesList = response.data; // 서버로부터 받은 음식 이름 리스트
      // console.log(foodNamesList);
      gotoMenuList(foodNamesList); // 음식 이름 리스트 전달


    } catch (error) {
      console.error(error);
    }
  };

  // 메뉴판 재구성 리스트로 이동
  const gotoMenuList = (foodNamesList) => {
    navigate("/main/picture/restructure", { state: { foodNamesList } });
    // MenuRestructure.js로 이동
  };

  return (
    <>
      <input
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={onImageUpload}
        ref={inputRef}
        style={{ display: "none" }}
      />

      {/*이미지가 있을 때*/}
      {image && (
        <>
          <BoxWrapper>
            <ImageContainer>
              <img src={URL.createObjectURL(image)} alt="SelectedImage" />
            </ImageContainer>
          </BoxWrapper>
          <ButtonContainer>
            <Button
              onClick={() => {
                onUpload();
              }}
            >
              Send Image
            </Button>
          </ButtonContainer>
        </>
      )}

      {/*이미지가 없을 때*/}
      {!image && (
        <>
          <BoxWrapper>
            <ImageContainer></ImageContainer>
          </BoxWrapper>
          <ButtonContainer>
            <Button onClick={() => inputRef.current.click()}>
              Select Image
            </Button>
          </ButtonContainer>
        </>
      )}
    </>
  );
};

export default ImageUpload;