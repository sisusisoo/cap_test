import React, {useState,useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { FaCheck } from "react-icons/fa";

const Wrapper = styled.div`
  position: relative;
  width: 1440px;
  height: 1024px;
  margin:0 auto;

  background: #FFFFFF;
`;

const Logo = styled.img`
 position: absolute;
  width: 659.2px;
  height: 220.6px;
  left: 348px;
  top: 27px;
`;

const SignT = styled.div`
  position: absolute;
  width: 761px;
  height: 60px;
  left: 580px;
  top: 182px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 900;
  font-size: 50.504px;
  line-height: 89px;
`;

const EmailT = styled.div`
  position: absolute;
  width: 712px;
  height: 46px;
  left: 200px;
  top: 250px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 40.504px;
  line-height: 89px;
  color: #000000;
`;

const EmailForm = styled.input`
  box-sizing: border-box;

  position: absolute;
  width: 972px;
  height: 64px;
  left: 210px;
  top: 340px;
  font-size:40px;

  background: #FFFDFD;
  border: 1px solid #000000;
`;

const EmailError = styled.div`
  position: absolute;
  width: 600px;
  height: 51px;
  left: 200px;
  top: 400px;

  font-family: 'Inter';
  font-style: italic;
  font-weight: 700;
  font-size: 21.752px;
  line-height: 44px;
  color: #EA0909;

`;

const PsT = styled.div`
  position: absolute;
  width: 712px;
  height: 46px;
  left: 200px;
  top: 441px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 40.504px;
  line-height: 89px;
  color: #000000;
`;

const PasswordForm = styled.input`
  box-sizing: border-box;

  position: absolute;
  width: 972px;
  height: 63px;
  left: 210px;
  top: 512px;
  font-size:40px;
  background: #FFFDFD;
  border: 1px solid #000000;

`;

const PsError = styled.div`
  position: absolute;
  width: 600px;
  height: 51px;
  left: 200px;
  top: 562px;

  font-family: 'Inter';
  font-style: italic;
  font-weight: 700;
  font-size: 21.752px;
  line-height: 44px;
  color: #EA0909;

`;

const PsCT = styled.div`
  position: absolute;
  width: 712px;
  height: 46px;
  left: 200px;
  top: 580px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 40.896px;
  line-height: 89px;
  color: #000000;
`;

const PscForm = styled.input`
  box-sizing: border-box;

  position: absolute;
  width: 972px;
  height: 64px;
  left: 210px;
  top: 660px;
  font-size:40px;

  background: #FFFDFD;
  border: 1px solid #000000;
`;

const PscError = styled.div`
  position: absolute;
  width: 600px;
  height: 51px;
  left: 200px;
  top: 720px;

  font-family: 'Inter';
  font-style: italic;
  font-weight: 700;
  font-size: 21.752px;
  line-height: 44px;
  color: #EA0909;
`;

const NickT = styled.div`
  position: absolute;
  width: 712px;
  height: 46px;
  left: 200px;
  top: 747px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 40.896px;
  line-height: 70px;
  color: #000000;

`;

const NickForm = styled.input`
  box-sizing: border-box;

  position: absolute;
  width: 972px;
  height: 64px;
  left: 210px;
  top: 820px;
  font-size:40px;

  background: #FFFDFD;
  border: 1px solid #000000;
`;

const SubmitButton = styled.button`
  position: absolute;
  width: 337px;
  height: 81px;
  left: 210px;
  top: 940px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 580;
  font-size: 58.0607px;
  line-height: 81px;
  background: #C5DBFC;
  border-radius: 20px;
`;

const EmailDouble = styled.button`
  position: absolute;
  width: 229px;
  height: 50px;
  left: 766px;
  top: 273px;
  background: #FBCCCC;
  border-radius: 30px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-size: 23.5872px;
  line-height: 29px;
  text-align: center;
  color: #000000;

`;

const NicknameButton = styled.button`
  position: absolute;
  width: 229px;
  height: 50px;
  left: 766px;
  top: 752px;
  background: #FBCCCC;
  border-radius: 30px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-size: 23.5872px;
  line-height: 29px;
  text-align: center;
  color: #000000;

`;

const DoubleTextE = styled.span`
  position: absolute;
  width: 252px;
  height: 29px;
  left: 1000px;
  top: 282px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-size: 23.5872px;
  line-height: 29px;
  color: #000000;
`;

const DoubleTextNic = styled.span`
  position: absolute;
  width: 252px;
  height: 29px;
  left: 1000px;
  top: 762px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-size: 23.5872px;
  line-height: 29px;
  color: #000000;
`;

function Signup () {
  const logo = "/img/logo.png"

  //초기값 세팅
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');

  //오류메시지 상태 저장 
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  //유효성 상태 저장
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIspassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [notAllow, SetNotAllow] = useState(true); //초기상태 = 버튼 비활성화 

  //이메일, 닉네임 중복 상태 저장
  const [doubleEmail, setDoubleEmail] = useState(true);
  const [doubleNickname, setDoubleNickname] = useState(true);

  //이메일 유효성 검사 
  const ValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return email.match(regex);
  };

  //비밀번호 유효성 검사 
  const ValidPassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

    return password.match(regex);
  };

  //비밀번호 확인 유효성
  const ValidPasswordConfirm = (passwordConfirm)=> {
    return password === passwordConfirm;
  }

  //이메일 
  const handleEmail =  (e)=> {
    const currentEmail = e.target.value;
    setEmail(currentEmail);

    if(!ValidEmail(currentEmail)) {
      setEmailMessage("Email format is incorrect");
      setIsEmail(false);
    }
    else {
      setEmailMessage("Correct email format");
      setIsEmail(true);
    }
  };

  //비밀번호 
  const handlePassword = (e)=>{
    const currentPassword = e.target.value;
    setPassword(currentPassword);

    if(!ValidPassword(currentPassword)) {
      setPasswordMessage("8 digits including English and numerals");
      setIspassword(false);
    }
    else {
      setPasswordMessage("Secure Password");
      setIspassword(true);

    }
  };

  //비밀번호 확인
  const handlePasswordConfirm =(e)=> {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);

    if(!ValidPasswordConfirm(currentPasswordConfirm)) 
    {
      setPasswordConfirmMessage("Password don't match");
      setIsPasswordConfirm(false);
    }
    else {
      setPasswordConfirmMessage("Password matches");
      setIsPasswordConfirm(true);
    }

  };

  //닉네임
  const handleNickname = (e)=> {
    const currentNickname = e.target.value;
    setNickname(currentNickname);
  };

 useEffect ( () => {
    if(isEmail && isPassword && isPasswordConfirm&&!doubleEmail&&!doubleNickname) {
      SetNotAllow(false); //버튼 활성화 
      return;
    }
    SetNotAllow(true);

  },[isEmail,isPassword,isPasswordConfirm,doubleEmail,doubleNickname])

  //axios를 이용해 버튼 클릭시 데이터 전송
  const handleSubmitbutton = async(e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/Users", {email,password,nickname});
      alert("Signup success! Please Login");
    }catch (error) {
      alert("Signup Error", error);
    }
    
  };

  //이메일 중복 검사 
  const checkEmailDuplicate = () => {
      axios.get(`http://localhost:3001/users?email=${email}`)
    .then((res)=> {
      if(res.data.length >0) {
        setDoubleEmail(true);
      }
      else {
        setDoubleEmail(false);
      }
    })
    .catch((error) => {
      console.error(error);
    })

  };

  //닉네임 중복 검사 
  const checkNicknameDuplicate = () => {
    axios.get(`http://localhost:3001/users?nickname=${nickname}`)
    .then((res)=> {
      if(res.data.length>0) {
        setDoubleNickname(true);
      }
      else {
        setDoubleNickname(false);
      }
    })
    .catch((error) => {
      console.error(error);
    })
  }

  return (
    <Wrapper>
      <Logo img src={logo} alt="/"/>
      <SignT>signup</SignT>

      <EmailT>EMAIL</EmailT>
      <EmailForm
       id="email"
       value={email}
       onChange={handleEmail}
       required={true}
       type="text" />

       <EmailDouble type="button" onClick={checkEmailDuplicate}>Double Check</EmailDouble>
       {doubleEmail?(<DoubleTextE>중복된 이메일 입니다.</DoubleTextE>):
       (<DoubleTextE><FaCheck color="red" size={30}/></DoubleTextE>)}

       <EmailError>
        {emailMessage}
       </EmailError>

       <PsT>PASSWORD</PsT>
       <PasswordForm
        id="password"
        value={password}
        onChange={handlePassword}
        required={true}
        type="password" />

        <PsError>
          {passwordMessage}
        </PsError>

        <PsCT>PASSWORDCONFIRM</PsCT>
        <PscForm
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={handlePasswordConfirm}
          required={true}
          type="password"/>

          <PscError>
            {passwordConfirmMessage}
          </PscError>

          <NickT>NICKNAME</NickT>
          <NickForm
            id="nickname"
            value={nickname}
            onChange={handleNickname}
            required={true}
            type="text"/>
          <NicknameButton type="button" onClick={checkNicknameDuplicate}>Double Check</NicknameButton>
          {doubleNickname ?(<DoubleTextNic>중복된 닉네임 입니다.</DoubleTextNic>):
          (<DoubleTextNic><FaCheck color="red" size={30}/></DoubleTextNic>)}


        <SubmitButton 
          formMethod='post'
          onClick={handleSubmitbutton} 
          disabled={notAllow}>Signup</SubmitButton>
    </Wrapper>
  ) 
}


export default Signup