import { useState } from "react";
import { useEffect } from "react";
import axios from "../api/axios";
import AddResult from "./AddResult";
import ResultContext from "../../store/result-context";
import { useContext } from "react";

export default function ResultHome(props) {
  const user = JSON.parse(localStorage.getItem("login")).username;
  const [department, setDepartment] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [search, setSearch] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const resultCtx = useContext(ResultContext);

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

  // const searchElement = (
  //   <>
  //     <div className="d-flex flex-row shadow border border-grey w-75 p-4 mt-3">
  //       Subject{" "}
  //       <select
  //         className="form-control w-25 ms-2 me-2"
  //         id="subject"
  //         ref={subjectRef}
  //       >
  //         {subjects.map((subject) => (
  //           <option key={subject} value={subject}>
  //             {subject}
  //           </option>
  //         ))}
  //       </select>
  //       Month{" "}
  //       <select className="form-control w-25 ms-2 me-2" ref={monthRef}>
  //         {Months.map((month) => (
  //           <option key={month} value={month}>
  //             {month}
  //           </option>
  //         ))}
  //       </select>
  //       Year{" "}
  //       <input
  //         type="text"
  //         className="form-control w-25 ms-2 me-2"
  //         ref={yearRef}
  //       />
  //       <button
  //         className="btn fw-bold btn-primary me-2"
  //         onClick={searchHandler}
  //       >
  //         SUBMIT
  //       </button>
  //       <button
  //         className="btn w-25  fw-bold btn-primary"
  //         onClick={toggleSearch}
  //       >
  //         ADD RESULT
  //       </button>
  //     </div>
  //     {resultCtx.resultLenght === 0 ? (
  //       <p className="mt-3">No Results!</p>
  //     ) : (
  //       <ResultTable />
  //     )}
  //   </>
  // );

  const addElement = (
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
