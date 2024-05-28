import React from "react";
import { useState, useEffect } from "react";
import Splash from "./pages/Splash";
import Main from "./pages/Main";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import MenuDetail from "./pages/MenuDetail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import KakaoMap from "./pages/KakaoMap";
import { auth } from "./firebase";
import BottomNav from "./component/Common/BottomNav";
import GoogleMap from "./pages/GoogleMap";
import ResInfo from "./component/ResInfo";
import { MenuList } from "@mui/material";
import PhotoField from "./component/PhotoField";
import MenuCapture from "./pages/MenuCapture";
import MenuRestructure from "./pages/MenuRestructure";

function App() {
  const { place_id } = useParams();
  const [loading, setLoading] = useState(true);
  const init = async () => {
    // wait for firebase 
    // await auth. 치면 많은 메소드들 나옴
    // 로그인, 아웃 등등 
    await auth.authStateReady();
    // 최초 인증 상태가 완료될 때 실행되는 Promise를 return함. 
    // 즉, Firebase가 쿠키와 토큰을 읽고 백엔드와 소통해서 
    // 로그인 여부를 확인하는 동안 기다리겠다는 뜻.
    setTimeout(() => setLoading(false), 2000); // 테스트용
    // setIsLoading(false);
  }
  useEffect(() => {
    init();
  }, [])

  return (
    <>
      {loading ? (
        <Splash />
      ) : (
        <BrowserRouter>
          <Routes>
            {/* 로그인 페이지 */}
            <Route index element={<Login />} />
            {/* 회원가입 페이지 */}
            <Route path="/signup" element={<Signup />} />
            {/* BottomNav가 포함된 페이지 */}
            <Route path="/main" element={<Main />} />
            <Route path="/googleMap" element={<GoogleMap />} />
            <Route path="/kakaoMap" element={<KakaoMap />} />
            <Route path="/main/menulist/:place_id" element={<MenuList />} />
            <Route path="/menulist/:id/:Food_id" element={<MenuDetail />} />
            <Route path="/photo" element={<PhotoField />} />
            <Route path="/main/picture" element={<MenuCapture />} />
            <Route
                path="/main/picture/restructure"
                element={<MenuRestructure />}
              />
          </Routes>
          <ResInfo />
          <BottomNav />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;