import React, { useState } from "react";
import Loginpage from "../components/signin/loginpage";
import Logger from "../components/mainpage/loged";
import { useEffect } from "react";
import { auth } from "../firebasehooks/fire";

function App() {
  const [loged, setloged] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setloged(true);
      } else {
        setloged(false);
      }
    });
  }, []);
  if (loged) {
    console.log("going to poser");
    return <Logger loged={loged} setloged={setloged} />;
  } else {
    console.log("i am into this");
    return <Loginpage loged={loged} setloged={setloged} />;
  }
}

export default App;
