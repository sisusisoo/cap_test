import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FaSearchPlus } from "react-icons/fa";
import { DeployIP,DevIP } from "../DeploySetting"


const Box = styled.div`
  width: 90vw;
  border-top: 1px solid #dee2e6;

  //컴포넌트간 간격
  & {
    margin-top: 5vh;
  }
`;

const Wrapper = styled.div`
  display: flex;

  .image {
    margin: 2vh;
    border-radius: 5vw;
  }

  .container {
    display: flex;
    flex-direction: column;
  }
  .Name {
    margin-top: 3vh;
    margin-left: 20vw;
    font-size: 4vw;
  }

  .description {
    margin-left: 15vw;
    font-size: 3vw;
    color: #6d6b6b;
  }

  .search {
    margin-left: auto;
    display: flex;
    align-items: center;

    margin-left: 90%;
    &:hover {
      color: #c35050;
    }
  }
`;

const MenuItem = () => {
  const { id } = useParams();
  const [food, setFood] = useState([]);

  useEffect(() => {
    //id에 해당하는 음식 데이터 가져오기
    axios
      .get(DevIP+"/Restaruant/${id}")
      .then((res) => {
        const resData = res.data;

        //가져온 음식 데이터 설정
        setFood(resData.food);
      })
      .catch((error) => {
        alert("데이터를 가져오는 데 실패했습니다", error);
      });
  }, [id]);

  return (
    <>
      <div>
        {food.map((item) => (
          <Box key={item.Food_id}>
            <div>
              <Wrapper>
                <img
                  className="image"
                  src={item.FoodImage}
                  alt={item.caption}
                />
                <div className="container">
                  <h2 className="Name">{item.FoodName}</h2>
                  <p className="description">{item.FoodProfile}</p>
                  <Link
                    to={`/main/menulist/${id}/${item.Food_id}`}
                    key={item.Food_id}
                  >
                    <div className="search">
                      <FaSearchPlus size={25} />
                    </div>
                  </Link>
                </div>
              </Wrapper>
            </div>
          </Box>
        ))}
      </div>
    </>
  );
};

export default MenuItem;
