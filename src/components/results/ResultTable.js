import { useContext } from "react";
import ResultContext from "../../store/result-context";
import ResultRow from "./ResultRow";

const ResultTable = ({ data, type, department }) => {
  const resultCtx = useContext(ResultContext);
  return (
    <>
      {type === "edit" ? (
        <></>
      ) : (
        <div className="d-flex flex-column shadow border border-grey w-75 p-4 mt-3">
          <span className="fs-4 fw-Bold">Student : {data.name}</span>
          <span className="fs-4 fw-Bold">Department : {data.department}</span>
        </div>
      )}
      <table className="table table-striped shadow border border-grey w-75 p-4 mt-3">
        <thead>
          <tr>
            {type === "edit" ? <th>RollNo</th> : <th>Subject</th>}
            <th>Marks</th>
            {type === "edit" ? <th>Actions</th> : <></>}
          </tr>
        </thead>
        <tbody>
          {resultCtx.results.map((result) => (
            <tr key={result.id}>
              <ResultRow
                result={result}
                searchData={data}
                type={type}
                department={department}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ResultTable;
