import React, { useState } from "react";
import { signout } from "D:/organ/src/firebasehooks/firebasefunctions.js";
import { auth } from "D:/organ/src/firebasehooks/fire.js";
import "D:/organ/src/userpage.css";
import { dbref } from "../../firebasehooks/fire";
import Passwords from "./pages/passwords";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Storage from "./pages/storage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default function Logger(props) {
  const { loged, setloged } = props;
  const [gmail, setgmail] = useState("");
  const [username, setusername] = useState("loading..");
  const [uid, setuid] = useState("");

  function useradd() {
    var na = "";
    for (let i = 0; i < gmail.length; i++) {
      if (gmail[i] == "@") {
        break;
      }
      na += gmail[i];
    }
    dbref.ref("users").child(uid).child("credentials").set({
      user_name: na,
    });
  }
  auth.onAuthStateChanged((user) => {
    if (user) {
      setuid(user.uid);
      setgmail(user.email);
      dbref
        .ref("users")
        .child(user.uid)
        .child("credentials")
        .child("user_name")
        .on("value", (snap) => {
          if (snap.val()) {
            setusername(snap.val());
          } else {
            useradd();
          }
        });
    } else {
      setgmail("loading...");
    }
  });

  function butt() {
    signout();
    setloged(false);
  }

  return (
    <div>
      <link rel="stylesheet" href="D:\organ\src\userpage.css"></link>
      <Router>
        <div className="top-bar">
          <div className="logo">
            <h1>
              <a href="#">Dobento.</a>
            </h1>
          </div>

          <ul className="mainMenu">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/storage">
              <li>Storage</li>
            </Link>
            <Link to="/passwords">
              <li>passwords</li>
            </Link>
            <Link to="/profile">
              <li>profile</li>
            </Link>

            <li className="gobttm">
              <a href="#" onClick={butt}>
                sign out
              </a>
            </li>
          </ul>
        </div>

        <div className="main-body">
          <Switch>
            <Route path="/" exact>
              <Home uid={uid} user={username} />
            </Route>
            <Route path="/storage" exact>
              <Storage uid={uid} user={username} />
            </Route>
            <Route path="/passwords" exact>
              <Passwords uid={uid} user={username} />
            </Route>
            <Route path="/profile" exact>
              <Profile uid={uid} user={username} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
