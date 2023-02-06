import { useContext } from "react";
import { useRef, useState } from "react";
import { Months } from "../../constants/constants";
import ResultContext from "../../store/result-context";
import axios from "../api/axios";
import ResultTable from "./ResultTable";

export default function GetResults() {
  const rollRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();
  const [isFetched, setisFetched] = useState(false);
  const [student, setStudent] = useState({});
  const resultCtx = useContext(ResultContext);

  async function submitHandler() {
    const enteredRoll = rollRef.current.value;
    const enteredMonth = monthRef.current.value;
    const enteredYear = yearRef.current.value;

    await axios.get(`api/v1/student/${enteredRoll}`).then(async (res) => {
      setStudent(await res.data);
    });
    resultCtx.getResultPublic(enteredRoll, enteredMonth, enteredYear);
    setisFetched(true);
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
      <ResultTable data={student} />
      <button
        className="btn text-primary"
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
