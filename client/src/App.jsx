import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Google from "./pages/Google";
import "./App.css";
import Dashboard from "./pages/Dashboard";


import AboutUs from "./pages/AboutUS";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/GoogleSignin" element={<Google />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
