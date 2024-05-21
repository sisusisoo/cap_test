import { useEffect, useState } from "react";
import RestaurantItem from "./RestaruantItem";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

function RestaurantList({ type }) {
  const [restaurants, setRestaurants] = useState([]);
  const [keyword, setKeyword] = useState("all");

  useEffect(() => {
    console.log(type);
    setKeyword(type);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const service = new window.google.maps.places.PlacesService(document.createElement('div'));

          service.nearbySearch(
            {
              location: { lat: lat, lng: lng },
              radius: 5000,
              type: 'restaurant',
              keyword: keyword // keyword 값을 category로 변경
            },
            (results, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const sorted = getRestaurantInfo(results, lat, lng);
                setRestaurants(sorted);
                //console.log(sorted);
              } else {
                console.error('Failed to fetch restaurants.');
              }
            }
          );
        },
        () => {
          console.error('Failed to get current location.');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [keyword]); // useEffect 내에서 category 값이 변경될 때만 실행

  // 거리순으로 정렬된 배열을 반환하는 함수
  function getRestaurantInfo(places, userLat, userLng) {
    return places.map((place, index) => {
      const distance = calculateDistance(userLat, userLng, place.geometry.location.lat(), place.geometry.location.lng());
      return {
        index: index,
        place: place,
        distance: distance,
      };
    }).sort((a, b) => a.distance - b.distance); // 거리순으로 정렬
  }
  
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const latDiff = lat2 - lat1;
    const lonDiff = lon2 - lon1;

    const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) * 111.32;

    return distance * 1000;
  }

  return (
    <div>
      <Wrapper>
        {restaurants.map((restaurant, index) => (
          <RestaurantItem
            key={index}
            restaurant={restaurant.place}
            distance={restaurant.distance}
          />
        ))}
      </Wrapper>
    </div>
  );
}

export default RestaurantList;
