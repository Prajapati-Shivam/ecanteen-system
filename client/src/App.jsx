import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import './App.css';
import Dashboard from './pages/Dashboard';
import UserForm from './pages/UserForm';
import About from './pages/About';
import Student from './pages/Student';
import FoodDashboard from './pages/FoodDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/user-form' element={<UserForm />} />

          {/* Admin routes */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/food' element={<FoodDashboard />} />

          {/* Student routes */}
          <Route path='/student' element={<Student />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
