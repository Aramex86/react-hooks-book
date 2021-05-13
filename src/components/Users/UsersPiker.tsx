import React from "react";
import { users } from "../../static.json";

const UsersPiker = () => {
  return (
    <select>
      {users.map((u) => (
        <option key={u.id}>{u.name}</option>
      ))}
    </select>
  );
};

export default UsersPiker;
