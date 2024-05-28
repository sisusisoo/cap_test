import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 50px 0px;
  margin: 0 auto; /* 왼쪽과 오른쪽을 자동으로 마진을 설정하여 가운데 정렬 */
`;

export const Title = styled.h1`
  font-size: 7vh;
  font-weight: bold;
  text-align: center;
  color: #c35050;
  margin-top: 4vh;
`;
export const Form = styled.form`
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;

  `;

export const Input = styled.input`
  padding: 1vh;
  border-radius: 1vh;
  width: 80%;    
  font-size: 2.5vh;    
  &[type="submit"] {// type이 submit이라면 cursor를 pointer로 바꾸기
    margin-top: 20px;
    cursor:pointer; 
    width: 85%;  
    &:hover{     // 사용자가 마우스를 해당 요소 위로 올렸을 때 적용되는 스타일을 지정
        background-color: #c35050;
    }
    border-radius: 1vh;
    background-color: #ffffff;
    padding: 1vh 3vh;
    font-size: 2.5vh;
  }
  color: black;
  font-weight: bold;
  // 입력을 래퍼 안에서 중앙에 배치하기 위한 스타일
  align-self: center; // 입력을 수평으로 중앙에 배치
`;

export const Error = styled.span`
    margin-top: 30px;
    font-size: 20px; // 글자 크기 키우기
    font-weight: 600;
    color: red;
`;

export const Switcher = styled.span`
    margin-top: 30px;
    a{
      color: navy; // 남색으로 변경
      font-size: 20px; // 글자 크기 키우기
    }
`;
export const ForgotPassword = styled.span`
    margin-top: 5px;
    a{
      color: navy; // 남색으로 변경
      font-size: 20px; // 글자 크기 키우기
  }
`;