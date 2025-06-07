// Clerk components for auth (SignIn UI, buttons, and user state)
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
// Hook to get current signed-in user's info
import { useUser } from "@clerk/clerk-react";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Google() {
  const navigate = useNavigate();
  // Get college name stored locally (saved during previous steps)
  const collegename = localStorage.getItem("collegeName");

  // Clerk-provided user and sign-in status
  const { user, isSignedIn } = useUser();

  // Local state to hold user's name and email from Clerk
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Flag to determine if user clicked "Yes"
  const [yes, setYes] = useState(false);

  useEffect(() => {
    // When user is signed in and user data is available
    if (user && isSignedIn) {
      setName(user.fullName);
      setEmail(user.primaryEmailAddress.emailAddress);

      // Function to send user details to backend
      async function sendDetails() {
        try {
          // Generate random ID for college
          const random = Math.floor(Math.random() * 10000);
          console.log(random);

          // POST user details to backend
          const response = await axios.post("http://localhost:3001/check", {
            UserName: user.fullName,
            UserEmail: user.primaryEmailAddress.emailAddress,
            College_id: random,
          });

          // Handle various responses from backend
          if (response.data.exists === true) {
            alert("Email Already Exists");
            navigate("/dashboard"); // ⚠️ Consider using `navigate("/register")`
          } else if (response.data.exists === false) {
            navigate("/user-form");
          } else if (response.data.success === false) {
            alert("Server Down!\nTry after some time");
            navigate("/");
          }
        } catch (error) {
          console.log(error);
        }
      }

      // Only send details after user confirms by clicking "Yes"

      sendDetails();
    }
  }, [user, isSignedIn, collegename, yes]);

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
      {/* If user is not signed in, show Clerk SignIn component */}
      <SignedOut>
        <SignIn redirectUrl="/GoogleSignin" />
      </SignedOut>

      {/* If user is signed in, show their info and confirmation prompt */}
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
            <strong>Name:</strong> {name} <br />
            <strong>Email:</strong> {email}
          </p>

          {/* Clerk user dropdown button (used to sign out) */}
          <div style={{ marginTop: "1rem" }}>
            <UserButton afterSignOutUrl="/register" />
          </div>
        </div>

        {/* Confirmation section */}
      </SignedIn>
    </div>
  );
}

export default Google;
