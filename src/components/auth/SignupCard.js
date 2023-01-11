import axios from "../api/axios";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

function SignupCard() {
  const history = useHistory();

  const usernameRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const departmentRef = useRef();

  function signupHandler(event) {
    event.preventDefault();

    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredName = nameRef.current.value;
    const enteredDepartment = departmentRef.current.value;

    const signupData = {
      username: enteredUsername,
      password: enteredPassword,
      name: enteredName,
      department: enteredDepartment,
    };

    axios.post("/api/auth/register", signupData).then((res) => {
      localStorage.setItem(
        "login",
        JSON.stringify({
          login: "true",
          token: res.data.accessToken,
        })
      );
      console.log(res);
      history.push("/home");
    });
  }

  return (
    <div className="card-body">
      <form>
        <label htmlFor="username" className="mb-2">
          Username
        </label>
        <input
          type="text"
          className="form-control align-self-start mb-2"
          ref={usernameRef}
          id="username"
          required
        ></input>

        <label htmlFor="password" className="mb-2">
          Password
        </label>
        <input
          type="password"
          className="form-control align-self-start mb-2"
          ref={passwordRef}
          id="password"
          required
        ></input>

        <label htmlFor="name" className="mb-2">
          Name
        </label>
        <input
          type="text"
          className="form-control align-self-start mb-2"
          ref={nameRef}
          id="name"
          required
        ></input>

        <label htmlFor="department" className="mb-2">
          Department
        </label>
        <input
          type="text"
          className="form-control align-self-start mb-2"
          ref={departmentRef}
          id="department"
          required
        ></input>

        <button className="btn btn-outline-dark mt-2" onClick={signupHandler}>
          SignUp
        </button>
      </form>
    </div>
  );
}

export default SignupCard;
