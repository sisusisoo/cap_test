import React from "react";
import {Routes,Route,BrowserRouter} from "react-router-dom";
import Main from "../pages/Main";
import UserPicture from "../pages/UserPicture";
import MapSearching from "../pages/MapSearching";
import MenuDetail from "../pages/MenuDetail";
import MenuList from "../pages/MenuList";
import Mypage from "../pages/Mypage";
import FileData from "../pages/FileData";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="picture" element={<UserPicture />} />
          <Route path="/picture/menu" element={<MenuList/>} />
          <Route path="/picture/menu/detail/:id" element={<MenuDetail />}/>
          <Route path="map" element={<MapSearching />} />
          <Route path="mypage" element={<Mypage/>}/>
          <Route path="FileData" element={<FileData/>}/>
        </Routes>
        </BrowserRouter>
    
  );
}


export default App;
