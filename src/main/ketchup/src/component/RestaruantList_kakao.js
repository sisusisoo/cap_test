import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import RestaruantItem from "./RestaruantItem";

const { kakao } = window;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

function RestaurantList({ type }) {
  const [restaurants, setRestaurants] = useState([]);
  const positionRef = useRef(null); // useRef를 사용하여 위치 정보 저장
  //console.log(type); // 카테고리 출력
  useEffect(() => {
    // 브라우저가 geolocation을 지원하는지 확인
    if (navigator.geolocation) {
      // 현재 위치를 가져옴
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude; // 현재 위도
          const lng = position.coords.longitude; // 현재 경도
          positionRef.current = position;
          // 카카오 맵 API의 Places 객체 생성
          const ps = new kakao.maps.services.Places();

          // 내 위치 기반으로 3km 이내의 은행 검색
          ps.categorySearch('FD6', placesSearchCB, {
            location: new kakao.maps.LatLng(lat, lng), // 현재 위치 설정
            radius: 5000, // 검색 반경 (미터 단위)
            //size: 15, // 한 페이지에 보여질 목록 개수
            //page: 45, // 검색할 페이지
          });
        },
        // 위치 정보를 가져오는데 실패한 경우
        () => {
          console.error('위치 정보를 가져오는데 실패했습니다.');
        }
      );
    } else {
      console.error('브라우저가 geolocation을 지원하지 않습니다.');
    }

    // 검색 결과를 받아온 후 처리하는 콜백 함수
    function placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        const sorted = getResInfo(data);
        setRestaurants(sorted);
        //console.log(sorted);
        //console.log(sorted.category_name);
        //setRestaurants(data);
      } else {
        console.error('검색에 실패했습니다.');
      }
    }
    function getResInfo(places) {
      // 거리와 장소 정보를 저장할 배열 초기화
      var distancesWithPlaces = [];

      // 검색된 장소마다 거리를 계산하고 배열에 추가
      for (var i = 0; i < places.length; i++) {
        //var distance = calculateDistance(placePosition, positionRef);      
        //console.log(type);
        if (type === "전체"){ // 모든 요소 출력
          distancesWithPlaces.push({
            index: i,
            distance: places[i].distance,
            place: places[i], // 장소 객체 자체를 저장
          });// 장소의 위치를 저장         
        } 
        else if (places[i].category_name.includes(type)) { // 한식, 양식, 중식, 디저트 출력
          distancesWithPlaces.push({
            index: i,
            distance: places[i].distance,
            place: places[i], // 장소 객체 자체를 저장
          });// 장소의 위치를 저장
        }
        /*
        typeof type === 'undefined' || 
        //console.log(type);
        if(places[i].category_name.includes(type)){
          distancesWithPlaces.push({
            index: i,
            distance: places[i].distance,
            place: places[i], // 장소 객체 자체를 저장
            placePosition: placePosition // 장소의 위치를 저장
          });
        }
        */
        //console.log(places[i].category_name);

      }

      // 거리를 기준으로 정렬
      distancesWithPlaces.sort(function (a, b) {
        return a.distance - b.distance;
      });
      // console.log(distancesWithPlaces);
      return distancesWithPlaces;
    }
  }, []);

  return (
    <div>
      <Wrapper>
        {/* 검색 결과를 화면에 출력 */}
        {restaurants.map((restaurant, index) => (
          <RestaruantItem
            key={index}
            restaurant={restaurant} // restaurant 객체만 전달
          />
        ))}
      </Wrapper>
    </div>
  );
}

export default RestaurantList;