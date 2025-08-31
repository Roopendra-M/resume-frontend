import { useState } from 'react';
import api from '../lib/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const [loading,setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e:any)=>{
    e.preventDefault();
    if(!email || !password || !name) return alert("Please fill all fields");
    try{
      setLoading(true);
      await api.post('/auth/signup',{email,password,name});
      nav('/login');
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto glass p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Account</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 rounded py-2 text-white">
          {loading ? "Creating..." : "Signup"}
        </button>
        <div className="text-center text-sm text-dim">
          Already have an account? <Link to="/login" className="underline">Login</Link>
        </div>
      </form>
    </div>
  );
}
