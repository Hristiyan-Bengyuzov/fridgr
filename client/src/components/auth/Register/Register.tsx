import { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/es/upload/interface";
import RegisterFormValues from "../../../types/auth/Register/RegisterFormValues";
import "../../../assets/styles/Register.css";

export default function Register() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = async (values: RegisterFormValues) => {
    const formData = new FormData();

    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    if (values.image && values.image[0]) {
      formData.append("image", values.image[0].originFileObj as any);
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/Authentication/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form
      className="register-form"
      onFinish={onFinish}
      scrollToFirstError
      initialValues={{ image: fileList }}
    >
      <h1 className="register-title">Create an account</h1>

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
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "The input is not valid E-mail!" },
        ]}
        hasFeedback
      >
        <Input placeholder="Email" />
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

      <Form.Item
        name="confirm"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>

      <Form.Item
        name="image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: "Please upload your avatar!" }]}
      >
        <Upload
          name="image"
          listType="picture"
          maxCount={1}
          fileList={fileList}
          beforeUpload={() => false}
          onChange={handleChange}
        >
          <Button icon={<UploadOutlined />}>Upload Avatar</Button>
        </Upload>
      </Form.Item>

      <div className="register-btn-container">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
