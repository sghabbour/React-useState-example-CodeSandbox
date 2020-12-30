import React from "react";
import Friends from "./Friends";

function App() {
  return (
    <div className="container">
      <div className="title">
        <h1>List of </h1>
        <img src="../images/friends.png" />
      </div>

      <Friends />
    </div>
  );
}

export default App;
