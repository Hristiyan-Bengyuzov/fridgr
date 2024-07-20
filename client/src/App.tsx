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
import { ConfigProvider } from "antd";

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
            <Route path="/about" />
            <Route path="/recipes" />
            <Route path="/login" />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
