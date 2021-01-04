import React, { useState } from "react";
import Friend from "./Friend";
import friends from "../friends";
import EditFriend from "./EditFriend";

// function to pass props to the child component
function createFriend(
  key,
  friendObject,
  removeFriend,
  editFriend,
  updateObject
) {
  //Destruction of props ... preferably inside the child component
  // const { key, name, isBestFriend } = friendObject;
  return (
    <Friend
      key={key}
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
  }

  function updateFriendObject(object) {
    //1. map into a new array and put the new object instead
    const friendsListEdited = friendsList.map((friendObject) => {
      if (friendObject.key === object.key) {
        return object;
      } else {
        return friendObject;
      }
    });

    //2. setFriends(the new array)
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
          friendObject.key,
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
        />
      ) : null}
    </div>
  );
}
