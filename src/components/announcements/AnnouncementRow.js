const AnnouncementRow = (props) => {
  return (
    <>
      <div className="card flex-column p-3 w-50 mt-3">
        <h5>{props.title}</h5>
        {props.subject}
        <p>{props.description}</p>
        Date:{props.date}
      </div>
      {props.access === "faculty" ? (
        <button className="btn btn-outline-dark mt-3">somebutton</button>
      ) : (
        <></>
      )}
    </>
  );
};

export default AnnouncementRow;
