import React, {useState} from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name, value} = e.target
    setUserData({...userData, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        await login(userData);
        navigate('/');

    } catch (error){
        console.error(error);
    }
  }
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <div className='w-1/3 my-6'>
            <h1 className='font-bold text-4xl text-center'>Login</h1>
            <form className='w-full mt-8 flex items-center gap-4 flex-col'>
                <input type='text' className='w-full p-4 rounded-lg bg-gray-200 focus:outline-none focus:bg-white' placeholder='Username' name='username' onChange={handleChange}/>
                <input type='password' className='w-full p-4 rounded-lg bg-gray-200 focus:outline-none focus:bg-white' placeholder='Password' name='password' onChange={handleChange}/>
                <button className='w-1/2 px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600' onClick={handleSubmit}>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login