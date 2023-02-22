import { useState } from "react";
import { useRef } from "react";
import axios from "../api/axios";

export default function NewsLetter({ onNewsLetter }) {
  const emailRef = useRef();
  const [notSubmitted, setNotSubmitted] = useState(true);
  const [failed, onFailed] = useState(false);

  async function onSave(e) {
    e.preventDefault();
    await axios;
    console.log(emailRef.current.value);
    const enteredEmail = emailRef.current.value;
    const data = { email: enteredEmail };
    axios
      .post("/api/v1/newsletter", data)
      .then(() => {
        console.log("success");
        setNotSubmitted(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        onFailed(true);
      });
  }

  const newSeletterElement = (
    <form
      onSubmit={(e) => {
        onSave(e);
      }}
    >
      <input type="email" className="form-control" ref={emailRef} required />
      <button type="submit" className="btn text-primary w-100">
        SAVE
      </button>
    </form>
  );

  const successElement = (
    <div className="text-success">Email Successfully Registered</div>
  );
  const failureElement = (
    <div className="text-danger">Email Already Registered</div>
  );

  const failureCheckElement = failed ? failureElement : successElement;

  return (
    <>
      {notSubmitted ? newSeletterElement : failureCheckElement}
      {!notSubmitted ? (
        <button className="btn btn-success" onClick={onNewsLetter}>
          OK
        </button>
      ) : (
        <button className="btn btn-danger" onClick={onNewsLetter}>
          CANCEL
        </button>
      )}
    </>
  );
}
