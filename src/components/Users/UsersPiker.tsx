import React, { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";

const UsersPiker = () => {
  const [users, setUsers] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      await fetch(`http://localhost:301/users`)
        .then((res) => res.json())
        .then((res) => setUsers(res));
    };

    fetchUsers();
  }, []);

  if (users.length === 0) return <Spinner />;

  console.log(users);
  return (
    <select>
      {users.map((u: any) => (
        <option key={u.id}>{u.name}</option>
      ))}
    </select>
  );
};

export default UsersPiker;
