import { useState } from "react";
import { useRef } from "react";
import axios from "../api/axios";

export default function NewsLetter({ onNewsLetter }) {
  const emailRef = useRef();
  const [saved, onSaved] = useState(false);

  async function onSave(e) {
    e.preventDefault();
    await axios;
    console.log(emailRef.current.value);
    const enteredEmail = emailRef.current.value;
    const data = { email: enteredEmail };
    axios
      .post("/api/v1/newsletter", data)
      .then(console.log("success"))
      .catch((err) => {
        console.log(err.response.data);
      });
    onSaved(true);
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

  return (
    <>
      {saved ? successElement : newSeletterElement}
      {saved ? (
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
