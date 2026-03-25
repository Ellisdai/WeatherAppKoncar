import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Stats from './pages/Stats';
import Navbar from './components/Navbar';
import CurrentWeather from './components/CurrentWeather';

function Layout(){
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/register";

  return (
    <div>
      {!hideNavbar && <Navbar />}
      {!hideNavbar && <CurrentWeather />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/stats" element={<Stats />} />
      </Routes> 
    </div>
  );
}


function App(){
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;
