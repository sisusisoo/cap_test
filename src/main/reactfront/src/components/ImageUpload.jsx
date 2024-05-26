import {useState, useRef,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import imageCompression from "browser-image-compression";
import {UrlToImage,ToServer} from "./CommonFunction"
import { DeployIP,DevIP } from "../DeploySetting"



const Container = styled.div`
  width:100%;
  height:25vh;
  display:flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);


`;

const ImContainer = styled.div`
  width:100%;
  height:25vh;

  img{
    width:100%;
    height:25vh;
  }
`;

const SelectButton = styled.button`
  position: relative;
  top:35vh;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-size: 5vw;
  line-height: 27px;
  background: #C5DBFC;
  border-radius: 15px;

`;

const SendButton = styled.button`
  float:left;
  margin-right:10vw;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-size: 5vw;
  line-height: 27px;
  background: #FBCCCC;
  border-radius: 15px;
`;



//원본
const ImageUpload = () => {
    const [Image, setImage] = useState(null);
    const [sendImage, setSendImage] = useState(null);
    const InputRef = useRef(null);
    const navigate = useNavigate();
    const uploadicon = "/img/upload.png";
    const reader = new FileReader();

    //이거 이미지 압축할때 쓰는 옵션같음
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
             //console.log("check 1 ",compressedFile)
               //test용~~~~~~~~~~~~~


//                const test =CommonFunction.UrlToImageFunc.UrlToImage("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FEFMGh%2FbtrHQJp1swV%2Fjgzpy2MOvtC5raTFQ7ksS1%2Fimg.png");
//                console.log(test);
               //-----------------
             reader.readAsDataURL(compressedFile);
             reader.onloadend = () => {
               const base64data = reader.result;
               //console.log("check2:",base64data);
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
            //console.log("formdata화 제대로 됐는지2",formData)
            return formData;
          };

    //이미지 파일 서버로 전송
    const OnUpload = async () => {

//             console.log('OnUpload 작동')//5월16일
            const formDataTest=UrlToImage("https://www.newspeak.kr/news/photo/201604/105033_39008_205.JPG")
//
//             navigate('/picture/menu');
//---------------------------------------
            const formData = handlingDataForm(sendImage)
            console.log("OnUpload 함수로 잘들어 왔는지?",formData.values())
            //console.log("OnUpload 함수로 잘들어 왔는지?",formDataTest.values())
          try {
              //await axios.post('http://ketchup-cap.iptime.org:8080/upload.do',formData);//수정
              //await axios.post('http://localhost:8080/upload.do',formData);//수정5월15일
              await axios.post(DevIP+'/upload.do',formDataTest);//원본 --------
//             await axios.post(DevIP+'/upload.do', formDataTest, {
//                          headers: {
//                              'Content-Type': 'multipart/form-data'
//                          }
//                      });
              //await axios.post(DevIP+'/upload.doDummy',formData);//수정
              navigate('/picture/menu');
          } catch(error) {
              console.error(error);
          }
      };
//---------------------

    return (
        <>
        <input type="file"
        accept=".jpg,.png,.jpeg"
        onChange={onImageUpload}
        ref={InputRef}
        style={{display:"none"}}/>

        <SelectButton onClick={()=> InputRef.current.click()}>Select Image----/</SelectButton>
        {Image?(
            <div>
                <ImContainer> <img src={URL.createObjectURL(Image)} alt="SelectedImage"/></ImContainer>
                <SendButton onClick={OnUpload}>Send Image</SendButton>
            </div>
        ): (
            <Container><img src={OnUpload} alt=""/></Container>
        )}
        </>
    );
};

export default ImageUpload;