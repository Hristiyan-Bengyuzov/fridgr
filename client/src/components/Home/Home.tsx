import { useNavigate } from "react-router-dom";
import HeroImg from "../../assets/images/hero.png";
import "../../assets/styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-hero">
      <div className="home-container">
        <div className="text-container">
          <h1 className="browse-title">Browse through our delicous recipes!</h1>
          <p className="food-description">
            Are you tired of staring at your pantry, wondering what to cook? Say
            goodbye to meal planning stress and hello to delicious discoveries!
            Enter the ingredients in your fridge and cook away!
          </p>
          <button
            type="button"
            className="btn browse-btn"
            onClick={() => navigate("/recipes")}
          >
            Start browsing
          </button>
        </div>
        <div className="hero-wrapper">
          <img className="hero-img" src={HeroImg} alt="" />
        </div>
      </div>
    </div>
  );
}
