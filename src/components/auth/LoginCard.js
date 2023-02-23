import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "../api/axios";

function LoginCard(props) {
  const history = useHistory();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errorCaught, setErrorCaught] = useState(false);

  async function loginHandler(event) {
    event.preventDefault();

    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const userData = {
      username: enteredUsername,
      password: enteredPassword,
    };

    await axios
      .post("/api/auth/login", userData)
      .then(async (res) => {
        const loginInfo = await res.data;
        localStorage.setItem(
          "login",
          JSON.stringify({
            login: "true",
            username: loginInfo.username,
            token: loginInfo.accessToken,
          })
        );
        console.log(res);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${loginInfo.accessToken}`;
        history.push("/home");
      })
      .catch((err) => {
        setErrorCaught(true);
      });
  }

  return (
    <>
      <div className="card-body">
        <form>
          <label htmlFor="username" className="mb-2">
            Username
          </label>
          <input
            className="form-control align-self-start mb-2"
            type="text"
            ref={usernameRef}
            id="username"
            required
          ></input>
          <label htmlFor="passsword" className="mb-2">
            Password
          </label>
          <input
            className="form-control align-self-start mb-2"
            type="password"
            ref={passwordRef}
            id="password"
            required
          ></input>
          <button className="btn btn-outline-dark mt-2" onClick={loginHandler}>
            Login
          </button>
        </form>
      </div>
      {errorCaught ? (
        <div className="text-danger m-2">Wrong Username or Password</div>
      ) : (
        <></>
      )}
    </>
  );
}

export default LoginCard;
