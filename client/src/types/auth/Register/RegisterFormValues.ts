import { UploadFile } from "antd";

export default interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirm: string;
  image?: UploadFile[];
}
