import Swal, { SweetAlertIcon } from "sweetalert2";

export default function fireSwal(
  title: string,
  text: string,
  icon: SweetAlertIcon,
  navigate: any,
  route: string = ""
): void {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    color: "white",
    background: "#424242",
    confirmButtonColor: "#ff9800",
  }).then((res) => {
    if (route && (res.isConfirmed || res.isDismissed)) {
      navigate(route);
    }
  });
}
