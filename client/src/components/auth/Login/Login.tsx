import { Form, Input, Button } from "antd";
import LoginFormValues from "../../../types/auth/Login/LoginFormValues";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormValues) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/Authentication/login`,
      values
    );

    if (response) {
      authContext?.login(response.data);
      navigate("/");
    }
  };

  return (
    <div className="register-bg">
      <Form
        className="register-form"
        onFinish={handleSubmit}
        scrollToFirstError
      >
        <h1 className="register-title">Log into your account</h1>

        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Please input your username!" },
            { min: 8, message: "Username must be minimum 8 characters." },
            { max: 20, message: "Username must be max 20 characters." },
          ]}
          hasFeedback
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "Password must be minimum 8 characters." },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <div className="register-btn-container">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
