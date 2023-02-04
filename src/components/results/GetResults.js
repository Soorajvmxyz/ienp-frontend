import { useRef, useState } from "react";
import { Months } from "../../constants/constants";
import axios from "../api/axios";
import ResultTable from "./ResultTable";

export default function GetResults() {
  const rollRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();
  const [results, setResults] = useState([]);
  const [isFetched, setisFetched] = useState(false);
  const [student, setStudent] = useState({});

  async function submitHandler() {
    const enteredRoll = rollRef.current.value;
    const enteredMonth = monthRef.current.value;
    const enteredYear = yearRef.current.value;

    await axios
      .get(`api/v1/student/${enteredRoll}`)
      .then(async (res) => setStudent(await res.data));
    await axios
      .get(
        `/api/v1/results/rollno/${enteredRoll}/${enteredMonth}/${enteredYear}`
      )
      .then(async (res) => {
        setResults(await res.data);
        setisFetched(true);
      });
  }

  const searchElement = (
    <div className="card w-25 mt-3 p-3">
      <label htmlFor="rollno">RollNo</label>
      <input
        type="text"
        id="rollno"
        className="form-control mt-3"
        ref={rollRef}
      />
      <label htmlFor="rollno">Month</label>
      <select className="form-control mt-3 mb-3" ref={monthRef}>
        {Months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      <label htmlFor="rollno">Year</label>
      <input type="text" className="form-control mt-3 mb-3" ref={yearRef} />
      <button className="btn m-2" onClick={submitHandler}>
        Submit
      </button>
    </div>
  );

  const tableElement = (
    <>
      <ResultTable result={results} />
      <button
        className="btn"
        onClick={() => {
          setisFetched(!isFetched);
        }}
      >
        search another result
      </button>
    </>
  );
  return isFetched ? tableElement : searchElement;
}
