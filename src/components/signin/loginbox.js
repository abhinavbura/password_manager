import react, { useRef, useState } from "react";

import { auth } from "D:/organ/src/firebasehooks/fire.js";

export default function Loginbox(props) {
  const { setloged } = props;
  const loginref = useRef();
  const passref = useRef();
  const [errormessage, seterrormessage] = useState("");

  const submit = (e) => {
    e.preventDefault();

    const promise = auth.signInWithEmailAndPassword(
      loginref.current.value,
      passref.current.value
    );
    promise.catch((e) => {
      if (e) {
        seterrormessage(e.message);
      } else {
        setloged(true);
      }
    });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          id="login"
          className="fadeIn second"
          name="login"
          placeholder="email"
          required
          ref={loginref}
        />
        <input
          type="password"
          id="password"
          className="fadeIn third"
          name="login"
          placeholder="password"
          required
          ref={passref}
        />
        <button className="fadeIn fourth" onClick={submit}>
          LOG IN
        </button>
      </form>

      <div id="formFooter">
        <p>{errormessage}</p>
        <a className="underlineHover" href="#">
          Forgot Password?
        </a>
      </div>
    </div>
  );
}
