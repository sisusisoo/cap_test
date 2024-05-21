import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import GithubButton from "../component/github-btn";
import { Wrapper, Title, Form, Input, Error, Switcher } from "./UserInfoStyles";


export default function LogIn(){
    const navigate = useNavigate(); // react router dom
    const [isLoading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState("");
    // react로 form 생성해주는 패키지가 있음. 
    // 아래 input에 value={name} 과 같이 설정해주고 
    // 아래와 같이 onChange 이벤트 리스너 생성
    const onChange = (e) => {
      const {
            target: {name, value},
        } = e;
        if(name === "email"){
            setEmail(value);
        }
        else if(name === "password"){
            setPassword(value);
        }
    };
  const onSubmit = async (e) => {
        e.preventDefault(); // 화면이 새로고침 되지 않도록 preventDefault
        // console.log(name, email, password);
        setError(""); // 에러 메시지 초기화 
        
        if(isLoading || email === "" || password === "") return;
        try{
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password); // UserCredential을 반환함 
            navigate("/main");
        }
        catch(e){           
            if(e instanceof FirebaseError){
                //console.log(e.code, e.message);
                setError(e.message);
            }
            // setError
            //console.log(e);
            // 이미 계정이 있거나, 비밀번호가 유효하지 않은 경우 
            // 비밀번호 유효성 검사 
        }
        finally{
            setLoading(false);
        }
    };
    return (
        <Wrapper>
            <Title>Log in</Title>
            <Form onSubmit={onSubmit}>
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
                    required/>
                <Input type="submit" value={isLoading ? "Loading...":"Log in"}/>
            </Form>
            {error !== "" ? <Error>{error}</Error>: null}
            
            <Switcher>
            Dont' have an account? {" "}
            <Link to="/signup">Create one &rarr;</Link> 
            </Switcher>

            <GithubButton />
        </Wrapper>
    )
    // error 변수가 비어 있지 않으면 오류 메시지를 포함하는 <Error> 컴포넌트를 렌더링
    // return <h1>create account</h1>;

    // raar은 right arrow
}