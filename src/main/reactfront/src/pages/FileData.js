import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';




function FileData() {
  const [file, setFile] = useState(null);	//파일

  const navigate = useNavigate();// 이거 까지~~!!!~!!~!@!~!


  const handleChangeFile = (event) => {
    console.log(event.target.files)
    setFile(event.target.files);


  }

  function Send(){
    const fd = new FormData();
    Object.values(file).forEach((file) => fd.append("file", file));


    axios.post('/upload.do', fd, {
      headers: {
        "Content-Type": `multipart/form-data; `,
      },

  // baseURL: 'http://localhost:8080'
   //baseURL: 'http://192.168.0.14:8080'
   baseURL: 'http://211.107.143.216:8080'//이걸로 했을때 들어감


    })
    .then((response) => {
     navigate('/picture/menu');
    })
    .catch((error) => {
      // 예외 처리
    })
  }


    return (
        <div>
            FileData
            <div>
                fileData1:  <input type="file" id="file" onChange={handleChangeFile} multiple="multiple"></input>
            </div>


            <div>
                <button onClick={()=> Send()}>Send3</button>
            </div>
            <div>
                <button onClick={()=> {navigate('/picture/menu');}}>return!</button>
            </div>
        </div>
    );
  }
export default FileData;