import styled, { css } from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import '../style/ggmapApi.css';
import { Link } from "react-router-dom";

// Styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; // Full height of the viewport.
`;

const SearchForm = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
  margin-bottom: 3px;
  z-index: 1000;

`;

const InputKeyword = styled.input`
  width: 60%;
  padding: 10px; /* 입력창 패딩 추가 */
  font-size: 16px; /* 폰트 크기 조정 */
  border: 1px solid #ccc; /* 테두리 추가 */
  border-radius: 5px; /* 테두리를 둥글게 만듦 */
  margin-right: 10px; /* 오른쪽 여백 추가 */
`;

const ButtonKeyword = styled.button`
  padding: 10px 20px; /* 버튼 내부 여백 추가 */
  font-size: 16px; /* 폰트 크기 조정 */
  background-color: #c35050; /* 배경색 변경 */
  color: #fff; /* 텍스트 색상 변경 */
  border: none; /* 테두리 제거 */
  border-radius: 5px; /* 테두리를 둥글게 만듦 */
  cursor: pointer;
`;

const MapContainer = styled.div`
  top: 8vh; /* SearchForm의 높이만큼 밀어내기 */
  width: 100%;
  height: ${props => props.expanded ? '56vh' : '86vh'};
  position: fixed; /* 고정 위치 */
  overflow: hidden;
`;

const CategoryButtonContainer = styled.div` // Container for buttons within the info container.
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  // 추가된 스타일
  button {
    background-color: white; /* 배경색 변경 */
    color: #c35050; /* 텍스트 색상 변경 */
    border: 1px solid black; /* 얇은 테두리 추가 */

    border-radius: 5px; /* 테두리를 둥글게 만듦 */
    padding: 3px 5px; /* 버튼 내부 여백 추가 */
    font-size: 15px; /* 폰트 크기 조정 */
    font-weight: bold; /* 텍스트 굵게 설정 */
    cursor: pointer;
  }
  button:active {
    background-color: #dc143c; /* 클릭 상태일 때 배경색 변경 */
  }
`;

const PositionButtonContainer = styled.div`
  position: absolute;
  bottom: 15px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const RoundButton = styled.button`
  color: #fff; /* 텍스트 색상 변경 */
  border: none; /* 테두리 제거 */
  border-radius: 50%; /* 테두리를 원형으로 만듦 */
  padding: 10px; /* 버튼 내부 여백 추가 */
  font-size: 16px; /* 폰트 크기 조정 */
  cursor: pointer;
  width: 40px; /* 원의 지름 설정 */
  height: 40px; /* 원의 지름 설정 */
  display: flex;
  align-items: center;
  justify-content: center;

  // 조건부 스타일 적용
  background-color: ${(props) => (props.id === 'kmu' ? '#6c94fb' : '#c35050')};

`;

const InfoContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
  background: #fff;
  z-index: 1000;
  transition: height 0.5s ease;
  border-top: 1px solid #dee2e6; /* 얇은 밑줄 추가 */

  ${props => props.expanded && css`
    height: 36vh;
  `}
`;

const ButtonContainer = styled.div` // Container for buttons within the info container.
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  // 추가된 스타일
  button {
    background-color: #c35050; /* 배경색 변경 */
    color: #fff; /* 텍스트 색상 변경 */
    border: none; /* 테두리 제거 */
    border-radius: 5px; /* 테두리를 둥글게 만듦 */
    padding: 5px 10px; /* 버튼 내부 여백 추가 */
    font-size: 16px; /* 폰트 크기 조정 */
    cursor: pointer;
  }
`;

const DetailContainer = styled.div`
  background-color: #ffffff; /* 배경색 흰색 */
  padding: 10px;
  padding-left: 20px;
  border-radius: 10px;
`;

const StyledLink = styled(Link)`
  color: #c35050;
  text-decoration: underline #c35050;
`;

const DetailTitle = styled.h3`
  font-size: 20px;
`;

const DetailInfo = styled.div`
  color: #666666; /* 글자색 회색 */
  font-size: 15px;
  margin-bottom: 5px;
`;

