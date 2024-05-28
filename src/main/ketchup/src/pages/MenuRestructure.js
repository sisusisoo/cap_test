import RestructureItem from "../component/RestructureItem";
import { useLocation } from "react-router-dom";

//메뉴판 이미지 업로드했을 때 메뉴판 재구성 화면
const MenuRestructure = () => {
  const location = useLocation();
  const { foodNamesList } = location.state; 
  console.log(foodNamesList);
  return (
    <div>
      {foodNamesList.map((foodname, index) => (
        <RestructureItem key={index} food={foodname} />
      ))}
    </div>
  );
};

export default MenuRestructure;