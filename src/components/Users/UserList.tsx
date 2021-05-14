import React from "react";
import { useState } from "react";
import { users } from "../../static.json";

const UserList = () => {
  const [userIndex, setUserIndex] = useState(0);

  const user = users[userIndex];

  return (
    <>
      <div className="users-list">
        <ul className="users items-list-nav">
          {users.map((u, i) => (
            <li key={u.id} className={i === userIndex ? "selected" : ""}>
              <button className="btn" onClick={() => setUserIndex(i)}>
                {u.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {users && (
        <div className="user-details">
          <div className="item">
            <div className="item-header">
              <h2>{user.name}</h2>
            </div>
            <h3>{user.title}</h3>
            <p>{user.notes}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default UserList;
