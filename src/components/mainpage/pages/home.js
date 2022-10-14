import React from "react";

export default function Home(props) {
  const { uid, user } = props;
  return (
    <div>
      <h1 className="heading">hello {user}</h1>
    </div>
  );
}
