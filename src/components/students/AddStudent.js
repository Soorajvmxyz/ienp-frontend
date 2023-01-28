import { useRef } from "react";
import axios from "../api/axios";

export default function AddStudent(props) {
  const rollRef = useRef();
  const nameRef = useRef();

  async function onSave() {
    const enteredRollNo = rollRef.current.value;
    const enteredName = nameRef.current.value;
    const data = {
      rollNo: enteredRollNo,
      name: enteredName,
      department: props.department,
      year: props.year,
    };
    await axios.post("/api/v1/student", data).then(async (res) => {
      console.log(await res.data);
    });
    props.onSave(data);
  }
  return (
    <>
      <div className="d-flex flex-column border-grey p-4 ">
        <label htmlFor="rollNo" className="mb-2">
          Enrollment No.
        </label>
        <input
          type="text"
          className="form-control mb-2"
          id="rollNo"
          ref={rollRef}
        />
        <label htmlFor="name" className="mb-2">
          Name
        </label>
        <input
          type="text"
          className="form-control mb-2"
          id="rollNo"
          ref={nameRef}
        />
        <button
          className="btn fw-bold btn-outline-dark w-25 mt-3"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </>
  );
}
