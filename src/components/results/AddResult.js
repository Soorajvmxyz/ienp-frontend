import { useRef, useContext, useState } from "react";
import { Months } from "../../constants/constants";
import axios from "../api/axios";
import ResultContext from "../../store/result-context";
import ResultTable from "./ResultTable";

export default function AddResult({
  department,
  toggleSearch,
  subjects,
  type,
}) {
  const subjectDropdownRef = useRef();
  const subjectInputRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();
  const rollNoRef = useRef();
  const markRef = useRef();
  const academicYearRef = useRef();

  const [subjectSelected, setSubjectSelected] = useState(false);
  const [addResult, setAddResult] = useState(false);
  const resultCtx = useContext(ResultContext);
  let searchData = {};

  async function subjectSelectHandler() {
    const enteredMonth = monthRef.current.value;
    const enteredYear = yearRef.current.value;
    if (subjectInputRef.current.value) {
      const data = {
        department: department,
        subject: subjectInputRef.current.value,
      };

      await axios
        .post("/api/v1/subject", data)
        .then(async (res) => console.log(await res.data));
      searchData = {
        subject: subjectInputRef.current.value,
        month: enteredMonth,
        year: enteredYear,
      };
    } else {
      searchData = {
        subject: subjectDropdownRef.current.value,
        month: enteredMonth,
        year: enteredYear,
      };
    }
    await resultCtx.getResultFaculty(
      department,
      academicYearRef.current.value,
      searchData.subject,
      enteredMonth,
      enteredYear
    );
    const results = await resultCtx.results;
    console.log(results);
    setSubjectSelected(true);
  }

  function toggleAddResult() {
    setAddResult(!addResult);
  }

  function addResultHandler() {
    const currentStudent = resultCtx.students.filter((student) => {
      return student.rollNo === rollNoRef.current.value;
    });
    if (currentStudent.length !== 0) {
      const data = {
        rollNo: rollNoRef.current.value,
        mark: markRef.current.value,
        subject: resultCtx.searchData.subject,
        month: resultCtx.searchData.month,
        year: resultCtx.searchData.year,
      };

      const duplicate = resultCtx.results.filter((result) => {
        return result.rollNo === data.rollNo;
      });

      duplicate.length === 0
        ? axios.post(`/api/v1/results`, data).then(async (res) => {
            const result = await res.data;
            resultCtx.getResultFaculty(
              department,
              academicYearRef.current.value,
              result.subject,
              result.month,
              result.year
            );
          })
        : alert(`Roll No : ${data.rollNo} already exists`);
    } else {
      alert("RollNo does not exist");
    }
  }

  const subjectSelectElement = (
    <div className="d-flex flex-column shadow border border-grey w-75 p-4 mt-3 align-items-center">
      <div className="d-flex flex-column align-items-start">
        <div className="d-flex flex-row w-25 mb-2">
          <label htmlFor="subject" className="p-2">
            YEAR :
          </label>
          <select
            className="form-control w-25 ms-2 me-2"
            id="subject"
            ref={academicYearRef}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="d-flex flex-row ">
          <label htmlFor="subject" className="p-2">
            SELECT SUBJECT :
          </label>
          <select
            className="form-control w-25 ms-2 me-2"
            id="subject"
            ref={subjectDropdownRef}
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <label htmlFor="subject" className="p-2">
            <span className="fw-bold">OR</span> ADD NEW :
          </label>
          <input
            type="text"
            className="form-control w-25 ms-2 me-2"
            ref={subjectInputRef}
          />
        </div>
        <div className="d-flex flex-row mt-3 justify-content-between">
          <label className="m-2">Month</label>
          <select className="form-control w-25" ref={monthRef}>
            {Months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <label className="m-2">Year</label>
          <input type="text" className="form-control w-25" ref={yearRef} />
          <button
            className="btn fw-bold btn-primary ms-2 me-2 align-self-end"
            onClick={subjectSelectHandler}
          >
            SELECT
          </button>
        </div>
      </div>
    </div>
  );

  const addResultElement = (
    <>
      <div className="d-flex flex-row shadow border border-grey w-75 p-4 mt-3">
        <label htmlFor="rollno" className="p-2">
          Roll No
        </label>
        <input
          type="text"
          className="form-control w-25 ms-2 me-2"
          ref={rollNoRef}
        />
        <label htmlFor="mark" className="p-2">
          Mark
        </label>
        <input
          type="text"
          className="form-control w-25 ms-2 me-2"
          ref={markRef}
        />
        <button
          onClick={addResultHandler}
          className="btn btn-primary ms-2 me-2"
        >
          Add
        </button>
        <button onClick={toggleAddResult} className="btn btn-danger ms-2 me-2">
          Cancel
        </button>
      </div>
    </>
  );

  const resultElement = (
    <>
      {addResult ? (
        addResultElement
      ) : (
        <button onClick={toggleAddResult} className="btn text-primary m-3 fs-5">
          Add Results
        </button>
      )}
      {resultCtx.resultLenght === 0 ? (
        <>No Result Found</>
      ) : (
        <ResultTable key={1} type="edit" department={department} />
      )}
    </>
  );

  const facultyElement = (
    <>
      {subjectSelectElement}
      {subjectSelected ? resultElement : <></>}
    </>
  );
  return type === "view" ? resultElement : facultyElement;
}
