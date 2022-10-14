import React from "react";
import { dbref } from "../../../firebasehooks/fire";

export default function Profile(props) {
  const { uid, user } = props;

  const ref = dbref.ref("users/" + uid + "/credentials");
  ref.on("value", (snap) => {
    const a = snap.val();
    console.log(a.user_name);
  });
  return (
    <div>
      <div className="profile-box">
        <h>you are in profile</h>
      </div>
    </div>
  );
}
