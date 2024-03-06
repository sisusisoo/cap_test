import styled from "styled-components";
//import { useNavigate } from "react-router-dom";
//import { useContext } from "react";
//import { AuthContext } from "../../Context/AuthContext";


const HeaderBlock = styled.div`
    position:fixed;
    width:100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.08);
`;

const Wrapper = styled.div`
    height:6rem;
    display: flex;
    align-items:center;
    justify-content: space-between;


    .logo {
        position: flex;
        width: 15vh;
    }

    .right {
        display: flex;
        align-items: center;
        padding:2%;
        font-size: 10px;
        margin:2%;
    }
`;

const Spacer = styled.div`
    height:6rem;
`;

const Button = styled.button`
    border:none;
    border-radius: 4px;
    font-size:20px;
    font-weight:bold;
    color:white;
    cursor:pointer;
    background:#FBCCCC;
`;

const Header = () => {
    const logo = "/img/logo.png";
    //const navigate = useNavigate();
    //const {logout} = useContext(AuthContext);

    /*로컬 스토리지에 저장된 user 데이터 읽기 
    const user = JSON.parse(localStorage.getItem('user'));*/

    /*const onLogout = () => {
        alert('logout');
        //로그아웃 상태 디스패치
        logout();
        //홈 화면으로 이동
        navigate("/");
        //로컬 스토리지에서 모든 데이터 삭제 
        localStorage.clear('user');
    }*/

    return (
        <>
        <HeaderBlock>
            <Wrapper>
                <img className="logo"src={logo} alt=""/>
            <div className="right">
                <Button>로그아웃</Button>
            </div>
            </Wrapper>
        </HeaderBlock>
        <Spacer/>
         </>
    );
};

export default Header;