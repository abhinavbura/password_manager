import React, { useEffect, useRef, useState } from "react";
import { dbref } from "../../../firebasehooks/fire";
import Show from "../show";
export default function Passwords(props) {
  const { uid, user } = props;
  const uername = useRef();
  const password = useRef();
  const web = useRef();
  const [news, setnews] = useState(false);
  let pp = [];
  function data() {
    if (uid) {
      dbref
        .ref("users")
        .child(uid)
        .child("passwords")
        .on("value", (snap) => {
          if (snap) {
            snap.forEach((e) => {
              var cred = { username: "", password: "", websi: "" };
              cred.password = e.val().password;
              cred.username = e.val().username;
              cred.websi = e.val().website;
              pp.push(cred);
            });
            if (news === false) {
              setnews(true);
            }
          } else {
            if (news === true) {
              setnews(false);
            }
          }
        });
    }
  }
  data();
  useEffect((a) => {
    setnews(news);
  });
  function dataadd() {
    dbref.ref("users").child(uid).child("passwords").push({
      username: uername.current.value,
      password: password.current.value,
      website: web.current.value,
    });
    data();
  }

  return (
    <div className="passwords-print">
      {news === true ? (
        pp.map((da) => (
          <Show
            usernme={da.username}
            pasword={da.password}
            website={da.websi}
            uid={uid}
          />
        ))
      ) : (
        <p>No Records Found</p>
      )}
      <div className="pass">
        <form autoComplete="off">
          Username:
          <input
            ref={uername}
            val=" "
            type="text"
            autoComplete="off"
            required
          ></input>
          Password:
          <input
            ref={password}
            type="password"
            autoComplete="off"
            val=" "
            required
          ></input>
          Website:
          <input
            ref={web}
            autoComplete="off"
            val=" "
            type="text"
            required
          ></input>
          <button className="goright" onClick={dataadd}>
            Add Data
          </button>
        </form>
      </div>
    </div>
  );
}
