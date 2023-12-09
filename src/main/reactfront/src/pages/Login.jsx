import axios from 'axios';
import {useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from '../Context/AuthContext';



const Wrapper = styled.div`
  position: relative;
  width: 1440px;
  height: 1024px;
  margin: 0 auto;

  background: #FFFFFF;

  //모바일
  @media (max-width:768px) {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 76px 5px 103px 0;
    background-color: #fff;
  }
`;

const Styledsubmitbutton = styled.button`
  position: absolute;
  width: 337px;
  height: 81px;
  left: 200px;
  top: 980px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 58.0607px;
  line-height: 81px;


  background: #C5DBFC;
  border-radius: 20px;

  //모바일
  @media (max-width:768px) {
    width: 80%;
    height: 59px;
    left:20%;
    margin-bottom:10%;
    padding: 18px 59px 18px 60px;
    border-radius: 20px;
    background-color: #c5dbfc;
    font-family: Inter;
    font-size: 30.2px;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.4;
    letter-spacing: normal;
    text-align: center;
    color: #000;
}

`;


const Logintext = styled.div`
position: absolute;
width: 661.5px;
height: 75.6px;
left: 550px;
top: 296px;

font-family: 'Inter';
font-style: normal;
font-weight: 900;
font-size: 63.504px;
line-height: 89px;

//모바일
@media (max-width:768px) {
  width: 100%;
  height: 37.8px;
  left:10%;
  font-family: Inter;
  font-size: 50.8px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: center;
  color: #000;
}
`;

const Logo = styled.img`
position: absolute;
width: 659.2px;
height: 281.6px;
left: 348px;
top: 27px;

//모바일
@media (max-width:768px) {
  position: absolute;
  width: 349px;
  left:10%;
  height: 100%;
  top: 76px;
}

`;

const TextE = styled.div`
position: absolute;
width: 712.5px;
height: 46px;
left: 200px;
top: 436px;

font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 40.504px;
line-height: 89px;

//모바일
@media (max-width:768px) {
  width: 135px;
  height: 23px;
  left:2%;
  font-family: Inter;
  font-size: 30.2px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: center;
  color: #000;
}

`;

const TextP = styled.div`
position: absolute;
width: 712px;
height: 46px;
left: 200px;
top: 670px;

font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 40.896px;
line-height: 70px;


//모바일
@media (max-width:768px) {
  width: 205px;
  height: 29px;
  left:2%;
  font-family: Inter;
  font-size: 30.2px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: center;
  color: #000;
}
`;

const EmailForm = styled.input`
  box-sizing: border-box;

  position: absolute;
  width: 990px;
  height: 80px;
  left: 210px;
  top: 532px;
  font-size:46.896px;

  background: #FFFDFD;
  border: 1px solid #000000;

  //모바일
  @media (max-width:768px) {
    width: 100%;
    height: 30%;
    left:2%;
    margin: 5px 0 62px 33px;
    font-size:30px;
    border: solid 1px #000;
    background-color: #fffdfd;
}
`;

const PsForm = styled.input`
  box-sizing: border-box;

  position: absolute;
  width: 990px;
  height: 80px;
  left: 210px;
  top: 765px;
  font-size:46.896px;

  background: #FFFDFD;
  border: 1px solid #000000;

  //모바일
  @media (max-width:768px) {
    width: 100%;
    height: 30%;
    left:2%;
    margin-left:10%;
    border: solid 1px #000;
    background-color: #fffdfd;
}

`;

const EmailError = styled.div`
  position: absolute;
  width: 500px;
  height: 51px;
  left: 231px;
  top: 606px;

  font-family: 'Inter';
  font-style: italic;
  font-weight: 700;
  font-size: 31.752px;
  line-height: 44px;

  color: #EA0909;

  //모바일
  @media (max-width:768px) {
    width: 100%;
    height: 100%;
    top: 340%;
    left:-5%;
    font-family: Inter;
    font-size: 20.3px;
    font-weight: bold;
    font-stretch: normal;
    font-style: italic;
    line-height: 1.4;
    letter-spacing: normal;
    text-align: center;
    color: #ea0909;
}
`;

const PsError = styled.div`
  position: absolute;
  width: 1000px;
  height: 51px;
  left: 215px;
  top: 845px;

  font-family: 'Inter';
  font-style: italic;
  font-weight: 700;
  font-size: 31.752px;
  line-height: 44px;
  color: #EA0909;

  //모바일
  @media (max-width:768px) {
    width: 100%;
    height: 100%;
    top:450%;
    left:1%;
    margin: 30px 155.1px 86.4px 0;
    font-family: Inter;
    font-size: 20.3px;
    font-weight: bold;
    font-stretch: normal;
    font-style: italic;
    line-height: 1.4;
    letter-spacing: normal;
    text-align: center;
    color: #ea0909;
}
`;



function Login() {
  const logo = "/img/logo.png"
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid,setPwValid] = useState(false);

  //이메일 유효성 검사 
  const handleEmail = (e) => {
    setEmail(e.target.value);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(regex.test(email)) {
      setEmailValid(true);
    }
    else {
      setEmailValid(false);
    }
  }


  //axios를 이용해 버튼 클릭시 데이터 전송
  const handleConfirmButton = () => {
    axios.get('http://localhost:3001/Users', {
      params:{
        email:email,
        password:password
      }
    })
    .then(response=> {
      if(response.data.length > 0) {
        const user = response.data[0];
        //로그인 정보 localStorage에 저장
        localStorage.setItem('user', JSON.stringify(user));
        alert(`login Success`);
        //로그인 성공시 로그인 상태 디스패치
        login();
      }else {
        alert('login failure');
        navigate('/');
      }
    })
    .catch(error => {
      alert('login failure');
    });
  };
  

  //비밀번호 유효성 검사 
  const handlePassword = (e) => {
    setPassword(e.target.value);

    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

    if(regex.test(password)) {
      setPwValid(true);
    }
    else {
      setPwValid(false);
    }
  }

  const gotomain = () => {
    navigate("main");
  }

  return (
    <Wrapper>
      <div >
      <Logintext>LOGIN</Logintext>
      <Logo img src={logo} alt=''/>

      <div>
        <TextE>EMAIL</TextE>
        <div>
          <EmailForm
            type='text'
            className='input'
            placeholder="test@gmail.com"
            value={email}
            onChange={handleEmail}/>
        </div>

      <EmailError>
        {
          !emailValid && email.length>0 && (
            <div>Please enter a valid e-mail </div>
        )}
      </EmailError>

      <TextP>PASSWORD</TextP>
        <div>
          <PsForm
          type='password'
          className='input' 
          value={password}
          onChange={handlePassword}/>
        </div>
        <PsError>
          {
            !pwValid && password.length>0 && (
              <div> Please enter at least 8 characters including English and numbers. </div>
          )}
       </PsError>
      </div>

      <div>
        <Styledsubmitbutton onClick={() =>{handleConfirmButton(); gotomain();}} >
          SUBMIT
        </Styledsubmitbutton>
      </div>
    </div>  
    </Wrapper>
    
  )
}

export default Login