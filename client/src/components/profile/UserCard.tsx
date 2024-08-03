import { UserDetailsDTO } from '../../types/users/userDTOs';
import { Card, Avatar, Statistic, Row, Col} from "antd";

interface UserCardProps {
    userDetails: UserDetailsDTO
}

export default function UserCard({userDetails}: UserCardProps) {
  return (
    <Card
    className="dark-bg no-border"
    style={{ width: "80%", textAlign: "center" }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar
        src={userDetails.image}
        size={128}
        style={{ marginRight: 16 }}
      />
      <h2 className="white-text" style={{ fontSize: "2em" }}>
        {userDetails.username}
      </h2>
    </div>
    <Row gutter={16} style={{ marginTop: 32 }}>
      <Col span={8}>
        <Statistic
          title={
            <span className="white-text" style={{ fontSize: "1.5em" }}>
              Liked Recipes
            </span>
          }
          value={userDetails.likedRecipesCount}
          valueStyle={{ fontSize: "2em" }}
        />
      </Col>
      <Col span={8}>
        <Statistic
          title={
            <span className="white-text" style={{ fontSize: "1.5em" }}>
              Reviews
            </span>
          }
          value={userDetails.reviewsCount}
          valueStyle={{ fontSize: "2em" }}
        />
      </Col>
      <Col span={8}>
        <Statistic
          title={
            <span className="white-text" style={{ fontSize: "1.5em" }}>
              Recipes
            </span>
          }
          value={userDetails.recipesCount}
          valueStyle={{ fontSize: "2em" }}
        />
      </Col>
    </Row>
  </Card>
  )
}
