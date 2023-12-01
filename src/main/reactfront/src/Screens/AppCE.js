import React, { useState } from 'react';
import axios from 'axios';

const AppCE = () => {
  const [foodName, setFoodName] = useState('');
  const [foodList, setFoodList] = useState([]);
  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:8080/compare-food', {
        foodName: foodName,
      });

      // 서버 응답에서 파일 경로를 콘솔에 출력
      console.log("Server Response:", response.data);

      setFoodList(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Food Comparison</h1>
      <input
        type="text"
        placeholder="Enter food name"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleClick}>Search</button>
      {foodList.length > 0 && (
        <table style={{ marginTop: '20px', borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Ingredient</th>
              <th>Profile</th>
              <th>Calorie</th>
              <th>Protein</th>
              <th>Fat</th>
              <th>Carbohydrate</th>
              <th>Sugars</th>
              <th>Calcium</th>
              <th>Iron</th>
              <th>Potassium</th>
              <th>Salt</th>
            </tr>
          </thead>
          <tbody>
            {foodList.map((food, index) => (
              <tr key={index}>
                <td>{food.foodname}</td>
                <td>
                  {food.foodimagepath ? (
                    <img
                    src={food.foodimagepath}
                    alt={food.foodname}
                    style={{ width: '100px', height: '100px' }}
                    />
                  ) : (
                    'No image'
                  )}
                </td>
                <td>{food.foodingredient}</td>
                <td>{truncateText(food.foodprofile, 50)}</td>
                <td>{food.foodcalorie}</td>
                <td>{food.foodprotein}</td>
                <td>{food.foodfat}</td>
                <td>{food.foodcarbohydrate}</td>
                <td>{food.foodsugars}</td>
                <td>{food.foodcalcium}</td>
                <td>{food.foodiron}</td>
                <td>{food.foodpotassium}</td>
                <td>{food.foodsalt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    
  );
};


export default AppCE;