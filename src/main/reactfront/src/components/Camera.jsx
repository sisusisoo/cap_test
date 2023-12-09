import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Webcam from "react-webcam";
//import axios from "axios";
import '../style/Camera.css';
import { FcCamera } from "react-icons/fc";
import { FcRedo } from "react-icons/fc";
import { FcOk } from "react-icons/fc";



/*const videoConstraints = {
    facingMode: 'user'
};*/

const Camera = () => {
    const webcamRef = useRef(null);
    const [selectedDeviceId, setSelectedDeviceId] = useState([]);
    const [imgSrc, setImgSrc] = useState(null);
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getDevices = async () => {
          try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            
            if (videoDevices.length > 0) {
              setSelectedDeviceId(videoDevices[0].deviceId); // 첫 번째 웹캠을 선택
              alert("사용자의 카메라에 접근합니다.");
            }
          } catch (error) {
            alert('Error getting media devices:', error);
          }
        };
    
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
          getDevices();
        } else {
          alert('enumerateDevices() not supported.');
        }
      }, []);

    
    //현재 webcam 이미지의 base64 인코딩 문자열 반환
    const onCapture = useCallback(()=> {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        setSubmit(true);
    },[webcamRef]);


    const onUpload= ()=>{
        navigate('/login/main/picture/menu');
    };

    //재촬영 
    const onRetake = () => {
        setImgSrc(null);
        setSubmit(false);
    };


    return (
        <div className="Wrapper1">
            
            {imgSrc ? (
                <img src={imgSrc} alt="webcam" />
            ):(
                <div>
                    {selectedDeviceId? (
                        <Webcam className="webcamstyle"
                         audio={false}
                         mirrored={true}
                         height={680}
                         width={600}
                         screenshotFormat="image/jpeg"
                          videoConstraints={{deviceId: selectedDeviceId}} ref={webcamRef} />
                    ): (
                        <p>사용자의 카메라를 가져올 수 없습니다.</p>
                    )}
                </div>
             )}

            <div>
              {imgSrc ? (
                <FcRedo className="redostyle" onClick={onRetake}>재촬영</FcRedo>
              ) : (
                <FcCamera className="capturestyle"onClick={onCapture} onChange={onUpload}>촬영</FcCamera>
              )}
                {submit && (
                 <FcOk className="submitstyle" onClick={onUpload}>제출</FcOk>
              )}
                </div>
            </div>
    );
};

export default Camera;