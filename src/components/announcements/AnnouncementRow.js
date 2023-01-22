import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../api/axios";

const AnnouncementRow = (props) => {
  const titleRef = useRef();
  const subjectRef = useRef();
  const descRef = useRef();

  const history = useHistory();
  const [edit, setEdit] = useState(false);

  async function onDleteHandler() {
    await axios.delete(`/api/v1/announcement/${props.id}`).then(async (res) => {
      console.log(await res.data);
      history.go(0);
    });
  }

  async function onSaveHandler() {
    const user = JSON.parse(localStorage.getItem("login")).username;
    const enteredTitle = titleRef.current.value;
    const enteredSubject = subjectRef.current.value;
    const enteredDesc = descRef.current.value;

    const announcement = {
      title: enteredTitle,
      subject: enteredSubject,
      description: enteredDesc,
      facultyId: user,
    };

    await axios
      .put(`/api/v1/announcement/${props.id}`, announcement)
      .then(async (res) => {
        console.log(await res.data);
        history.go(0);
      });
  }

  function onEditHandler() {
    setEdit(!edit);
  }

  return (
    <>
      <div className="card flex-column p-3 w-50 mt-3 shadow-sm">
        <h5 className="fw-bold">{props.title.toUpperCase()}</h5>
        <div className="bolder mb-2">{props.subject}</div>
        <p className="blockquote fs-7">{props.description}</p>
        <div className="bloackquote-footer">{props.date.slice(0, 10)}</div>
        {props.access === "faculty" ? (
          <div className="d-flex flex-row">
            <button
              className="btn btn-outline-dark m-2"
              onClick={onEditHandler}
            >
              {edit ? "Cancel" : "Edit"}
            </button>
            <button
              className="btn btn-outline-dark m-2"
              onClick={onDleteHandler}
            >
              Delete
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {edit ? (
        <div className="card flex-column p-3 w-50 mt-3 shadow-sm">
          <label htmlFor="title">TITLE</label>
          <input
            type="text"
            id="title"
            className="form-control w-50"
            defaultValue={`${props.title}`}
            ref={titleRef}
          ></input>
          <label htmlFor="subject">SUBJECT</label>
          <input
            type="text"
            id="subject"
            className="form-control w-50"
            defaultValue={`${props.subject}`}
            ref={subjectRef}
          ></input>
          <label htmlFor="desc">DESCRIPTION</label>
          <textarea
            id="desc"
            className="form-control"
            rows="4"
            defaultValue={`${props.description}`}
            ref={descRef}
          ></textarea>
          <div className="d-flex flex-row mt-2">
            <button
              type="save"
              className="btn btn-dark"
              onClick={onSaveHandler}
            >
              save
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AnnouncementRow;
