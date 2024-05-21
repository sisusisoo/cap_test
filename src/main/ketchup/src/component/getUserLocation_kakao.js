import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 5vw;
  font-size: 4vw;
  font-weight: bold;
`;
const { kakao } = window;

const GetUserLocation = () => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geocoder = new kakao.maps.services.Geocoder();

          geocoder.coord2Address(longitude, latitude, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              setAddress(result[0].address.address_name);
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
