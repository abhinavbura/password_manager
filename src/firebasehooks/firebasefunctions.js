import { dbref, auth } from "./fire";

const userref = dbref.ref("users");
var query = userref.orderByKey();
var user = [];
var key;
query.once("value").then(function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    key = childSnapshot.key;
    user.push(key);
  });
});
export function Adduser(name, password, err) {
  const promise = auth.createUserWithEmailAndPassword(name, password);
  promise.catch((e) => {
    err.innerHTML = e.message;
  });
}
export function Loginuser(username, password, message) {
  const promise = auth.signInWithEmailAndPassword(username, password);
  promise.catch((e) => {
    if (e) {
      return e.message;
    } else {
      return "succes";
    }
  });
}
export function signout() {
  auth.signOut();
}
export function Checkuser(username, password) {
  var userstatus = false;
  var word;
  user.forEach((element) => {
    if (element === username) {
      userstatus = true;
    }
  });
  if (userstatus) {
    var hello = userref
      .child(username)
      .child("pass")
      .on("value", (snap) => {
        console.log(snap.val());
        this.word = snap.val();
        console.log(word);
      });

    console.log("password:", word);
    if (word === password) {
      return "verified";
    } else {
      return "wrong password";
    }
  } else {
    return "no user found";
  }
}

export function useradd(username, userid) {
  dbref.ref("users").child(userid).child("credentials").set({
    user_name: username,
  });
}
