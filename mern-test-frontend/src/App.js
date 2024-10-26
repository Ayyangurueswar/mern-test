import './App.css';
import Navbar from './ui/Navbar';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Home from './components/Home';
import LeaderBoard from './components/LeaderBoard';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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
            <Route path='*' element={<p>404 - Not found</p>} />
          </Routes>
          <div id='modal-root'></div>
          <ToastContainer theme='colored' newestOnTop/>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
