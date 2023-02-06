import { Link, useHistory } from "react-router-dom";

function MainNavigation(props) {
  const history = useHistory();

  function onLogoutHandler() {
    localStorage.removeItem("login");
    history.replace("/");
  }

  return (
    <nav className="navbar bg-dark p-3 shadow">
      <div className="container-fluid">
        <span className="navbar-brand fs-3 text-white fw-bold">IENP</span>
        <div>
          {props.page !== "results" ? (
            <Link to={"/results"} className="btn text-light fw-bold m-3">
              Results
            </Link>
          ) : (
            <></>
          )}
          {props.page !== "home" ? (
            <Link to={"/home"} className="btn text-light fw-bold m-3">
              Announcements
            </Link>
          ) : (
            <></>
          )}
          {props.page !== "students" ? (
            <Link to={"/students"} className="btn text-light fw-bold m-3">
              Students Data
            </Link>
          ) : (
            <></>
          )}
          <button className="btn text-light fw-bold" onClick={onLogoutHandler}>
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default MainNavigation;
