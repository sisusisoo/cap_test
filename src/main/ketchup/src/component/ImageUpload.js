import { useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { DevIP } from "../DeploySetting"
import imageCompression from "browser-image-compression";

const ImageContainer = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ImageBox = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ButtonBox = styled.div`
  margin: 0 10px;
`;

const Button = styled.div`
  background-color: white;
  border: 2px solid #c35050;
  border-radius: 2vh;
  font-size: 3vh;
  color: #c35050;
  padding: 2vw;
  margin-top: 2vh;
  display: flex;
  font-weight: bold;
  align-items: center;
  gap: 1vh;
  transition: transform 0.2s;

  &:hover {
    transform: scale(0.95);
  }
`;

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [sendImage, setSendImage] = useState(null);
  const inputRef = useRef(null);
  const reader = new FileReader();
  //const navigate = useNavigate();//아직 안씀

//  const onImageUpload = (e) => {
//    setImage(e.target.files[0]);
//  };
  //이미지 압축 부분
   const options = {
                maxSizeMB: 0.9, // 이미지 최대 용량
                maxWidthOrHeight: 1920, // 최대 넓이(혹은 높이)
                useWebWorker: true,
              };

      const onImageUpload = async (event) => {
            console.log(event.target.files)//추가
            setImage(event.target.files[0]);//

         try {
               const compressedFile = await imageCompression(event.target.files[0], options);
               reader.readAsDataURL(compressedFile);
               reader.onloadend = () => {
                 const base64data = reader.result;
                  setSendImage(base64data)//여기서 image 변환상태 적용
                 }

               console.log("압축된 이미지 정보:",compressedFile,"데이터타입",typeof compressedFile)
               const promise = imageCompression.getDataUrlFromFile(compressedFile);
               promise.then((result) => {
                 console.log("여기다~~~~~~",result)
               });
             } catch (error) {
               console.log("에러임",error);
             }

          };
          //formdata화                                 //---------
            const handlingDataForm = (dataURI:any) => {
              const byteString = atob(dataURI.split(",")[1]);

              // Blob 구성 준비
              const ab = new ArrayBuffer(byteString.length);
              const ia = new Uint8Array(ab);
              for (let i = 0; i < byteString.length; i+=1) {
                ia[i] = byteString.charCodeAt(i);
              }
              const blob = new Blob([ia], {
                type: "image/jpeg"
              });
              const file = new File([blob], "image.jpg");
              const formData = new FormData();
              formData.append("photo", file);
              console.log("formdata 여기 ")
              for (const x of formData) {
               console.log(x);
              };
              return formData;
            };

  // 이미지 파일 서버로 전송
  const onUpload = async () => {
    try {
      //용량 줄이기
      const formData = handlingDataForm(sendImage)
      //const formData = new FormData();
      //formData.append("image", image);
      await axios.post(DevIP+"/upload.do", formData);
      console.log(image);
    } catch (error) {
      console.error(error);
    }
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
        <div>
          <ImageContainer>
            <ImageBox>
              <img src={URL.createObjectURL(image)} alt="SelectedImage" />
            </ImageBox>
          </ImageContainer>
          <ButtonContainer>
            <ButtonBox>
              <Button onClick={onUpload}>Send Image</Button>
            </ButtonBox>
          </ButtonContainer>
        </div>
      )}

      {/*이미지가 없을 때*/}
      {!image && (
        <div>
          <ImageContainer>{}</ImageContainer>
          <ButtonContainer>
            <ButtonBox>
              <Button onClick={() => inputRef.current.click()}>
                Select Image
              </Button>
            </ButtonBox>
          </ButtonContainer>
        </div>
      )}
    </>
  );
};

export default ImageUpload;
