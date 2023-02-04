import { useContext } from "react";
import ResultContext from "../../store/result-context";
import ResultRow from "./ResultRow";

const ResultTable = (props) => {
  const resultCtx = useContext(ResultContext);
  return (
    <table className="table table-striped shadow border border-grey w-75 p-4 mt-3">
      <thead>
        <tr>
          <th>RollNo</th>
          <th>Marks</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {resultCtx.results.map((result) => (
          <tr>
            <ResultRow key={result.id} result={result} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultTable;
