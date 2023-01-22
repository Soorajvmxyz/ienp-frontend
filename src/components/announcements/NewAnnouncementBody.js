import { useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "../api/axios";

export default function NewAnnouncementBody() {
  const titleRef = useRef();
  const subjectRef = useRef();
  const descRef = useRef();
  const history = useHistory();

  function onSubmitHandler() {
    const enteredTitle = titleRef.current.value;
    const enteredSubject = subjectRef.current.value;
    const enteredDesc = descRef.current.value;
    const user = JSON.parse(localStorage.getItem("login")).username;

    const announcement = {
      title: enteredTitle,
      subject: enteredSubject,
      description: enteredDesc,
      facultyId: user,
    };

    axios.post("/api/v1/announcement", announcement).then((res) => {
      console.log(res);
      history.replace("/home");
    });
  }
  return (
    <>
      <div className="card w-50 p-3 shadow">
        <label htmlFor="title" className="fw-bold">
          TITLE
        </label>
        <input
          type="text"
          id="title"
          className="form-control m-2"
          ref={titleRef}
          required
        />
        <label htmlFor="subject" className="fw-bold">
          SUBJECT
        </label>
        <input
          type="text"
          id="subejct"
          className="form-control m-2"
          ref={subjectRef}
          required
        />
        <label htmlFor="desc" className="fw-bold">
          DESCRIPTION
        </label>
        <textarea
          className="form-control mb-3 mt-3"
          id="desc"
          rows="4"
          ref={descRef}
          required
        ></textarea>
      </div>
      <button className="btn btn-dark mt-3" onClick={onSubmitHandler}>
        Submit
      </button>
    </>
  );
}
