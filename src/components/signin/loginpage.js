import React, { useState, useRef, useEffect } from "react";
import Loginbox from "../signin/loginbox";
import "D:/organ/src/index.css";
import Signup from "../signin/signup";

function Loginpage(props) {
  const { loged, setloged } = props;
  const style = "background-color: #56baed; height: 100vh;";
  var active = "active";
  var inactive = "inactive underlineHover";
  const [signin, setsignin] = useState(active);
  const [signup, setsignup] = useState(inactive);
  const [sate, setsate] = useState("signin");

  const sin = () => {
    setsignin(active);
    setsignup(inactive);
    setsate("signin");
  };
  const sout = () => {
    setsignin(inactive);
    setsignup(active);
    setsate("signout");
  };

  return (
    <div>
      <div className="lol">
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <a className={signin} onClick={sin}>
              Sign In
            </a>
            <a className={signup} onClick={sout}>
              Sign Up
            </a>
            {sate === "signin" ? (
              <Loginbox loged={loged} setloged={setloged} />
            ) : (
              <Signup loged={loged} setloged={setloged} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
