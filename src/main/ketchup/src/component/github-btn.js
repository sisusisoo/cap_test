import { GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, sendPasswordResetEmail, signInWithPopup, signInWithRedirect } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
    margin-top: 50px;
    background-color: white;
    font-weight: 500;
    width: 50%;
    color: black;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 50px;
    border: 2px solid black; /* 경계 추가 */
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 2vh;
    &:hover{     // 사용자가 마우스를 해당 요소 위로 올렸을 때 적용되는 스타일을 지정
        background-color: #c35050;
    }

`;

const Logo = styled.img`
    height: 30px;
`;

export default function GithubButton(){
    const navigate = useNavigate();
    const onClick = async () =>{
    try{
        const provider = new GithubAuthProvider();
        // const tp = new TwitterAuthProvider();
        // const gp = new GoogleAuthProvider();
        //await signInWithRedirect(auth, provider); // 리다이렉트로 로그인 시도 
        await signInWithPopup(auth, provider); // 팝업창으로 로그인 시도, 뭔가 차단됨.
        navigate("/main") // 로그인이 잘 되면 main으로
    }
    catch(error){
        console.log(error);
    }

    };
    return (
        <Button onClick={onClick}>
            <Logo src="/github-logo.svg" />
            Continue with Github
        </Button>
    )
}