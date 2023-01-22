import { useHistory } from "react-router-dom";
import axios from "../api/axios";

const AnnouncementRow = (props) => {
  const history = useHistory();
  async function onDleteHandler() {
    await axios.delete(`/api/v1/announcement/${props.id}`).then(async (res) => {
      console.log(await res.data);
      history.go(0);
    });
  }
  return (
    <div className="card flex-column p-3 w-50 mt-3 shadow-sm">
      <h5 className="fw-bold">{props.title.toUpperCase()}</h5>
      <div className="bolder mb-2">{props.subject}</div>
      <p className="blockquote fs-7">{props.description}</p>
      <div className="bloackquote-footer">{props.date.slice(0, 10)}</div>
      {props.access === "faculty" ? (
        <div className="d-flex flex-row">
          <button className="btn btn-outline-dark m-2 ">Edit</button>
          <button className="btn btn-outline-dark m-2" onClick={onDleteHandler}>
            Delete
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AnnouncementRow;
