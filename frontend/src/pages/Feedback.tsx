import { useState } from 'react';
import api from '../lib/api';

export default function Feedback(){
  const [message,setMessage] = useState('');
  const [rating,setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e:any)=>{
    e.preventDefault();
    if(!message.trim()) return alert("Please add your feedback message");
    try{
      setSubmitting(true);
      await api.post('/feedback/', { message, rating });
      setMessage('');
      setRating(5);
      alert('Thanks for your feedback! 🌟');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
      <form onSubmit={submit} className="space-y-3 p-4 glass">
        <textarea className="w-full" rows={4} placeholder="Your thoughts..." value={message} onChange={e=>setMessage(e.target.value)} />
        <div className="flex items-center gap-2">
          {[1,2,3,4,5].map(n=>(
            <button
              key={n}
              type="button"
              onClick={()=>setRating(n)}
              className={`px-3 py-1 rounded ${n<=rating ? 'bg-indigo-600 text-white' : 'glass-btn'}`}
              aria-label={`rate ${n}`}
            >
              {n}★
            </button>
          ))}
        </div>
        <button disabled={submitting} className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white">
          {submitting ? 'Submitting…' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
