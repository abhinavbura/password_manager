import React, { useRef, useState } from "react";
import { dbref } from "../../firebasehooks/fire";
export default function Show(props) {
  const { usernme, pasword, website, uid } = props;
  const pass = useRef();
  const [type, settype] = useState("password");
  const [butt, setbutt] = useState("Show");
  const [show, setshow] = useState(true);
  function buttfnct() {
    if (type == "password") {
      settype("text");
      setbutt("Hide");
    } else {
      settype("password");
      setbutt("Show");
    }
  }

  function remone() {
    let key = "";
    dbref
      .ref("users")
      .child(uid)
      .child("passwords")
      .on("value", (snap) => {
        if (snap) {
          snap.forEach((e) => {
            const word = e.val().password;
            const namea = e.val().username;
            const websi = e.val().website;
            if (namea == usernme) {
              if (websi == website) {
                if (word == pasword) {
                  key = e.key;
                }
              }
            }
          });
        }
      });
    console.log(key);
    setTimeout(() => {
      dbref.ref("users").child(uid).child("passwords").child(key).remove();
    }, 2000);
    setshow(false);
  }
  return (
    <div>
      {show === true ? (
        <div className="pass">
          <div>
            Username:<input type="text" value={usernme} readOnly></input>
          </div>
          <div>
            Password:
            <input ref={pass} type={type} value={pasword} readOnly></input>
          </div>
          <div>
            <label> {website}</label>
          </div>
          <button onClick={remone}>Delete</button>
          <button onClick={buttfnct}>{butt}</button>
        </div>
      ) : (
        <div className="pass">
          <p>data is being removed</p>
        </div>
      )}
    </div>
  );
}
