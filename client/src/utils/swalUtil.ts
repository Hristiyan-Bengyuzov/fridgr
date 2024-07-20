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
    background: "#181a27",
    confirmButtonColor: "#00b96b",
  }).then((res) => {
    if (route && (res.isConfirmed || res.isDismissed)) {
      navigate(route);
    }
  });
}
