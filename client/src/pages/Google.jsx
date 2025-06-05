import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";

function Google() {
  const collegename = localStorage.getItem("collegeName");
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
        }
      }

      sendDetails();
    }
  }, [user, isSignedIn, collegename]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        padding: "1rem",
      }}
    >
      <SignedOut>
        <SignIn redirectUrl="/login" />
      </SignedOut>

      <SignedIn>
        <div
          style={{
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            textAlign: "center",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <p>
            ✅ You are signed in! <br />
            <strong>College:</strong> {collegename} <br />
            <strong>Name:</strong> {name} <br />
            <strong>Email:</strong> {email}
          </p>
          <div style={{ marginTop: "1rem" }}>
            <UserButton afterSignOutUrl="/register" />
          </div>
        </div>
      </SignedIn>
    </div>
  );
}

export default Google;
