import React, { useState } from "react";
import UserList from "./UserList";
import UsersDetails from "./UsersDetails";

const UsersPage = () => {
   // manage selected user state
   const [user, setUser] = useState(null);

   // pass user state down
   return (
     <main className="users-page">
       <UserList user={user} setUser={setUser}/>
       <UsersDetails user={user}/>
     </main>
   );
};

export default UsersPage;
