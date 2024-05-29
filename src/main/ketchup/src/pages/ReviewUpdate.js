import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase_db"; // Firebase 설정 파일에서 database 임포트
import TextField from "../component/TextField";

// 리뷰 수정 페이지
const ReviewUpdate = () => {
  const { reviewId } = useParams();
  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const reviewSnapshot = await database
          .ref(`RestrauntReview/${reviewId}`)
          .once("value");
        const review = reviewSnapshot.val();
        setReviewData(review);
      } catch (error) {
        console.error("리뷰 데이터를 불러오는 데 실패했습니다.:", error);
      }
    };

    fetchReviewData();
  }, [reviewId]);

  return reviewData ? (
    <TextField buttonText="수정" reviewData={reviewData} />
  ) : (
    <div>로딩 중...</div>
  );
};

export default ReviewUpdate;
