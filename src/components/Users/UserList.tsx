import React, { useEffect } from "react";
import { useState } from "react";
import { getData } from "../../Utils/utils";
import Spinner from "../UI/Spinner";

const UserList = () => {
  const [userIndex, setUserIndex] = useState(0);
  const [users, setUsers] = useState<Array<any>>([]);
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const user = users[userIndex];

  useEffect(() => {
    getData("http://localhost:3001/users")
      .then((res) => {
        setUsers(res);
        setIsLoading(false);
      })
      .catch((err) => setError(err));
  }, []);

  if (error) return <p>{error.message}</p>;

  if (isLoading)
    return (
      <p>
        <Spinner /> Loading Users...
      </p>
    );

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
