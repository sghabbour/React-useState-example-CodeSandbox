import React, { useState } from "react";
import Friend from "./Friend";
import friends from "../friends";

// function to pass props to the child component
function createFriend(friendObject, removeFriend, editFriend) {
  return (
    <Friend
      id={friendObject.key}
      name={friendObject.name}
      friendRemover={removeFriend}
      friendEditor={editFriend}
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

  //handleFriendRemove function
  function handleRemoveFriend(id) {
    const newFriendsList = friendsList.filter(
      (friendObject) => id !== friendObject.key
    );
    setFriends(newFriendsList);
  }

  function updateNewFriend(event) {
    setNewFriend(event.target.value);
    console.log(newFriend);
  }

  function AddNewFriend() {
    // const newKey = friendsList.length;
    const newKey = friendsList[friendsList.length - 1].key + 1;
    const addedFriend = { key: newKey, name: newFriend };
    const newFriendsList = friendsList.concat(addedFriend);
    setFriends(newFriendsList);
    setNewFriend("");
    // console.log(newFriendsList);
  }

  function editFriendName(id) {
    // Get friend by id
    const selectedFriend = friendsList.filter(
      (friendObject) => id === friendObject.key
    )[0];
    console.log(selectedFriend);

    // set setFriendName

    //EditFriendComponent, Conditonal rendering based on editedFriend
    // Input & Edit friend
    //updateFriend function similar to AddNewFriend(input from the
    //new component)

    //keyword: update item in array of objects
    // const editedFriend = {...selectedFriend,name:"koko"}
  }

  return (
    <div className="friends-box">
      <input
        onChange={updateNewFriend}
        value={newFriend}
        placeholder="Enter a friend name!"
      />
      <button onClick={AddNewFriend}>Add Friend</button>
      {friendsList.map((friendObject) =>
        createFriend(friendObject, handleRemoveFriend, editFriendName)
      )}
    </div>
  );
}
