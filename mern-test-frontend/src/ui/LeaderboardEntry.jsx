import React, {useState} from 'react'
import Modal from './Modal';
import { toast } from 'react-toastify';

const LeaderboardEntry = ({data, rank}) => {
  const [show, setShow] = useState(false);
  const [history, setHistory] = useState([]);
  const handleClick = async () => {
    try{
      const req = await toast.promise(fetch(`/api/user/v1/your-history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username || data._id,
        }),
      }), {
        pending: 'Loading history...',
      })
      const res = await req.json();
      if(!res.success){
        toast.error(res.message);
        throw new Error(res.message);
      }
      setHistory(res.data);
      setShow(true);
    } catch (e) {
      toast.error(`Failed to get history: ${e}`);
    }
  }
  const onClose = () => {
    setShow(false);
  }
  return (
    <div className='flex items-center justify-between p-4 rounded-md hover:bg-slate-200' key={data._id} onClick={handleClick}>
        <div className='flex items-center gap-5'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 16 16" fill="none">
            <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#000000"/>
            <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#000000"/>
            </svg>
            <div>
                <p>{data.username || data._id}</p>
                <p>Rank: {rank}</p>
            </div>
        </div>
        <p className='text-orange-500'>Prize: &#8377;{data.Points || data.totalPointsAwarded || 0}</p>
        <p className='text-green-600'>{data.Points || data.totalPointsAwarded || 0}</p>
        <Modal show={show} title={`${data.username || data._id}'s History`} onClose={onClose}>
          {
            history.length > 0 ? history.map((event, i) => (
              <div key={i} className='py-2 border-b-[1px] border-slate-600'>
                <p>Date: {event.date}</p>
                <p>Points: {event.pointsAwarded}</p>
              </div>
            )) : <p>No history found.</p>
          }
        </Modal>
    </div>
  )
}

export default LeaderboardEntry