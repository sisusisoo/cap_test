import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 5vw;
  font-size: 4vw;
  font-weight: bold;
`;

const GetUserLocation = () => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Google Maps Geocoder 객체 생성
          const geocoder = new window.google.maps.Geocoder();

          // 좌표를 주소로 변환
          const latLng = new window.google.maps.LatLng(latitude, longitude);
          geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                setAddress(results[0].formatted_address);
              }
            } else {
              console.log("Geocoder failed due to: " + status);
            }
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  }, []);

  return (
    <Wrapper>
      <p>{address}</p>
    </Wrapper>
  );
};

export default GetUserLocation;
