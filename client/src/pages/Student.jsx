import React from "react";
import { useUser } from "@clerk/clerk-react";

const Student = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div>
      <h2>Welcome to Student Account !!!</h2>
      <h3>Role: {user?.publicMetadata?.role}</h3>
      <h3>College Id: {user?.publicMetadata.college_id}</h3>
    </div>
  );
};

export default Student;
