import React from 'react';

const Nutrition = ({food}) => {
    return (
        <div>
            <h3>{food.foodingredient}</h3>
            <h3>{food.foodcalorie}</h3>
            <h3>{food.foodprotein}</h3>
            <h3>{food.foodfat}</h3>
            <h3>{food.foodcarbohydrate}</h3>
            <h3>{food.foodsugars}</h3>
            <h3>{food.foodcalcium}</h3>
            <h3>{food.foodiron}</h3>
            <h3>{food.foodpotassium}</h3>
        </div>
    );
};

export default Nutrition;