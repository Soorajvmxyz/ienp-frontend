import { useEffect } from "react";
import AuthNavigation from "../components/Layout/AuthNavigation";
import MainNavigation from "../components/Layout/MainNavigation";
import GetResults from "../components/results/GetResults";
import ResultHome from "../components/results/ResultHome";
import axios from "../components/api/axios";

export default function Results() {
  const userExists = localStorage.getItem("login");

  useEffect(() => {
    if (userExists) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${
        JSON.parse(localStorage.getItem("login")).token
      }`;
    }
  });

  const studentElement = (
    <>
      <AuthNavigation page="results" />
      <div className="d-flex flex-column align-items-center p-2">
        <GetResults />
      </div>
    </>
  );

  const facultyElemet = (
    <>
      <MainNavigation page="results" />
      <div className="d-flex flex-column align-items-center p-2">
        <ResultHome />
      </div>
    </>
  );

  return <>{userExists ? facultyElemet : studentElement}</>;
}
