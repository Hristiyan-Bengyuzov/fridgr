import RegisterFormValues from "../../../types/auth/Register/RegisterFormValues";
import axios, { AxiosError } from "axios";

export default async function handleRegisterSubmit(
  values: RegisterFormValues
): Promise<{ success?: string; error?: string } | undefined> {
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

    return { success: response.data as string };
  } catch (e) {
    const error = e as AxiosError;

    if (error.response?.status === 409) {
      return { error: error.response?.data as string };
    }
  }
}
