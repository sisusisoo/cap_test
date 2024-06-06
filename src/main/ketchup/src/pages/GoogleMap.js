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
                        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADDklEQVR4nO2Zy2sUQRDGyxdRfCCiRFEQREFQMCeNp5yEPWQz89XQUSGwt4DgSQUPHoISxJskHnz9BR704E28KL4SEb0IelUkmKigmE22OtGW3ixJIA961u7ZWfGDhmGm6Zlff9U1XTNE/7VQpqtroyTJSc18S5hfCjAmgK61MWEerl4DTti+lDcZYIcwXxfmsmY2Lq3W9/akUnsb/fxkCoUWYb4kwLgrwAIg6xbzFTsWNQSis3OrAI/rBVjEoedGqe2ZQghwUDN/9AUx24APduxMIEyx2BoEYh6MKRZbw0KUSmttCASD4Nl18yzomrELOzSEnoO5HC7F/kV2qgNEJpn3eAex74msIPTcernpFcIotUGAn1mDCDBu7+0NpLbtcH8A5oowD+gkOWJ6etbbZo+FedBeSzVWknR7A7H7oxTh8EmAQ0tOShS12T4pJuWGNxC7AXR2YhmI+TCuzggw5BPkiyPIgPOYwDXHMUf9gQDiFApxfNh1TA20u7pM3kAcwyBNhrF9HUNrwifIZ+8ghcImR0dGvIFo4F2jQksDb32C3HecvUHfi10z3/UGYjdwzuk3itqc0q9jAhHgoj+QJOlO9UJcBibtC7ECdHkDMUptE+CX683tbFdDB2i3CaCaoeL4qD3nnMq56vCUTQrkU5r5jbMrnpowP6FmLqr0XJie8w5SYd6fsRu/J5h3Uwhp4HWGII+CQFRBmE9lCHI8GEitUvyeAcSI6e1dQyElzFczcOQChVYZ2JW2XE3lBvDDRNFmykK2/AwI0k9ZqazUzhDfuAT4ZpTaQlnKbuYCOHKaspZRap3Xj9nA++CZailJkpR8gUzFcSc1Sqavb6VmfuVhbTykRktmiiRdNwRzucK8j/Igcawgl2hnKC8yhUKL/UhQhxvDRqlVlCdpoF2A6RQQFUmSA5RHCdCfwpGzlFeZjo7VAjx1yFIPbMajPKs8s6n8ukxIjdrfeNQMqsRxZEvVRZyYngKOUTNJM/ctsg05T80mQ7RCA3fmgdyz56gZZWZK4yFhfuH1pyb9w/oD8BlGPlZ8YpwAAAAASUVORK5CYII=',
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
                        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADNElEQVR4nO2Zz2sTQRTHn79Q8QciShWLm5mkKlVQEPxx8uRN9OaPk2fBkwoePASlluRN0ppW0OpfoKAHb+JF8VdbRC8FxUsxzXtJ2gqKbWlrdWWSWqr9wWw7s0nELzxYdpc3+9n3Y2Z2Af5rpnYmB9bJFJ2Riu9IpG6hqF8gjZdMUb9U1FW6pnKn9b1Qbdre0r9VIN2SioelYt/QhiXy3Wg6G6v080Ms83GlUHRNIg0FAPjDyhHjhPYFldCOFG2SSM8WCjADSPErD4tbQoWQKr9HIGdtQUyzT9p3KBDiRqHOEcQUjB7DKYQX712lU8AhhF+uG37ptGZKhe0YQv425GZnLXYx3WkBxT/W0FKQ1kEm54lwoqGmUqzDKkTjzeJagfQtbBCJNKTHtgYyuewI8iZHBXImovIH61R+jTZ9LBS36WtBfEVU/qQ9kNL6yBgiF0n37Z3Ll4e5ffoe81qh2/ZAkLpNIzEfxF8wZpFB6rQGIpAHDEEypj4lcruZTyraA1E8ZjRoIn/A1KeXLhwyjTJYAzFMgyAdRt9rllo8Yg1EIhVsg8Qyg+sNa4QtgvD7iqWWoh6bII/MBuU2B8X+wCZIs2lh6tZq1H5NGwjSVWsgenYNMiHOBxN0QoykcsetgcSu82ap6IcxjH7byO26DnQD0BbF3GF9zjQSslwf33VTAJuSit+ZPoA1Q34ONb2pUpNphXzJOoiXol3hRoN+RhR74EIC+W14MPQUXEkinwsLJJrMnXIGUl4f0ZcQ0or3d/grwKWE4lbXIAL5CrhWLNFXH3S7GgyCvnqtvRsgDOntp8Mib4Kw1JDObnPyjQv5c306uxHClF7MWU8rRechbNWns6stf8z+4LxTzSWp+Ky1aCTzx6BiivtLBfIbCyBPoNLySvsLGl8ExLBM9jVANUga7iBnTSnkC1AtipV/ivYEB6EuuO8vg2qSp7+KIE0EiMRoNJHfDdUoqajJfM7gi1CtOhL3lwvFLwxAHuuOB9WsmF5UKh6cO6WoqH/jQS0oinRCb1VngCBNiBQdhVqSRI7P0qUuQ83J95dIpHvTivuhPge1qEa9NUbqlEivrf7UhH9YvwB+OhtmFxFnCwAAAABJRU5ErkJggg==',
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
                    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADKElEQVR4nO2Z30tUQRTHp19YZBFRWBQEURAUJARlUZ7ZDWMfQp/mnF0NfAuCnizooQcpRHoL9SGrv6CgHnoQJPXMppmG1EtQr0VIWkGRhpm1MbuLRuo612bu3o2+cGC5e5l7P/ec852Ze4X4r/k6NlC7AVilpKZbkumpZBqXjNO5oHFgGjb/AWPSnCuiphPphu1S0w1gmpSaMjaRP/c2sNpT7PsXia5EmdR4FTRO2ALMC8ZpYLxmxhLFEHBqCzCllw0wD4gGgdW2kCHwgGR84wxirtxem7FDgYj3JCt8QPwOE+9JVniFAG5ca0rAF4SchcHHXnvGNLZvCDkXrd4s9q/cKXiJfTvZX7/bOYiZJ0LMRiZfYjedQgCrcqnpS+ggGifMtV2CpILdAE0BY5vsSx6p6T6z3oT5LTW1m/+CjBXTCp2BZNdO9hBvY714sMBDqTTnBOiVTncgZgFomYlCEH/AWGUGNA65A9H43rI52wKM2WE55pgzEGOFNheNp9Vh+zGxyjbLwhmIbRkEcJi8Ey7dJ0xfHYLgO9cgiaGGjXYgOOoMRGp8WbzSwhfuQJgeWNplu4dmv+cORFOrbWMaa7WyX0sDAcYrzkDM7BpkQiwEE3RCjOlkrTOQ44/UVmD8YQ2TfdrYYfrAGICJaq2O5o7ZZULm4rsxBeFSUtPzADfgKvqdQhRhU5XJZ/aicxDg1L5QQZh+xnrrdwkfkozPQsuGJi18CZjOhZaRNJFHEFUOmj75LyscPTRydo3wKanpeggZuSx8C7hhZ9DtaqDeYPwMXLfJO0gOhjo9grSIsBTvUTt8vOMCpo+nBtVmEabMYs4DyHkRtqoG1TqXL7NB0yvvTrWYZFo1OszGaVE0ZZpXgqYRByAPRbEFrCqzHzuXn4nJap3aK6IgabmDXCSaRFSU6EqUmZcEy8jGsLqrVokoCcxuUNNMAJeaivUm94soChhb7DOCF0RUBQyrQdPA0iWF3cbxRJQFuUXlhwIQY+YznigFyT6qM1vVBfpiplona0QpSWpsXiAjl0TJKSNWANOdWQjG++aYKEVBdmuMQ1LTE6cfNcU/rF9NQCQ2ISXBfwAAAABJRU5ErkJggg==',
                    scaledSize: new window.google.maps.Size(36, 36)
                });

                //console.log(marker);
                //console.log(highlightedMarker);

                // 이전 상태를 활용하여 highlight 마커를 업데이트합니다.
                // React의 상태 업데이트 함수는 이전 상태를 활용하는 함수형 업데이트를 사용
                setHighlightedMarker(prevMarker => {
                    if (prevMarker && prevMarker !== marker) {
                        prevMarker.setIcon({
                            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADMUlEQVR4nO2Zy2sUQRDG2xcqPhBRoigIoiAo6MnHyVMgYHarZ2GjnnILCOZgEpPujTAoQbxJkoOvv8CDHryJF8VXIqKXgF4VicZEnarZlajRkZqNJpBN0pP0zM6KHzQMM0P1/Ka6v34J8V8zdTY7uk5J76QCvK6BninAjxrwOxe+VkCD4TPHP8HvirSp4BS3asArSlJJSwpMSvldvKEy3q5qf79obQhWaokXtKSiKcCMwhmTeIljiWqorZE2aYkPFgwwA4iedOSLWxKF0I6/T0l8aw1iqrzh2MlAZPy6mCCmYDJ+XawQbnOwiptAjBDBpBE8jrXPTHbsWCH0lAlcjM9iF+NOUbMC+E3lvJ3WQXicSCwb8k/Ba1Yh3PzIWgXkJw9CRa7bGghPOyL+yXEN1KuyeKi9/v0aLnytJPWFzyLF8pvsgfD8yLRtS3zX5RT3zxarAMUD/E6EeFetgfAE0DQTc0FMh4mQmQF7IBJHjSoF6jWOCdRvFhNHrIGwFZpUWpDeQdOYBQcPm2ZZ2JJpM4jiMPyuYUa+WgNREj9YB2kYW2/U2QGH7YEAvqpi0xqyByLpjplVUp/tzq4Ab1kD4Qmcacdka50vXjiWGBqIAjxvD0T6TVEGxLlgIg+IWczaA8nTZgX407hy/ttA/dwP2ADCuZrEI3zPNBO6/FN+sCkIm1ISX5p+gLUC+FDU9KJK/s1sh32QHO1JFgR/dec+77AOEsJIfJFgNu7HAlEGoVPJgfjHYwMJ50dAXgLZGG5pCVaIOKUlXY4dRFK3iFudTml79OVqJAh04csGkYR4+RlbRgB7RFIqHCtti2OPSwF9cvPeRpGkeDJnv1l5p0XSOpMPVtvczFaSXsfuVLNJSWy2B4KNolpy3WCplvR88SB4T1RbBd6jCo/PFtykSudyuFukQdp4BVmxSbWJtKi1fCg6tAC7Hczng2UiTSrwrgjgRIR+Md6Z8feKNEoD9hiDALaLtMo9GixXgI/mh6C77HgizerkSSXQ2ByZGOFjPFEL6pIEvFStADGhHa9e1JKUJLeCS3WJ2lOwRAHenOZSt/meqEW55aODAQX01OqhpviH9RsZsrt+kSutwwAAAABJRU5ErkJggg==',
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
                                    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADMUlEQVR4nO2Zy2sUQRDG2xcqPhBRoigIoiAo6MnHyVMgYHarZ2GjnnILCOZgEpPujTAoQbxJkoOvv8CDHryJF8VXIqKXgF4VicZEnarZlajRkZqNJpBN0pP0zM6KHzQMM0P1/Ka6v34J8V8zdTY7uk5J76QCvK6BninAjxrwOxe+VkCD4TPHP8HvirSp4BS3asArSlJJSwpMSvldvKEy3q5qf79obQhWaokXtKSiKcCMwhmTeIljiWqorZE2aYkPFgwwA4iedOSLWxKF0I6/T0l8aw1iqrzh2MlAZPy6mCCmYDJ+XawQbnOwiptAjBDBpBE8jrXPTHbsWCH0lAlcjM9iF+NOUbMC+E3lvJ3WQXicSCwb8k/Ba1Yh3PzIWgXkJw9CRa7bGghPOyL+yXEN1KuyeKi9/v0aLnytJPWFzyLF8pvsgfD8yLRtS3zX5RT3zxarAMUD/E6EeFetgfAE0DQTc0FMh4mQmQF7IBJHjSoF6jWOCdRvFhNHrIGwFZpUWpDeQdOYBQcPm2ZZ2JJpM4jiMPyuYUa+WgNREj9YB2kYW2/U2QGH7YEAvqpi0xqyByLpjplVUp/tzq4Ab1kD4Qmcacdka50vXjiWGBqIAjxvD0T6TVEGxLlgIg+IWczaA8nTZgX407hy/ttA/dwP2ADCuZrEI3zPNBO6/FN+sCkIm1ISX5p+gLUC+FDU9KJK/s1sh32QHO1JFgR/dec+77AOEsJIfJFgNu7HAlEGoVPJgfjHYwMJ50dAXgLZGG5pCVaIOKUlXY4dRFK3iFudTml79OVqJAh04csGkYR4+RlbRgB7RFIqHCtti2OPSwF9cvPeRpGkeDJnv1l5p0XSOpMPVtvczFaSXsfuVLNJSWy2B4KNolpy3WCplvR88SB4T1RbBd6jCo/PFtykSudyuFukQdp4BVmxSbWJtKi1fCg6tAC7Hczng2UiTSrwrgjgRIR+Md6Z8feKNEoD9hiDALaLtMo9GixXgI/mh6C77HgizerkSSXQ2ByZGOFjPFEL6pIEvFStADGhHa9e1JKUJLeCS3WJ2lOwRAHenOZSt/meqEW55aODAQX01OqhpviH9RsZsrt+kSutwwAAAABJRU5ErkJggg==',
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
                url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADKElEQVR4nO2Z30tUQRTHp19YZBFRWBQEURAUJARlUZ7ZDWMfQp/mnF0NfAuCnizooQcpRHoL9SGrv6CgHnoQJPXMppmG1EtQr0VIWkGRhpm1MbuLRuo612bu3o2+cGC5e5l7P/ec852Ze4X4r/k6NlC7AVilpKZbkumpZBqXjNO5oHFgGjb/AWPSnCuiphPphu1S0w1gmpSaMjaRP/c2sNpT7PsXia5EmdR4FTRO2ALMC8ZpYLxmxhLFEHBqCzCllw0wD4gGgdW2kCHwgGR84wxirtxem7FDgYj3JCt8QPwOE+9JVniFAG5ca0rAF4SchcHHXnvGNLZvCDkXrd4s9q/cKXiJfTvZX7/bOYiZJ0LMRiZfYjedQgCrcqnpS+ggGifMtV2CpILdAE0BY5vsSx6p6T6z3oT5LTW1m/+CjBXTCp2BZNdO9hBvY714sMBDqTTnBOiVTncgZgFomYlCEH/AWGUGNA65A9H43rI52wKM2WE55pgzEGOFNheNp9Vh+zGxyjbLwhmIbRkEcJi8Ey7dJ0xfHYLgO9cgiaGGjXYgOOoMRGp8WbzSwhfuQJgeWNplu4dmv+cORFOrbWMaa7WyX0sDAcYrzkDM7BpkQiwEE3RCjOlkrTOQ44/UVmD8YQ2TfdrYYfrAGICJaq2O5o7ZZULm4rsxBeFSUtPzADfgKvqdQhRhU5XJZ/aicxDg1L5QQZh+xnrrdwkfkozPQsuGJi18CZjOhZaRNJFHEFUOmj75LyscPTRydo3wKanpeggZuSx8C7hhZ9DtaqDeYPwMXLfJO0gOhjo9grSIsBTvUTt8vOMCpo+nBtVmEabMYs4DyHkRtqoG1TqXL7NB0yvvTrWYZFo1OszGaVE0ZZpXgqYRByAPRbEFrCqzHzuXn4nJap3aK6IgabmDXCSaRFSU6EqUmZcEy8jGsLqrVokoCcxuUNNMAJeaivUm94soChhb7DOCF0RUBQyrQdPA0iWF3cbxRJQFuUXlhwIQY+YznigFyT6qM1vVBfpiplona0QpSWpsXiAjl0TJKSNWANOdWQjG++aYKEVBdmuMQ1LTE6cfNcU/rF9NQCQ2ISXBfwAAAABJRU5ErkJggg==',
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
