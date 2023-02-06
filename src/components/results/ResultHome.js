import { useState } from "react";
import { useEffect } from "react";
import axios from "../api/axios";
import AddResult from "./AddResult";

export default function ResultHome({ type }) {
  const user = JSON.parse(localStorage.getItem("login")).username;
  const [department, setDepartment] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [search, setSearch] = useState(false);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    async function fetchDepartment() {
      await axios.get(`/api/v1/faculty/${user}`).then(async (res) => {
        setDepartment(await res.data.department);
        setIsMounted(true);
        if (department) {
          await axios.get(`/api/v1/subject/${department}`).then(async (res) => {
            setSubjects(await res.data);
          });
        }
      });
    }

    fetchDepartment();
  }, [department, user]);

  function toggleSearch() {
    setSearch(!search);
  }

  const addElement =
    type === "view" ? (
      <>
        <AddResult type="view" />
      </>
    ) : (
      <>
        <AddResult
          toggleSearch={toggleSearch}
          department={department}
          subjects={subjects}
        />
      </>
    );

  const bodyElement = (
    <>
      <div className="d-flex flex-column shadow border border-grey w-75 p-4 mt-3">
        <span className="fw-bold fs-4">Department : {department}</span>
      </div>
      {addElement}
    </>
  );

  return isMounted ? bodyElement : <>Loading</>;
}
