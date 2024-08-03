import { useState, useEffect, useContext } from "react";
import { UserDetailsDTO } from "../../types/users/userDTOs";
import { AuthContext } from "../../contexts/AuthContext";
import { Spin } from "antd";
import "../../assets/styles/Profile.css";
import axios from "axios";
import UserCard from "./UserCard";

export default function Profile() {
  const [userDetails, setUserDetails] = useState<UserDetailsDTO>(
    {} as UserDetailsDTO
  );
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await axios.get<UserDetailsDTO>(
        `${import.meta.env.VITE_API_URL}/api/Users/getUserDetails/${
          authContext?.user?.username
        }`
      );
      setUserDetails(response.data);
    };

    fetchUserDetails();
  }, [authContext?.user?.username]);

  return (
    <div className="profile-container">
      {authContext?.user?.username ? (
        <UserCard userDetails={userDetails} />
      ) : (
        <Spin />
      )}
    </div>
  );
}
