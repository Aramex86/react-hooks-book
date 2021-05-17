import React, { useEffect } from "react";
import { useState } from "react";
import { getData } from "../../Utils/utils";
import Spinner from "../UI/Spinner";

const UserList = ({ user, setUser }: any) => {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<any>(null);

  useEffect(() => {
    getData("http://localhost:3001/users")
      .then((data) => {
        setUser(data[0]); // set initial user to first (or undefined)
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [setUser]); // pass in dependency

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return (
      <p>
        <Spinner /> Loading users...
      </p>
    );
  }

  return (
    <ul className="users items-list-nav">
      {users.map((u: any) => (
        <li key={u.id} className={u.id === user?.id ? "selected" : ""}>
          <button className="btn" onClick={() => setUser(u)}>
            {u.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
