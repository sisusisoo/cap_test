import axios from 'axios';
import {useState, useRef,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';



export function ImageUpload() {
const [sendImage, setSendImage] = useState(null);
const navigate = useNavigate();

//url 받아와서 이미지로 변환 후 axios통신으로 보내는 함수

// export function urlToImage = async (url:string)=> {
//
//   const response = await fetch(url);
//   const data = await response.blob();
//   const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
//   const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
//   const metadata = { type: `image/${ext}` };
//   return new File([data], filename!, metadata);
// }

// axios통신으로 보내는거 까지

//이건 imageUpload에 포함
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



//imageUpload 모듈화함
const OnUpload = async () => {
               const formData = handlingDataForm(sendImage)
                console.log("OnUpload 함수로 잘들어 왔는지?",formData.values())

             try {

              //  const formData = new FormData();
                // formData.append("image",);
                 //await axios.post('http://ketchup-cap.iptime.org:8080/upload.do',formData);//수정
                 await axios.post('http://localhost:8080/upload.do',formData);//수정

                 navigate('/picture/menu');
             } catch(error) {
                 console.error(error);
             }
         };
}


