import { useState, useEffect, useContext } from "react";
import { UserDetailsDTO } from "../../types/users/userDTOs";
import { AuthContext } from "../../contexts/AuthContext";
import { Spin } from "antd";
import "../../assets/styles/Profile.css";
import axios from "axios";
import UserCard from "./UserCard";
import { RecipeDTO } from "../../types/recipes/recipeDTOs";
import { UsersReviewsDTO } from "../../types/reviews/reviewDTOs";
import ProfileTable from "./ProfileTable";
import { useParams } from "react-router-dom";

export default function Profile() {
  const [userDetails, setUserDetails] = useState<UserDetailsDTO>(
    {} as UserDetailsDTO
  );
  const [segment, setSegment] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<RecipeDTO[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<RecipeDTO[]>([]);
  const [reviews, setReviews] = useState<UsersReviewsDTO[]>([]);
  const authContext = useContext(AuthContext);
  const { username } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await axios.get<UserDetailsDTO>(
        `${import.meta.env.VITE_API_URL}/api/Users/getUserDetails/${username}`
      );
      setUserDetails(response.data);
    };

    fetchUserDetails();
  }, [username]);

  return (
    <div className="profile-container">
      {authContext?.user?.username ? (
        <>
          <div className="profile-user-container">
            <UserCard
              userDetails={userDetails}
              segment={segment}
              setSegment={setSegment}
              setRecipes={setRecipes}
              setLikedRecipes={setLikedRecipes}
              setReviews={setReviews}
            />
            <ProfileTable
              userDetails={userDetails}
              segment={segment as string}
              recipes={recipes}
              likedRecipes={likedRecipes}
              reviews={reviews}
              setReviews={setReviews}
            />
          </div>
        </>
      ) : (
        <Spin />
      )}
    </div>
  );
}
