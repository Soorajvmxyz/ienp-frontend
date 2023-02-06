import { useContext, useRef, useState } from "react";
import ResultContext from "../../store/result-context";
import axios from "../api/axios";

export default function ResultRow({ result, type, department }) {
  const [edit, setEdit] = useState(false);
  const markRef = useRef();
  const resultCtx = useContext(ResultContext);

  function toggleEdit() {
    setEdit(!edit);
  }

  async function editHandler() {
    const data = {
      rollNo: result.rollNo,
      subject: result.subject,
      month: result.month,
      year: result.year,
      mark: markRef.current.value,
    };
    console.log(result.id);
    console.log(data);
    await axios.put(`/api/v1/results/${result.id}`, data).then(async (res) => {
      const sample = await res.data;
      resultCtx.getResultFaculty(
        department,
        resultCtx.searchData.academicYear,
        sample.subject,
        sample.month,
        sample.year
      );
      toggleEdit();
    });
  }

  async function deleteHandler() {
    await axios.delete(`api/v1/results/${result.id}`).then(async (res) => {
      console.log(await res.data);
      resultCtx.getResultFaculty(
        department,
        resultCtx.searchData.academicYear,
        result.subject,
        result.month,
        result.year
      );
    });
  }

  const editElemet = edit ? (
    <>
      <td>
        <div className="d-flex flex-row justify-content-start">
          <button className="btn btn-primary w-25 me-3" onClick={editHandler}>
            Save
          </button>
          <button className="btn btn-danger w-25" onClick={toggleEdit}>
            Cancel
          </button>
        </div>
      </td>
    </>
  ) : (
    <td>
      <div className="d-flex flex-row justify-content-start">
        <button className="btn btn-primary w-25 me-3" onClick={toggleEdit}>
          Edit
        </button>
        <button className="btn btn-danger w-25" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </td>
  );

  return (
    <>
      {type === "edit" ? <td>{result.rollNo}</td> : <td>{result.subject}</td>}
      {edit ? (
        <>
          <td className="w-25">
            <input
              type="text"
              className="form-control "
              defaultValue={result.mark}
              ref={markRef}
            />
          </td>
        </>
      ) : (
        <td>{result.mark}</td>
      )}
      {type === "edit" ? editElemet : <></>}
    </>
  );
}
