import React, { useState } from "react";
import Friend from "./Friend";
import friends from "../friends";
import EditFriend from "./EditFriend";

// function to pass props to the child component
function createFriend(friendObject, removeFriend, editFriend, updateObject) {
  //Destruction of props ... preferably inside the child component
  // const { key, name, isBestFriend } = friendObject;
  return (
    <Friend
      friend={friendObject}
      friendRemover={removeFriend}
      friendEditor={editFriend}
      objectUpdater={updateObject}
    />
  );
}

//default function
export default function Friends() {
  //State to add a single friend
  const [newFriend, setNewFriend] = useState("");
  //friends is the default array of objects, friendList
  //is the most recent array of objects
  const [friendsList, setFriends] = useState(friends);
  //useState for editing friends
  const [editedFriend, setFriendName] = useState();
  //State to show the edit form
  const [showEdit, setShowEdit] = useState(false);
  // State for styling the best friend
  const [isBestFriend, setIsBestFriend] = useState(false);

  function handleRemoveFriend(id) {
    const newFriendsList = friendsList.filter(
      (friendObject) => id !== friendObject.key
    );
    setFriends(newFriendsList);
  }

  function updateNewFriend(event) {
    setNewFriend(event.target.value);
  }

  function AddNewFriend() {
    const newKey = friendsList[friendsList.length - 1].key + 1;
    const addedFriend = {
      key: newKey,
      name: newFriend,
      isBestFriend: isBestFriend
    };
    const newFriendsList = friendsList.concat(addedFriend);
    setFriends(newFriendsList);
    setNewFriend("");
    setIsBestFriend("false");
  }

  function editFriendName(id) {
    // 1. Get friend by id
    const selectedFriend = friendsList.find(
      (friendObject) => friendObject.key === id
    );
    // 2. pass the selsectedFriendObject
    // the setFriendName function state function
    setFriendName(selectedFriend);
    // 3. set the showEdit state to "true"
    setShowEdit(true);
    // 4.
  }

  function setEditedName(inputName) {
    //1.input name
    const selectedFriend = { ...editedFriend, name: inputName };
    //2. update the array and put it in a new array
    const friendsListEdited = friendsList.map((friendObject) => {
      if (friendObject.key === selectedFriend.key) {
        return selectedFriend;
      } else {
        return friendObject;
      } // it is also possible to elimenate else
    });
    //3. putting the new array in the current state and
    //set the state of showing the form to false
    setFriends(friendsListEdited);
    setShowEdit(false);
  }

  function updateFriendObject(object) {
    //3. map into a new array and put the new object instead
    const friendsListEdited = friendsList.map((friendObject) => {
      if (friendObject.key === object.key) {
        return object;
      } else {
        return friendObject;
      }
    });

    //4. setFriends(the new array)
    setFriends(friendsListEdited);
    setShowEdit(false);
  }

  return (
    <div className="friends-box">
      <input
        type="text"
        onChange={updateNewFriend}
        value={newFriend}
        placeholder="Enter a friend name!"
      />

      <label>Is Best Friend?</label>
      <input
        type="checkbox"
        onChange={(e) => setIsBestFriend(e.target.checked)}
      />

      <button type="submit" value="Add Friend" onClick={AddNewFriend}>
        Add
      </button>

      {friendsList.map((friendObject) =>
        createFriend(
          friendObject,
          handleRemoveFriend,
          editFriendName,
          updateFriendObject
        )
      )}

      {showEdit ? (
        <EditFriend
          friendObject={editedFriend}
          objectUpdater={updateFriendObject}
          nameSetter={setEditedName}
        />
      ) : null}
    </div>
  );
}
