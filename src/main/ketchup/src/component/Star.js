import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { propTypes } from "react-bootstrap/esm/Image";

const Star = ({ rating }) => {
  const numericRating = parseFloat(rating); // rating 값을 숫자로 변환
  //console.log("Rating value:", numericRating); 

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Rating
        name="half-rating-read"
        defaultValue={0}
        value={numericRating}
        precision={0.1} // 반별 단위로 별점이 표시
        readOnly
      />
    </Stack>
  );
};

export default Star;
