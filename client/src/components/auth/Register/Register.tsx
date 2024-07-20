import { useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/es/upload/interface";
import handleRegisterSubmit from "../../../services/auth/Register/registerService";
import "../../../assets/styles/Register.css";
import fireSwal from "../../../utils/swalUtil";
import RegisterFormValues from "../../../types/auth/Register/RegisterFormValues";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = async (values: RegisterFormValues) => {
    const result = await handleRegisterSubmit(values);

    if (result.success) {
      fireSwal(result.success, 'You can now log into your account!', 'success', navigate, '/login')
    } else if (result.error){
      fireSwal('Error!', result.error, 'error', navigate);
    }
  };

  return (
    <div className="register-bg">
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
    </div>
  );
}
