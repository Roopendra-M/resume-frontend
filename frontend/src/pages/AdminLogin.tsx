import { useState } from 'react';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e:any)=>{
    e.preventDefault();
    if(!email || !password) return alert("Enter admin email & password");
    try{
      setLoading(true);
      const {data} = await api.post('/auth/admin/login',{email,password});
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('role', data.role);
      nav('/admin/dashboard');
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto glass p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full" placeholder="Admin Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 rounded py-2 text-white">
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
