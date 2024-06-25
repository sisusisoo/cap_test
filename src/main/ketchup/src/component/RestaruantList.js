import { useEffect, useState } from "react";
import RestaurantItem from "./RestaruantItem";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

function RestaurantList({ type, locationType }) {
  const [restaurants, setRestaurants] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    if (type === "all") {
      setKeyword("");
    } else {
      setKeyword(type);
    }

    if (locationType === "me") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setUserLocation({ latitude: lat, longitude: lng });
            fetchRestaurants(lat, lng, keyword);
          },
          () => {
            console.error('Failed to get current location.');
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    } else if (locationType === "kmu") {
      const kmuLat = 35.8558462;
      const kmuLng = 128.4889252;
      setUserLocation({ latitude: kmuLat, longitude: kmuLng });
      fetchRestaurants(kmuLat, kmuLng, keyword);
    }
  }, [type, locationType, keyword]);

  const fetchRestaurants = (lat, lng, keyword) => {
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch(
      {
        location: { lat: lat, lng: lng },
        radius: 5000,
        type: 'restaurant',
        keyword: keyword
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const sorted = getRestaurantInfo(results, lat, lng);
          setRestaurants(sorted);
        } else {
          console.error('Failed to fetch restaurants.');
        }
      }
    );
  };

  function getRestaurantInfo(places, userLat, userLng) {
    return places.map((place, index) => {
      const distance = calculateDistance(userLat, userLng, place.geometry.location.lat(), place.geometry.location.lng());
      return {
        index: index,
        place: place,
        distance: distance,
      };
    }).sort((a, b) => a.distance - b.distance);
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
