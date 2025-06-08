import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import UserForm from "./pages/UserForm";
import About from "./pages/About";
import GooglesignIn from "./pages/Google";
import Student from "./pages/Student";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/student" element={<Student />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
