import { Link } from "react-router-dom";

function AuthNavigation(props) {
  return (
    <nav className="navbar bg-dark p-3">
      <div className="container-fluid">
        <span className="navbar-brand fs-3 text-white fw-bold">IENP</span>
        <div>
          {props.page !== "results" ? (
            <Link to={"/results"} className="btn btn-outline-light m-3">
              Results
            </Link>
          ) : (
            <></>
          )}
          {props.page === "home" ? (
            <Link to={"/login"} className="btn btn-outline-light">
              Login/Signup
            </Link>
          ) : (
            <Link to={"/"} className="btn btn-outline-light">
              Home
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default AuthNavigation;
