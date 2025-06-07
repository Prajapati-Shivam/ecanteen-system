// Clerk components for auth (SignIn UI, buttons, and user state)
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
// Hook to get current signed-in user's info
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserForm() {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Role:", role);
    console.log(role === "admin" ? "College Name:" : "College ID:", inputValue);
    console.log(user.fullName + " " + user.primaryEmailAddress.emailAddress);

    if (role !== "admin") {
      const response = await axios.post(
        "http://localhost:3001/insertDetailsUser",
        {
          UserName: user.fullName,
          UserEmail: user.primaryEmailAddress.emailAddress,
          College_id: inputValue, // college ID entered by student
        }
      );

      if (response.data.college_id_exists == false) {
        alert("College id does not exist\n Enter an existing college id");
      } else if (response.data.success) {
        alert("✅ Student Registered Successfully!");
        navigate("/dashboard");
      } else {
        alert("⚠️ Something went wrong: " + response.data.message);
      }
    } else {
      try {
        const random = Math.floor(Math.random() * 10000);
        console.log("Generated College ID:", random);

        const response = await axios.post(
          "http://localhost:3001/insertDetailsAdmin",
          {
            Collegename: inputValue,
            UserName: user.fullName,
            UserEmail: user.primaryEmailAddress.emailAddress,
            College_id: random,
          }
        );

        if (response.data.success) {
          alert("🎉 Admin Registered Successfully!");
          navigate("/dashboard");
        } else {
          alert("⚠️ Something went wrong: " + response.data.message);
        }
      } catch (error) {
        console.log("API error:", error);
        alert("❌ Server Error! Try again later.");
      }
    }
  };

  return (
    <div>
      <h1>This is a demo form</h1>
      <div>
        <label>
          <input
            type="radio"
            name="role"
            value="admin"
            checked={role === "admin"}
            onChange={() => {
              setRole("admin");
              setInputValue("");
            }}
          />
          Admin
        </label>
        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            name="role"
            value="student"
            checked={role === "student"}
            onChange={() => {
              setRole("student");
              setInputValue("");
            }}
          />
          Student
        </label>
      </div>

      {role && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="input">
              {role === "admin" ? "College Name:" : "College ID:"}
            </label>
            <input
              type="text"
              id="input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ color: "black" }}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default UserForm;
