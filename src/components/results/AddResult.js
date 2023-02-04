import { useState } from "react";
import { useRef } from "react";
import { Months } from "../../constants/constants";
import axios from "../api/axios";
import ResultContext from "../../store/result-context";
import { useContext } from "react";
import ResultTable from "./ResultTable";

export default function AddResult({
  department,
  setSubject,
  toggleSearch,
  subjects,
}) {
  const subjectDropdownRef = useRef();
  const subjectInputRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();
  const [subjectSelected, setSubjectSelected] = useState(false);
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
      console.log(subjectDropdownRef.current.value);

      searchData = {
        subject: subjectDropdownRef.current.value,
        month: enteredMonth,
        year: enteredYear,
      };
    }
    await resultCtx.getReservationPublic(
      searchData.subject,
      enteredMonth,
      enteredYear
    );
    setSubjectSelected(true);
  }

  const subjectSelectElement = (
    <div className="d-flex flex-column shadow border border-grey w-75 p-4 mt-3 align-items-center">
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
      <div className="d-flex flex-row mt-3 ">
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
          className="btn fw-bold btn-primary ms-2 me-2"
          onClick={subjectSelectHandler}
        >
          SELECT
        </button>
        <button className="btn fw-bold btn-danger" onClick={toggleSearch}>
          CANCEL
        </button>
      </div>
    </div>
  );

  const resultElement =
    resultCtx.resultLenght === 0 ? (
      <>No Result Found</>
    ) : (
      <ResultTable data={searchData} />
    );
  return (
    <>
      {subjectSelectElement}
      {subjectSelected ? resultElement : <>Search Something</>}
    </>
  );
}
