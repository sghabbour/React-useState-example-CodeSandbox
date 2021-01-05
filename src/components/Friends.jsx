import React, { useEffect, useState } from "react";
import Friend from "./Friend";
import friends from "../friends";
import EditFriend from "./EditFriend";

// function to pass props to the child component
function createFriend(
  key,
  friendObject,
  removeFriend,
  editFriend,
  updateObject,
  friendToEdit
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
      currentFriend={friendToEdit}
    />
  );
}

//default function
export default function Friends() {
  //State to add a single friend
  const [newFriend, setNewFriend] = useState("");
  //friends is the default array of objects, friendList
  //is the most recent array of objects
  const [friendsList, setFriendsList] = useState(friends);
  //useState for editing friends
  const [friendToEdit, setFriendToEdit] = useState();
  //State to show the edit form
  const [showEditForm, setShowEditForm] = useState(false);
  // State for styling the best friend
  const [isBestFriend, setIsBestFriend] = useState(false);

  useEffect(() => {
    console.log("rendered");
    //   friendsList.map((friendObject) =>
    //     createFriend(
    //       friendObject.key,
    //       friendObject,
    //       handleRemoveFriend,
    //       toggleEditForm,
    //       updateFriendObject,
    //       friendToEdit
    //     )
    //   );
  }, []);

  function handleRemoveFriend(id) {
    const newFriendsList = friendsList.filter(
      (friendObject) => id !== friendObject.key
    );
    setFriendsList(newFriendsList);
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
    setFriendsList(newFriendsList);
    setNewFriend("");
    setIsBestFriend();
  }

  function toggleEditForm(id) {
    // 1. Get friend by id
    const selectedFriend = friendsList.find(
      (friendObject) => friendObject.key === id
    );
    // 2. pass the selsectedFriendObject
    // the setFriendToEdit function state function
    setFriendToEdit(selectedFriend);
    // 3. set the showEditForm state to "true"
    setShowEditForm(true);
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

    //2. setFriendsList(the new array)
    setFriendsList(friendsListEdited);
    setShowEditForm(false);
    setFriendToEdit();
  }

  return (
    <div className="container">
      <input
        type="text"
        onChange={updateNewFriend}
        value={newFriend}
        placeholder="Enter a friend name!"
      />
      <label>
        Is Best Friend?
        <input
          type="checkbox"
          onChange={(e) => setIsBestFriend(e.target.checked)}
          checked={isBestFriend}
        />
        <span className="checkmark"></span>
      </label>

      <button type="submit" value="Add Friend" onClick={AddNewFriend}>
        Add
      </button>

      {friendsList.map((friendObject) =>
        createFriend(
          friendObject.key,
          friendObject,
          handleRemoveFriend,
          toggleEditForm,
          updateFriendObject,
          friendToEdit
        )
      )}

      {showEditForm ? (
        <EditFriend
          friendObject={friendToEdit}
          objectUpdater={updateFriendObject}
        />
      ) : null}
    </div>
  );
}
