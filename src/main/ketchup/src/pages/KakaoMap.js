import styled from "styled-components";
import React, { useEffect } from "react";
import '../style/kakaoApi.css';

const { kakao } = window;

// 스타일링된 Wrapper 컴포넌트
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

// Kakao 컴포넌트 정의
export default function KakaoMap() {
    useEffect(() => {
        // 마커를 담을 배열입니다
        var markers = [];

        // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        const container = document.getElementById('map');

        // 사용자의 현재 위치를 가져오는 함수
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                // 지도 생성 옵션 설정
                const options = {
                    center: new kakao.maps.LatLng(lat, lng), // 사용자의 현재 위치를 중심으로 설정
                    level: 3 // 기본 확대 레벨
                };

                // 지도 생성 및 객체 리턴
                const map = new kakao.maps.Map(container, options);

                // 사용자의 현재 위치에 빨간색 마커를 표시합니다
                var userMarker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(lat, lng),
                    map: map,
                    image: new kakao.maps.MarkerImage(
                        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
                        new kakao.maps.Size(64, 69),
                        { offset: new kakao.maps.Point(27, 69) }
                    )
                });


                // 장소 검색 객체를 생성합니다
                if (!map) return
                const ps = new kakao.maps.services.Places();

                ps.categorySearch('FD6', placesSearchCB, {
                    location: new kakao.maps.LatLng(lat, lng),
                    radius: 3000,
                    size: 15, // 한 페이지에 보여질 목록 개수를 45개로 설정
                    page: 3, // 검색할 페이지
                });

                // 마커가 지도 위에 표시되도록 설정합니다
                userMarker.setMap(map);

                // 검색 버튼에 대한 클릭 이벤트 핸들러
                const searchButton = document.getElementById('searchButton');
                if (searchButton) {
                    searchButton.addEventListener('click', searchPlaces);
                }

                // 키워드 검색을 요청하는 함수입니다
                function searchPlaces() {

                    var keyword = document.getElementById('keyword').value;

                    if (!keyword.replace(/^\s+|\s+$/g, '')) {
                        alert('키워드를 입력해주세요!');
                        return false;
                    }

                    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
                    ps.keywordSearch(keyword, placesSearchCB);
                }

                // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
                function placesSearchCB(data, status, pagination) {
                    if (status === kakao.maps.services.Status.OK) {
                        // 정상적으로 검색이 완료됐으면
                        // 검색 목록과 마커를 표출합니다
                        displayPlaces(data);

                        // 페이지 번호를 표출합니다
                        displayPagination(pagination);

                    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

                        alert('검색 결과가 존재하지 않습니다.');
                        return;

                    } else if (status === kakao.maps.services.Status.ERROR) {

                        alert('검색 결과 중 오류가 발생했습니다.');
                        return;

                    }
                }

                // 검색 결과 목록과 마커를 표출하는 함수입니다
                function displayPlaces(places) {

                    var listEl = document.getElementById('placesList'),
                        menuEl = document.getElementById('menu_wrap'),
                        fragment = document.createDocumentFragment(),
                        bounds = new kakao.maps.LatLngBounds()

                    // 검색 결과 목록에 추가된 항목들을 제거합니다
                    removeAllChildNods(listEl);

                    // 지도에 표시되고 있는 마커를 제거합니다
                    removeMarker();

                    // 거리와 장소 정보를 저장할 배열 초기화
                    var distancesWithPlaces = [];

                    // 검색된 장소마다 거리를 계산하고 배열에 추가
                    for (var i = 0; i < places.length; i++) {
                        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
                        var distance = calculateDistance(placePosition, position);
                        distancesWithPlaces.push({
                            index: i,
                            distance: distance,
                            place: places[i], // 장소 객체 자체를 저장
                            placePosition: placePosition // 장소의 위치를 저장
                        });
                    }
                    // 거리를 기준으로 정렬
                    distancesWithPlaces.sort(function (a, b) {
                        return a.distance - b.distance;
                    });


                    for (var i = 0; i < distancesWithPlaces.length; i++) {
                        var placePosition = distancesWithPlaces[i].placePosition,
                            distance = distancesWithPlaces[i].distance,
                            distanceText = distance < 1000 ? distance.toFixed(1) + 'm' : (distance / 1000).toFixed(1) + 'km';

                        // 마커를 생성하고 지도에 표시합니다
                        var marker = addMarker(placePosition, i);
                        //  function addMarker(position, idx, title) {
                        var itemEl = getListItem(i, distancesWithPlaces[i].place, distanceText); // 검색 결과 항목 Element를 생성합니다

                        // 추가한 코드
                        console.log("마커 위치: " + placePosition.toString());
                        console.log("위도: " + position.coords.latitude);
                        console.log("경도: " + position.coords.longitude);

                        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                        // LatLngBounds 객체에 좌표를 추가합니다
                        bounds.extend(placePosition);

                        // 마커와 검색결과 항목에 mouseover 했을때
                        // 해당 장소에 인포윈도우에 장소명을 표시합니다
                        // mouseout 했을 때는 인포윈도우를 닫습니다
                        (function (marker, title) {
                            kakao.maps.event.addListener(marker, 'mouseover', function () {
                                displayInfowindow(marker, title);
                            });

                            kakao.maps.event.addListener(marker, 'mouseout', function () {
                                infowindow.close();
                            });

                            itemEl.onmouseover = function () {
                                displayInfowindow(marker, title);
                            };

                            itemEl.onmouseout = function () {
                                infowindow.close();
                            };
                        })(marker, distancesWithPlaces[i].place.place_name);

                        fragment.appendChild(itemEl);
                    }

                    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
                    listEl.appendChild(fragment);
                    menuEl.scrollTop = 0;

                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                    map.setBounds(bounds);
                }

                // 검색결과 항목을 Element로 반환하는 함수입니다
                function getListItem(index, places, distanceText, callback) {

                    var el = document.createElement('li'),
                        itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
                            '<div class="info">' +
                            '   <h5>' + places.place_name + '</h5>';

                    if (places.road_address_name) {
                        itemStr += '    <span>' + places.road_address_name + '</span>' +
                            '   <span class="jibun gray">' + places.address_name + '</span>';
                    } else {
                        itemStr += '    <span>' + places.address_name + '</span>';
                    }

                    itemStr += '  <span class="tel">' + places.phone + '</span>' +
                        '</div>' +
                        '<div style="padding:5px;">현재 위치와 식당까지의 거리: ' + distanceText + '</div>'; // 거리 정보 추가


                    el.innerHTML = itemStr;
                    el.className = 'item';

                    return el;
                }

                // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
                function addMarker(position, idx, title) {
                    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
                        imgOptions = {
                            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                            spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                        },
                        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                        marker = new kakao.maps.Marker({
                            position: position, // 마커의 위치
                            image: markerImage
                        });

                    marker.setMap(map); // 지도 위에 마커를 표출합니다
                    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

                    return marker;
                }

                // 지도 위에 표시되고 있는 마커를 모두 제거합니다
                function removeMarker() {
                    for (var i = 0; i < markers.length; i++) {
                        markers[i].setMap(null);
                    }
                    markers = [];
                }

                // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
                function displayPagination(pagination) {
                    var paginationEl = document.getElementById('pagination'),
                        fragment = document.createDocumentFragment(),
                        i;

                    // 기존에 추가된 페이지번호를 삭제합니다
                    while (paginationEl.hasChildNodes()) {
                        paginationEl.removeChild(paginationEl.lastChild);
                    }

                    for (i = 1; i <= pagination.last; i++) {
                        var el = document.createElement('a');
                        el.href = "#";
                        el.innerHTML = i;

                        if (i === pagination.current) {
                            el.className = 'on';
                        } else {
                            el.onclick = (function (i) {
                                return function () {
                                    pagination.gotoPage(i);
                                }
                            })(i);
                        }

                        fragment.appendChild(el);
                    }
                    paginationEl.appendChild(fragment);
                }

                // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
                // 인포윈도우에 장소명을 표시합니다
                function displayInfowindow(marker, title) {
                    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                }

                // 검색결과 목록의 자식 Element를 제거하는 함수입니다
                function removeAllChildNods(el) {
                    while (el.hasChildNodes()) {
                        el.removeChild(el.lastChild);
                    }
                }

                // 마커와 현재 위치 간의 거리를 계산하는 함수
                function calculateDistance(markerPosition, userPosition) {
                    const lat1 = markerPosition.getLat();
                    const lon1 = markerPosition.getLng();
                    const lat2 = userPosition.coords.latitude;
                    const lon2 = userPosition.coords.longitude;

                    // 위도와 경도 차이
                    const latDiff = Math.abs(lat2 - lat1);
                    const lonDiff = Math.abs(lon2 - lon1);

                    // 대략적인 거리를 계산 (단위: km)
                    const approximateDistance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) * 111.32;

                    // m로 변환
                    return approximateDistance * 1000;
                }
            });
        }
        else {
            console.log("Geolocation is not supported by this browser.");
        }

    }, []);
    function handleSubmit(event) {
        event.preventDefault(); // 기본 제출 동작 방지
    }
    return (
        <Wrapper>
            <div className="map_wrap">
                <div id="map" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}></div>
                <div id="menu_wrap" className="bg_white">
                    <div className="option">
                        <div>
                            <form onSubmit={handleSubmit}>
                                키워드 : <input type="text" id="keyword" defaultValue="" size="15" />
                                <button id="searchButton" type="submit" >검색하기</button>
                            </form>
                        </div>
                    </div>
                    <hr />
                    <ul id="placesList"></ul>
                    <div id="pagination"></div>
                </div>
            </div>
        </Wrapper>
    );
}
