import Landowner from "./Landowner";
import Tenant from "./Tenant";
import "../../../assets/styles/Complaints.scss";

export default function Complaints() {
  const { accountType } = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {accountType === "Landowner" && <Landowner />}
      {accountType === "Tenant" && <Tenant />}
    </>
  );
}
