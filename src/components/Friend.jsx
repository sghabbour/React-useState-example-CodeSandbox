import React from "react";

// const noCheckedBoxes = 0;

export default function Friend(props) {
  console.log("friends");

  // Disable uneeded render
  function disableButton() {
    //Object validity
    // 1- object.Keys();
    // 2- if(props.currentFriend)
    if (props.currentFriend) {
      if (props.friend.key === props.currentFriend.key) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      key={props.friend.key}
      className={props.friend.isBestFriend ? "best-friend" : "friend"}
    >
      <label>
        <input
          name="myCheckbox"
          type="checkbox"
          onChange={() => {
            const updatedFriend = {
              ...props.friend,
              isBestFriend: !props.friend.isBestFriend
            };
            props.objectUpdater(updatedFriend);
          }}
          checked={props.friend.isBestFriend}
          disabled={disableButton()}
        />
        <span className="checkmark"></span>
      </label>
      <span>
        {props.friend.name}{" "}
        {props.friend.isBestFriend ? (
          <span roll="img" aria-label="emoji a star">
            {" "}
            🌟
          </span>
        ) : null}
      </span>

      <button
        // (JSX attribute) React.DOMAttributes<HTMLButtonElement>.onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
        onClick={() => {
          props.friendRemover(props.friend.key);
        }}
        // (JSX attribute) React.ButtonHTMLAttributes<HTMLButtonElement>.disabled?: boolean
        disabled={disableButton()}
        // disabled={true}
      >
        Remove
      </button>
      <button
        onClick={() => {
          props.friendEditor(props.friend.key);
        }}
      >
        Edit
      </button>

      {/* add checkbox and conditional styling text color
      disable the edit and remove 

      https://stackoverflow.com/questions/47873513/trigger-submit-button-with-enter-key-react

      https://www.robinwieruch.de/react-state-array-add-update-remove
      https://www.pluralsight.com/guides/manipulating-arrays-and-objects-in-state-with-react
      
      */}
    </div>
  );
}

//empty state editFriend (object) -> showForm
//newComponent

//2020.12.31
// (1) onClick on Edit, all buttons should be disabled and the styling
//     of all the names in the list should be changed!
// (2) when clicking on the checkbox -> change the isBestFriend status
// (3) Add bestfriend checkbox besieds the Add Friend button
// (*) Read about: useEffect()!
