import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Google() {
  const navigate = useNavigate();
  const collegename = localStorage.getItem("collegeName");
  const { user, isSignedIn } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [yes, setYes] = useState(false);

  useEffect(() => {
    if (user && isSignedIn) {
      setName(user.fullName);
      setEmail(user.primaryEmailAddress.emailAddress);

      async function sendDetails() {
        try {
          const random = Math.floor(Math.random() * 10000);
          console.log(random);
          const response = await axios.post("http://localhost:3001/loginD", {
            Collegename: collegename,
            UserName: user.fullName,
            UserEmail: user.primaryEmailAddress.emailAddress,
            College_id: random,
          });
          if (response.data.exists == true) {
            alert("Email Already Exists");
            window.location = "/register";
          } else if (response.data.success == true) {
            alert("You have been registered. Kindly login now!!!");
            window.location = "/login";
          } else if (response.data.success == false) {
            alert("Server Down!. \nTry after some time");
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (yes == true) {
        sendDetails();
      }
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
      <SignedOut>
        <SignIn redirectUrl="/GoogleSignin" />
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
        <br />
        <br /> <br />
        <h4>Are you sure you want to use this gmail account?</h4>
        <br />
        <button
          onClick={() => {
            setYes(true);
          }}
          style={{ background: "white", color: "black" }}
        >
          Yes
        </button>{" "}
        <br />
        <h4>If not click on the icon and signout</h4>
      </SignedIn>
    </div>
  );
}

export default Google;
