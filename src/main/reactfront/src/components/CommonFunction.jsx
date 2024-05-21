import axios from 'axios';
import {DeployIP,DevIP} from "../DeploySetting"

// export default function ImageUpload() {}

//url 받아와서 이미지로 변환 후 axios통신으로 보내는 함수
//
 const UrlToImage = async (url)=> {

  const response = fetch(url)
  const blob = await response.blob();
  console.log("여기2",blob)

  const file = new File([blob], "image.jpg",{ type: blob.type });
  const formData = new FormData();
  formData.append("photo", file);
  return formData
}





export {UrlToImage}




