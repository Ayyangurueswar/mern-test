import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import UserEntry from '../ui/UserEntry';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Home = () => {
    const navigate = useNavigate();
    const [allUsersData, setAllUsersData] = useState([]);
    const [timePeriod, setTimePeriod] = useState('');
    const [todayPoints, setTodayPoints] = useState();
    const token = localStorage.getItem('token');
    const {user} = useAuth();
    useEffect(() => {
        if (!token) {
            navigate('/login')
            return;
        }
        fetch(`/api/user/v1/get-users`).then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }).then((data) => {
            setAllUsersData(data.data.sort((a, b) => b.Points - a.Points));
        }).catch((err) => {
            toast.error('There has been a problem with your fetch operation', err);
        });
        fetch(`/api/user/v1/your-daily-history`).then((res) => res.json()).then((data) => {
            const points = data.data.filter((u) => u._id === user?.username);
            setTodayPoints(points[0]?.totalPointsAwarded);
        })
    }, [token, navigate, user]);
    const handleTimePeriodChange = async (t) => {
        setTimePeriod(t);
        const req = await toast.promise(fetch(`/api/user/v1/your-${t}-history`), {
            pending: 'Fetching data',
            success: `${t} data fetched`,
            error: 'Error fetching data'
        })
        if (!req.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await req.json();
        setAllUsersData(data.data.sort((a, b) => b.totalPointsAwarded - a.totalPointsAwarded));
    }
  return (
    <div className='my-10 w-4/5 mx-auto'>
        <div className='w-full bg-blue-500 px-6 py-4 flex items-center justify-between text-white'>
            <div>
                <p>{todayPoints || 0} Today</p>
                <p>&#8377; {user ? user.Points : 0}</p>
            </div>
            <p>Leaderboard</p>
        </div>
        <div className='w-full bg-slate-100'>
            <div className='py-3 w-full flex items-center justify-center gap-5'>
                <button className={`${timePeriod === 'daily' ? 'bg-orange-500 text-white' : 'bg-slate-200'} rounded-full px-4 py-2`} onClick={() => {handleTimePeriodChange('daily')}}>Daily</button>
                <button className={`${timePeriod === 'weekly' ? 'bg-orange-500 text-white' : 'bg-slate-200'} rounded-full px-4 py-2`} onClick={() => {handleTimePeriodChange('weekly')}}>Weekly</button>
                <button className={`${timePeriod === 'monthly' ? 'bg-orange-500 text-white' : 'bg-slate-200'} rounded-full px-4 py-2`} onClick={() => {handleTimePeriodChange('monthly')}}>Monthly</button>
            </div>
            <div className='w-3/4 py-3 mx-auto flex items-center justify-between'>
                {
                    allUsersData.length > 0 && allUsersData.slice(0, Math.min(allUsersData.length, 3)).map((data) => (
                        <div key={data._id}>
                            <p>{data.username || data._id}</p>
                            <p>{data.Points || data.totalPointsAwarded}</p>
                            <p className='text-orange-500'>Prize: &#8377;{data.Points || data.totalPointsAwarded}</p>
                        </div>
                    ))
                }
            </div>
            <div className='w-full'>
                {
                    allUsersData.length > 0 && allUsersData.map((data, i) => (
                        <UserEntry data={data} rank={i+1} key={data._id} setAllUsersData={setAllUsersData} setTimePeriod={setTimePeriod}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Home