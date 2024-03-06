import {Map, MapMarker} from 'react-kakao-maps-sdk';
import {useState, useEffect} from 'react';
import { FcSearch } from "react-icons/fc";
import '../style/SearchMap.css';


const {kakao} = window;

const SearchMap = () => {
  const [info, setInfo] = useState()
  const [markers, setMarkers] = useState([])
  const [map, setMap] = useState();
  const [keyword, setKeyword] = useState("");
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  })

 //사용자 현재 위치 받아오기
 useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }))
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation가 지원되지 않습니다.",
        isLoading: false,
      }))
    }
  }, [])

  //제출한 검색어 state에 담아줌
  const onChangeSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

//키워드 검색후 지도 이동
const handleSerarch = () => {
    if(map) {
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(keyword,(data, status)=> {
            if(status === window.kakao.maps.services.Status.OK) {
                setKeyword(data);

         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가
        const bounds = new kakao.maps.LatLngBounds()
        let markers = []

        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name + data[i].address_name + data[i].phone
          })
         
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        setMarkers(markers)

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds)

            }
        });
    }
};

  
  return (
    <>
    
        <div>
            <input className="InputStyle"
                type="text"
                value={keyword}
                id="keyword"
                placeholder="00 맛집을 입력해주세요"
                onChange={onChangeSearch}
            />
        </div>
        <div>
            <FcSearch size="50" className="SearchButton"onClick={handleSerarch}>검색</FcSearch>
        </div>
         <Map // 로드뷰를 표시할 Container
          center={state.center}
          style={{
             width: "100%",
            height: "670px",
         }}
        level={4}
        onCreate={setMap}
        >

        {!state.isLoading && (
              <MapMarker position={state.center}>
                <div style={{ padding: "5px", color: "#000" }}>
                {state.errMsg ? state.errMsg : "현재 위치 입니다."}
                </div>
              </MapMarker>
            )}
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info &&info.content === marker.content && (
            <div style={{color:"#000"}}>{marker.content}</div>
          )}
        </MapMarker>
      ))}
    </Map>
    </>
   
  )
};


export default SearchMap;