// GoogleMap
export default function GoogleMap() {
    // State variables declaration
    // 상태 변수 선언
    const [markers, setMarkers] = useState([]); // Markers array state
    const [selectedPlaceDetails, setSelectedPlaceDetails] = useState(null); // Selected place details state
    const [map, setMap] = useState(null); // Map state

    const [isExpanded, setIsExpanded] = useState(false); // Expanded state

    const [highlightedMarker, setHighlightedMarker] = useState(null); // Highlighted marker state
    const [searchKeyword, setSearchKeyword] = useState(''); // Search keyword state

    // 유저 위치 정보를 저장하는 변수 추가 ( 현재 위치 vs 계명대 )
    const [userLocation, setUserLocation] = useState(null);


    const markersRef = useRef([]); // 기존 마커 제거를 위해 저장하는 마커

    // [#1] 사용자 위치 기반 지도 초기화
    useEffect(() => {
        const container = document.getElementById('map');

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setUserLocation({ latitude: lat, longitude: lng });
                const options = {
                    center: { lat: lat, lng: lng },
                    zoom: 15,
                    disableDefaultUI: true // 기본 UI(확대/축소 컨트롤 등) 비활성화
                };

                const mapInstance = new window.google.maps.Map(container, options);
                setMap(mapInstance);

                const currentLocation = new window.google.maps.LatLng(lat, lng);
                const marker = new window.google.maps.Marker({
                    position: currentLocation,
                    map: mapInstance,
                    title: "Current Location",
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                        scaledSize: new window.google.maps.Size(40, 40) // 아이콘 크기를 64x64로 설정
                    }
                });
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    // [#2] 지도 중심 위치 설정 ( 사용자 vs 계명대 )
    const handleRoundButtonClick = (locationType) => {
        if (locationType === "me") {
            // Me 버튼 클릭 시 유저의 현재 위치를 가져와 저장
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setUserLocation({ latitude: lat, longitude: lng });

                    // 사용자의 현재 위치로 지도 이동
                    if (map) {
                        const currentLocation = new window.google.maps.LatLng(lat, lng);
                        map.panTo(currentLocation);
                    }
                });
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        }
        else if (locationType === "kmu") {
            // KMU 위치를 저장하고 직접 좌표를 사용하여 지도 이동 및 마커 생성
            const kmuLat = 35.8558462;
            const kmuLng = 128.4889252;
            setUserLocation({
                latitude: kmuLat,
                longitude: kmuLng
            });

            // KMU 위치로 지도 이동
            if (map) {
                const kmuLocation = new window.google.maps.LatLng(kmuLat, kmuLng);
                map.panTo(kmuLocation);

                // KMU 위치에 마커 생성
                const marker = new window.google.maps.Marker({
                    position: kmuLocation,
                    map: map,
                    title: "KMU",
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                        scaledSize: new window.google.maps.Size(40, 40) // 아이콘 크기를 40x40로 설정
                    }
                });
            }
        }


    };

    // [#3] 마커 설정
    const fetchPlaceDetails = (placeId, marker) => {
        const service = new window.google.maps.places.PlacesService(map);
        service.getDetails({ placeId }, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setSelectedPlaceDetails(place);
                setIsExpanded(true);

                // 이 부분에서 마커의 아이콘을 변경합니다.
                // 마커의 아이콘을 변경하고 크기를 36x36으로 설정합니다.
                marker.setIcon({
                    url: 'http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png',
                    scaledSize: new window.google.maps.Size(36, 36)
                });

                //console.log(marker);
                //console.log(highlightedMarker);

                // 이전 상태를 활용하여 highlight 마커를 업데이트합니다.
                // React의 상태 업데이트 함수는 이전 상태를 활용하는 함수형 업데이트를 사용
                setHighlightedMarker(prevMarker => {
                    if (prevMarker && prevMarker !== marker) {
                        prevMarker.setIcon({
                            url: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
                            scaledSize: new window.google.maps.Size(36, 36)
                        });
                    }
                    return marker;
                });

                // 현재 선택된 마커를 highlightedMarker에 저장.
                setHighlightedMarker(marker);
                // 지도 중앙 보기
                map.panTo(marker.getPosition());
            }
        });
    };

    // [#4] 카테고리별 검색 버튼 클릭
    const handleButtonClick = (keyword) => {
        if (!userLocation) {
            console.error('Current location not available.');
            return;
        }

        //console.log(userLocation);
        const location = new window.google.maps.LatLng(userLocation.latitude, userLocation.longitude);
        window.searchPlaces(keyword, location);
        map.panTo(location);

        // 이전에 생성된 마커들 제거
        markersRef.current.forEach(marker => {
            marker.setMap(null);
        });

    };

    // [#5] 키워드 검색 버튼 클릭
    const handleSearch = (event) => {
        event.preventDefault();
        // console.log("handleSearch 함수가 호출되었습니다.");
        const keyword = searchKeyword;
        setIsExpanded(false); // Hide detail info when starting new search

        if (userLocation && map) {
            const location = new window.google.maps.LatLng(userLocation.latitude, userLocation.longitude);
            window.searchPlaces(keyword, location);
            map.panTo(location); //
        }

        // 이전에 생성된 마커들 제거
        markersRef.current.forEach(marker => {
            marker.setMap(null);
        });
    };



    // 검색 기능과 지도 초기화를 위한 효과 훅
    useEffect(() => {
        if (!map) return;

        const searchPlaces = (keyword, location) => {
            if (!keyword || !location) {
                return;
            }

            setIsExpanded(false); // Hide info container when searching

            const request = {
                query: keyword,
                location: location,
                radius: 3000,
            };

            const placesService = new window.google.maps.places.PlacesService(map);
            placesService.textSearch(request, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    const newMarkers = [];

                    results.forEach((place, index) => {
                        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                            location,
                            place.geometry.location
                        );


                        if (distance <= 5000) {
                            const marker = new window.google.maps.Marker({
                                position: place.geometry.location,
                                map: map,
                                title: place.name,
                                icon: {
                                    url: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
                                    scaledSize: new window.google.maps.Size(36, 36) // 아이콘 크기를 48x48로 설정
                                }
                            });

                            marker.addListener('click', function () {
                                fetchPlaceDetails(place.place_id, marker);
                            });

                            newMarkers.push(marker);
                        }
                    });
                    markersRef.current = newMarkers;
                    setMarkers(newMarkers);
                } else {
                    alert('No results found!');
                }
            });
        };

        window.searchPlaces = searchPlaces;
    }, [map]);


    // 마커 클릭시 생성되는 식당 정보 창 닫기
    const handleCloseInfo = () => {
        setSelectedPlaceDetails(null);
        setIsExpanded(false);

        // 마커의 아이콘을 파란색으로 변경
        if (highlightedMarker) {
            highlightedMarker.setIcon({
                url: 'http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png',
                scaledSize: new window.google.maps.Size(36, 36)
            });
        }
        setMarkers(highlightedMarker);

    };


    const handleContainerClick = () => {
        setIsExpanded(!isExpanded); // 토글링
    };

    return (
        <Wrapper>


            <SearchForm>
                <InputKeyword
                    type="text"
                    id="keyword"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Enter keyword..."
                    size="15"
                />
                <ButtonKeyword id="searchButton" type="button" onClick={handleSearch}>Search</ButtonKeyword>
                {/* 작은 버튼 추가 */}
            </SearchForm>


            <MapContainer expanded={isExpanded}>
                <div id="map" style={{ width: '100%', height: '100%' }}></div>
                <CategoryButtonContainer>
                    <button onClick={() => handleButtonClick('korean restaurant')}>Korean restaurant</button>
                    <button onClick={() => handleButtonClick('japanese restaurant')}>Japanese restaurant</button>
                    <button onClick={() => handleButtonClick('chinese restaurant')}>Chinese restaurant</button>
                    <button onClick={() => handleButtonClick('western restaurant')}>Western restaurant</button>
                    <button onClick={() => handleButtonClick('dessert')}>Dessert</button>
                </CategoryButtonContainer>
                <PositionButtonContainer type="button">
                    <RoundButton id="kmu" onClick={() => handleRoundButtonClick("kmu")}>KMU</RoundButton>
                    <RoundButton id="myLocation" onClick={() => handleRoundButtonClick("me")}>Me</RoundButton>
                </PositionButtonContainer>
            </MapContainer>


            {isExpanded && (
                <InfoContainer expanded={isExpanded}>
                    <ButtonContainer>
                        <button onClick={handleCloseInfo}>Close</button>
                    </ButtonContainer>
                    {selectedPlaceDetails ? (
                        <DetailContainer>
                            <DetailTitle>
                                <StyledLink to={`/main/menulist/${selectedPlaceDetails.place_id}?name=${selectedPlaceDetails.name}&star=${selectedPlaceDetails.rating}&location=${selectedPlaceDetails.vicinity}&img=${selectedPlaceDetails.photos}`}>
                                    {selectedPlaceDetails.name}
                                </StyledLink>
                            </DetailTitle>
                            <DetailInfo>
                                Address: {selectedPlaceDetails.formatted_address.replace("대한민국", "")}
                            </DetailInfo>
                            <DetailInfo>Phone: {selectedPlaceDetails.formatted_phone_number || 'None'}</DetailInfo>
                            <DetailInfo>
                                Opening Hours:
                                {selectedPlaceDetails.opening_hours && selectedPlaceDetails.opening_hours.weekday_text ? (
                                    <ul>
                                        {selectedPlaceDetails.opening_hours.weekday_text.map((hours, index) => (
                                            <li key={index}>{hours}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    'None'
                                )}
                            </DetailInfo>
                        </DetailContainer>
                    ) : null}
                </InfoContainer>
            )}


        </Wrapper>
    );
}