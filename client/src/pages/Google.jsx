import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";

function Google() {
  const collegename = localStorage.getItem("collegeName");
  console.log(collegename);

  const { user, isSignedIn } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user && isSignedIn) {
      setName(user.fullName);
      setEmail(user.primaryEmailAddress.emailAddress);

      async function sendDetails() {
        try {
          const response = await axios.post("http://localhost:3001/loginD", {
            Collegename: collegename,
            UserName: user.fullName,
            UserEmail: user.primaryEmailAddress.emailAddress,
          });
          console.log(response);
        } catch (error) {
          console.log(error);
        } finally {
        }
      }
      sendDetails();
    }
  }, [user, isSignedIn, collegename]);

  return (
    <div>
      <SignedOut>
        <SignIn redirectUrl={window.location.pathname} />
      </SignedOut>

      <SignedIn>
        <p>
          You are signed in!
          {collegename} <br />
          {name} <br />
          {email} <br />
        </p>
        <UserButton afterSignOutUrl="/register" />
      </SignedIn>
    </div>
  );
}

export default Google;
