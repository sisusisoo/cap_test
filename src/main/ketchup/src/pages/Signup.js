import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase";
import GithubButton from "../component/github-btn";
import { Wrapper, Title, Form, Input, Error, Switcher } from "./UserInfoStyles";

export default function Signup() {
  const navigate = useNavigate(); // react router dom
  const [isLoading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // 새로 추가된 부분
  const [error, setError] = useState("");
  // react로 form 생성해주는 패키지가 있음. 
  // 아래 input에 value={name} 과 같이 설정해주고 
  // 아래와 같이 onChange 이벤트 리스너 생성

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    }
    else if (name === "email") {
      setEmail(value);
    }
    else if (name === "password") {
      setPassword(value);
    }
    else if (name === "confirmPassword") { // 새로 추가된 부분
      setConfirmPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault(); // 화면이 새로고침 되지 않도록 preventDefault
    // console.log(name, email, password);
    setError(""); // 에러 메시지 초기화 

    if (isLoading || name === "" || email === "" || password === "" || confirmPassword === "") return;
    if (password !== confirmPassword) { // 비밀번호 확인
      setError("Passwords do not match."); // 비밀번호가 일치하지 않을 때 오류 메시지 설정
      return;
    }

    try {
      //setLoading(true);
      // [#1] create an account
      const credentials = await createUserWithEmailAndPassword(auth, email, password); // awit는 async 안에서만 사용 가능
      // firebase.tsx 안에 export const auth = getAuth(app); 인증 객체를 매개변수로 
      // 여기에서 성공하면 자격 증명을 받게 됨. 
      console.log(credentials.user) // user 정보 제공 받음 
      // [#2] set the name of the user.
      // await를 통해 사용자 프로필을 업데이트 
      await updateProfile(credentials.user, {
        displayName: name
        // 회원가입 시 이메일과 비밀번호만 있으면 되지만
        // 이름은 필요없어도 사용자의 이름을 사용할 수 있으니 사용하자 
        // firebase 인증에는 사용자를 위한 미니 프로필 같은게 있어서 
        // 사용자 프로필에 표시될 이름(display name)과 아바타 URL을 설정할 수 있음. 
      })
      // [#3]redirect to the home page 
      navigate("/");
    }
    catch (e) {
      if (e instanceof FirebaseError) {
        //console.log(e.code, e.message);
        setError(e.message);
      }
      // setError
      //console.log(e);
      // 이미 계정이 있거나, 비밀번호가 유효하지 않은 경우 
      // 비밀번호 유효성 검사 
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <Wrapper>
      <Title>Signup</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required />
        <Input
          onChange={onChange}
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm Password"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Create Account"} />

      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? {" "}
        <Link to="/">Log in &rarr;</Link>
      </Switcher>

      <GithubButton />
    </Wrapper>
  )
  // error 변수가 비어 있지 않으면 오류 메시지를 포함하는 <Error> 컴포넌트를 렌더링
  // return <h1>create account</h1>;
}