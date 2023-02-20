import { useEffect } from "react";
import MainNavigation from "../components/Layout/MainNavigation";
import StudentBody from "../components/students/StudentBody";
import axios from "../components/api/axios";

export default function Students() {
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      JSON.parse(localStorage.getItem("login")).token
    }`;
  });
  return (
    <>
      <MainNavigation page="students" />
      <div className="d-flex flex-column align-items-center p-2">
        <StudentBody />
      </div>
    </>
  );
}
