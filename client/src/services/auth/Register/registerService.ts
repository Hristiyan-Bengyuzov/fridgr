import RegisterFormValues from "../../../types/auth/Register/RegisterFormValues";
import axios from "axios";

export default async function handleRegisterSubmit(values: RegisterFormValues) {
  const formData = new FormData();

  formData.append("username", values.username);
  formData.append("email", values.email);
  formData.append("password", values.password);
  if (values.image && values.image[0]) {
    formData.append("image", values.image[0].originFileObj as any);
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/Authentication/register`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}
