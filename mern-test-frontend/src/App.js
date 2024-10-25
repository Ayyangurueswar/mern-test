import './App.css';
import Navbar from './ui/Navbar';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Home from './components/Home';
import LeaderBoard from './components/LeaderBoard';

function App() {
  return (
    <div className="w-full min-h-screen">
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/leaderboard' element={<LeaderBoard />}/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
