import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import './App.css';
import Dashboard from './pages/Dashboard';
import UserForm from './pages/UserForm';
import About from './pages/About';
import Student from './pages/Student';
import FoodDashboard from './pages/FoodDashboard';
import Browse from './pages/Browse';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import ProtectedRoute from './util/ProtectedRoute';
import RoleCheck from './util/RoleCheck';
import ViewOrders from './pages/ViewOrders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<About />} />
          <Route path='/user-form' element={<UserForm />} />

          {/* Protected Routes - Require Login */}
          <Route element={<ProtectedRoute />}>
            {/* Admin routes */}
            <Route element={<RoleCheck role='admin' />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/food' element={<FoodDashboard />} />
              <Route path='/orders' element={<ViewOrders />} />
            </Route>

            {/* User routes */}
            <Route element={<RoleCheck role='student' />}>
              {/* <Route path="/browse" element={<Browse />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} /> */}
              <Route path='/student' element={<Student />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
