import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const {user, logout} = useAuth();
  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  }
  return (
    <div className='w-full flex items-center justify-between max-sm:gap-4 text-white px-6 py-3 bg-slate-700'>
        <h1 className='md:text-4xl sm:text-2xl max-sm:hidden font-bold'>Leaderboard</h1>
        {
          user ? 
            <div className='xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full flex items-center justify-between'>
              <Link to='/'>Home</Link>
              <Link to='/leaderboard'>Leaderboard</Link>
              <div className='relative'>
                <button onClick={toggleShow}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 16 16" fill="none">
                  <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#ffffff"/>
                  <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#ffffff"/>
                  </svg>
                </button>
                {show && <div className={`absolute flex flex-col gap-2 text-black px-2 py-1 min-w-52 border-2 border-slate-500 rounded top-14 bg-white z-10 -left-40`}>
                  <div>
                    <p>Name: {user.firstName}</p>
                    <hr className='h-0.5 w-full bg-slate-500 mt-0.5'/>
                  </div>
                  <div>
                    <p>Username: {user.username}</p>
                    <hr className='h-0.5 w-full bg-slate-500 mt-0.5'/>
                  </div>
                  <div>
                    <p>Email: {user.email}</p>
                    <hr className='h-0.5 w-full bg-slate-500 mt-0.5'/>
                  </div>
                  <div>
                    <p>Points: {user && user.Points}</p>
                    <hr className='h-0.5 w-full bg-slate-500 mt-0.5'/>
                  </div>
                  <button onClick={() => {
                    logout();
                    setShow(false);
                  }}>Logout</button>
                </div>}
              </div>
            </div> : 
            <div className='flex items-center justify-between gap-8'>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </div>
        }
    </div>
  )
}

export default Navbar