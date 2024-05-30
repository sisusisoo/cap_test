import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { FiCamera } from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";
import styled from "styled-components";

const NameBox = styled.div`
  margin-top: 6vh;
  display: flex;
  margin-bottom: 3vh;

  .photo {
    font-size: 3vh;
    font-weight: bold;
    color: #c35050;
    margin-left: 3vw;
  }
`;

const Box = styled.div`
  position: relative;
  height: 30vh;
  width: 100%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
  }

  .guide {
    color: gray;
    font-size: 3vh;
  }
`;

const CameraIcon = styled(FiCamera)`
  font-size: 4vh;
  color: #c35050;
`;

const CloseIcon = styled(IoMdCloseCircle)`
  font-size: 4vh;
  position: absolute;
  top: 0.5vh;
  right: 2vw;
  cursor: pointer;
`;

const PhotoField = forwardRef((props, ref) => {
  const [Image, setImage] = useState(null);
  const InputRef = useRef(null);

  //이미지 첨부 미리보기
  const handleImage = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const imageURL = URL.createObjectURL(imageFile);
      setImage(imageURL);
    }
  };

  //첨부한 이미지 제거
  const cancleImage = () => {
    setImage(null);
    InputRef.current.value = "";
  };

  // 이미지를 base64로 변환하여 반환
  // TextField에서 useRef를 통해 접근
  const uploadImage = async () => {
    //이미지 파일을 업로드 하지 않는 경우에는 빈 문자열 반환
    if (!InputRef.current.files[0]) {
      return "";
    }
    try {
      //파일을 base64 데이터 URL로 반환
      const imageDataUrl = await getBase64(InputRef.current.files[0]); // 이미지를 base64로 변환
      return imageDataUrl; // 변환된 이미지 URL을 반환
    } catch (error) {
      console.error("이미지 변환 에러:", error);
      throw error;
    }
  };

  // 파일을 base64로 변환하는 함수
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); //FileReader 객체 생성
      //FileReader 객체를 사용하여 파일을 base64로 읽어옴
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  //TextField에서 uploadImage 함수 사용할 수 있도록 연결
  useImperativeHandle(ref, () => ({
    uploadImage: async () => {
      return await uploadImage();
    },
  }));

  return (
    <div ref={ref}>
      <NameBox>
        <CameraIcon>
          <FiCamera />
        </CameraIcon>
        <div className="photo">사진 추가</div>
      </NameBox>
      <input
        type="file"
        accept=".jpg,.png,.jpeg"
        ref={InputRef}
        onChange={handleImage}
        style={{ display: "none" }}
      />
      {Image ? (
        <Box>
          <img src={Image} alt="이미지" />
          <CloseIcon onClick={cancleImage}>
            <IoMdCloseCircle />
          </CloseIcon>
        </Box>
      ) : (
        <Box>
          <div className="guide" onClick={() => InputRef.current.click()}>
            사진을 첨부해주세요
          </div>
        </Box>
      )}
    </div>
  );
});

export default PhotoField;
