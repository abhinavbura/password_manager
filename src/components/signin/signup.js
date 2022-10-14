import React, { useRef, useState } from "react";
import { signout } from "D:/organ/src/firebasehooks/firebasefunctions.js";
import { auth, dbref } from "D:/organ/src/firebasehooks/fire.js";
export default function Signup(props) {
  const { loged, setloged } = props;
  const loginref = useRef();
  const passref = useRef();
  const repassref = useRef();
  const userref = useRef();
  const [errormsg, seterrormsg] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const onepass = passref.current.value;
    const twopass = repassref.current.value;
    if (onepass === twopass) {
      const promise = auth.createUserWithEmailAndPassword(
        loginref.current.value,
        passref.current.value
      );
      promise.catch((e) => {
        if (e) {
          seterrormsg(e.message);
        } else {
          setloged(true);
        }
      });
    } else {
      seterrormsg("passwords dosen't match");
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          id="login"
          className="fadeIn second"
          name="login"
          placeholder="username"
          ref={userref}
        />
        <input
          type="text"
          id="login"
          className="fadeIn second"
          name="login"
          placeholder="email"
          ref={loginref}
        />
        <input
          type="password"
          id="password"
          className="fadeIn third"
          name="login"
          placeholder="password"
          ref={passref}
        />
        <input
          type="password"
          id="password"
          className="fadeIn third"
          name="login"
          placeholder="re-enter password"
          ref={repassref}
        />
        <button className="fadeIn fourth" onClick={submit}>
          create account
        </button>
      </form>

      <div id="formFooter">
        <p>{errormsg}</p>
        <p>
          Already have an account?
          <a className="underlineHover" href="#" onClick={signout}>
            login
          </a>
        </p>
      </div>
    </div>
  );
}
