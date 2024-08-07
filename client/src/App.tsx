import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";
import Recipes from "./components/recipes/Recipes";
import { ConfigProvider } from "antd";
import CreateRecipe from "./components/recipes/CreateRecipe";
import RecipeDetails from "./components/recipes/RecipeDetails";
import EditRecipe from "./components/recipes/EditRecipe";
import Profile from "./components/profile/Profile";
import UserGuard from "./guards/UserGuard";
import GuestGuard from "./guards/GuestGuard";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
          borderRadius: 2,
        },
      }}
    >
      <Router>
        <div className="App" id={load ? "no-scroll" : "scroll"}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route element={<UserGuard />}>
              <Route path="/createRecipe" element={<CreateRecipe />} />
              <Route path="/editRecipe/:recipeId" element={<EditRecipe />} />
            </Route>
            <Route element={<GuestGuard />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
