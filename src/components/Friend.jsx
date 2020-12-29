import React from "react";

export default function Friend(props) {
  return (
    <div key={props.id} className="friend">
      <span>{props.name}</span>
      <button
        onClick={() => {
          props.friendRemover(props.id);
        }}
      >
        Remove
      </button>
      <button
        onClick={() => {
          props.friendEditor();
        }}
      >
        Edit
      </button>
    </div>
  );
}

//empty state editFriend (object) -> showForm
//newComponent
