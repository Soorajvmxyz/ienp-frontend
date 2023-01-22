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
          {props.page === "home" ? (
            <Link to={"/announcements"} className="btn btn-outline-light m-3">
              Results
            </Link>
          ) : (
            <Link to={"/home"} className="btn btn-outline-light m-3">
              Announcements
            </Link>
          )}
          <button className="btn btn-outline-light" onClick={onLogoutHandler}>
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default MainNavigation;
