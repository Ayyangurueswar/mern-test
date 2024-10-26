import React, {useState} from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name, value} = e.target
    setUserData({...userData, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password!== confirmPassword) {
      toast.error('Passwords do not match')
      return;
    }
    if(!userData.firstName || !userData.lastName || !userData.username || !userData.password || !userData.email){
      toast.error('Please fill all required fields');
      return;
    }
    try{
        await register(userData);
        navigate('/');

    } catch (error){
        alert(error);
    }
  }
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <div className='w-1/3 my-6'>
            <h1 className='font-bold text-4xl text-center'>Register</h1>
            <form className='w-full mt-8 flex items-center gap-4 flex-col'>
                <input type='text' className='w-full p-4 rounded-lg bg-gray-200 focus:outline-none focus:bg-white' placeholder='First name' name='firstName' onChange={handleChange}/>
                <input type='text' className='w-full p-4 rounded-lg bg-gray-200 focus:outline-none focus:bg-white' placeholder='Last name' name='lastName' onChange={handleChange}/>
                <input type='text' className='w-full p-4 rounded-lg bg-gray-200 focus:outline-none focus:bg-white' placeholder='Username' name='username' onChange={handleChange}/>
                <input type='email' className='w-full p-4 rounded-lg bg-gray-200 focus:outline-none focus:bg-white' placeholder='Email' name='email' onChange={handleChange}/>
                <input type='password' className='w-full p-4 rounded-lg bg-gray-200 focus:outline-none focus:bg-white' placeholder='Password' name='password' onChange={handleChange}/>
                <input type='password' className='w-full p-4 rounded-lg bg-gray-200 focus:outline-none focus:bg-white' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)}/>
                <button className='w-1/2 px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600' onClick={handleSubmit}>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Register