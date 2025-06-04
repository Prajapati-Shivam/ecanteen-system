import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          {/* <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
