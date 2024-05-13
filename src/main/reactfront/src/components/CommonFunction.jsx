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


//imageUpload 모듈화함
export const OnUpload = async () => {
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
