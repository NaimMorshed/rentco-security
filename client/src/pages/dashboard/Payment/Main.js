import React from "react";
import { useParams } from "react-router-dom";
import Success from "./Success";
import Fail from "./Fail";
import Cancel from "./Cancel";
import "../../../assets/styles/Payment.scss";

export default function Main() {
  const { data } = useParams();

  return (
    <>
      {data === "success" && <Success />}
      {data === "fail" && <Fail />}
      {data === "cancel" && <Cancel />}
    </>
  );
}
