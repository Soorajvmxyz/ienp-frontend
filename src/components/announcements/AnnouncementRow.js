const AnnouncementRow = (props) => {
  return (
    <>
      <div className="card flex-column p-3 w-50 mt-3">
        <h5 className="fw-bold">{props.title.toUpperCase()}</h5>
        {props.subject}
        <p>{props.description}</p>
        Published on : {props.date.slice(0, 10)}
      </div>
      {props.access === "faculty" ? (
        <button className="btn btn-outline-dark mt-3">Edit</button>
      ) : (
        <></>
      )}
    </>
  );
};

export default AnnouncementRow;
