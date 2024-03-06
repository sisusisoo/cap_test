# cap_test

java관련 수정목록 4개

foodcontroller
foodDTO
foodEntity
foodservice--> findbyname


--korfood추가
--foodimagepath-> foodimage



react관련 수정 목록 1개

menudetail

   <h2>{food.id}</h2>
   <img src={food.foodimagepath} alt={food.caption} /> 
   <h1>{food.foodname}</h1>

--->

	<h2>{food.id}</h2>
        <img src={food.foodimagepath} alt={food.caption} />
        <h1>{food.korfoodname}</h1>
