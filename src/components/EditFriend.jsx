import React, { useState } from "react";

export default function EditFriend(props) {
  const [newName, setNewName] = useState(props.friendObject.name);

  function handleKeyPress(event) {
    if (event.charCode === 13) {
      props.nameSetter(props.dispalyName);
    }
  }

  return (
    <div>
      <label>Edit name!</label>
      <input
        type="text"
        value={newName}
        placeholder="Friend's name"
        onChange={(e) => setNewName(e.target.value)}
        // onKeyPress={handleKeyPress}
        name="nameField"
      />
      {/* onclick we will create the new object 
      and update the name flag by newName */}
      <button
        onClick={() => {
          const updatedFriend = {
            ...props.friendObject,
            name: newName
          };
          props.objectUpdater(updatedFriend);
        }}
      >
        Save Edits
      </button>
    </div>
  );
}
