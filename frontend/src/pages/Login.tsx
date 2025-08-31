import { useState } from 'react';
import api from '../lib/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e:any)=>{
    e.preventDefault();
    if(!email || !password) return alert("Please fill all fields");
    try{
      setLoading(true);
      const {data} = await api.post('/auth/login',{email,password});
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('role', data.role);
      nav('/dashboard');
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto glass p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">User Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 rounded py-2 text-white">
          {loading ? "Signing in..." : "Login"}
        </button>
        <div className="text-center text-sm text-dim">
          No account? <Link to="/signup" className="underline">Create one</Link>
        </div>
      </form>
    </div>
  );
}
