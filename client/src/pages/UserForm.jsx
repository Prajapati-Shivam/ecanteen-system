 import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

function UserForm() {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const random = Math.floor(Math.random() * 10000);

  useEffect(() => {
    if (user && isSignedIn) {
      async function sendDetails() {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/check`,
            {
              UserName: user.fullName,
              UserEmail: user.primaryEmailAddress.emailAddress,
              College_id: random,
            }
          );

          if (response.data.exists === true) {
            setSnackbarMessage("Email Already Exists");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            navigate("/dashboard");
          } else if (response.data.exists === false) {
            navigate("/user-form");
          } else if (response.data.success === false) {
            setSnackbarMessage("Server Down! Try after some time");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            navigate("/");
          }
        } catch (error) {
          console.log(error);
        }
      }
      sendDetails();
    }
  }, [user, isSignedIn, inputValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role !== "admin") {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/addUser`,
        {
          UserName: user.fullName,
          UserEmail: user.primaryEmailAddress.emailAddress,
          College_id: inputValue,
        }
      );

      if (response.data.college_id_exists === false) {
        setSnackbarMessage("College id does not exist. Enter an existing college id");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      } else if (response.data.success) {
        setSnackbarMessage("✅ Student Registered Successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        navigate("/student");
      } else {
        setSnackbarMessage("⚠️ Something went wrong: " + response.data.message);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/addAdmin`,
          {
            Collegename: inputValue,
            UserName: user.fullName,
            UserEmail: user.primaryEmailAddress.emailAddress,
            College_id: random,
          }
        );

        if (response.data.success) {
          setSnackbarMessage("🎉 Admin Registered Successfully!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          navigate("/dashboard");
        } else {
          setSnackbarMessage("⚠️ Something went wrong: " + response.data.message);
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.log("API error:", error);
        setSnackbarMessage("❌ Server Error! Try again later.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
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

      {/* Toast notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            fontSize: "1rem",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "4px",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UserForm;
