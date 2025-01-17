import { List, Avatar, Rate, Pagination } from "antd";
import { ReviewDTO } from "../../types/reviews/reviewDTOs";
import { useNavigate } from "react-router-dom";

interface ReviewsListProps {
  reviews: ReviewDTO[];
  totalReviews: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

export default function ReviewsList({
  reviews,
  totalReviews,
  currentPage,
  handlePageChange,
}: ReviewsListProps) {
  const navigate = useNavigate();

  return (
    <div className="dark-bg" style={{ padding: 30 }}>
      <List
        itemLayout="horizontal"
        dataSource={reviews}
        renderItem={(review) => (
          <List.Item
            className="review-to-profile"
            onClick={() => navigate(`/profile/${review.username}`)}
          >
            <List.Item.Meta
              avatar={<Avatar src={review.image} />}
              title={review.username}
              description={
                <>
                  <p className="white-text">{review.text}</p>
                  <Rate disabled value={review.stars} />
                </>
              }
            />
          </List.Item>
        )}
      />
      <Pagination
        current={currentPage}
        pageSize={5}
        total={totalReviews}
        onChange={handlePageChange}
        style={{ marginTop: 16 }}
      />
    </div>
  );
}
