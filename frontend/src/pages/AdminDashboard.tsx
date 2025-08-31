import { useEffect, useMemo, useState } from 'react';
import api from '../lib/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, LineChart, Line, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard(){
  const [stats, setStats] = useState<any>({});
  const [feedback, setFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(()=>{
    if (role !== 'admin') nav('/login');
  },[role]);

  useEffect(()=>{
    (async ()=>{
      try{
        const [s,f] = await Promise.all([
          api.get('/admin/dashboard'),
          api.get('/feedback')
        ]);
        setStats(s.data);
        setFeedback(f.data);
      } finally {
        setLoading(false);
      }
    })();
  },[]);

  const barData = useMemo(()=>[
    { name: 'Users', value: stats.users||0 },
    { name: 'Jobs', value: stats.jobs||0 },
    { name: 'Resumes', value: stats.resumes||0 },
    { name: 'Applications', value: stats.applications||0 },
  ],[stats]);

  const lineData = useMemo(()=>[
    { name: 'Last 30 days', applications: stats.applications_last_30||0 }
  ],[stats]);

  const pieData = useMemo(()=>[
    { name: 'Feedback', value: feedback.length||0 },
    { name: 'No Feedback', value: Math.max(0, (stats.users||0) - (feedback.length||0)) }
  ],[stats,feedback]);

  if (loading) return <div className="glass p-6">Loading dashboard…</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>

      {/* quick stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'Users', v: stats.users||0 },
          { label:'Jobs', v: stats.jobs||0 },
          { label:'Resumes', v: stats.resumes||0 },
          { label:'Applications', v: stats.applications||0 }
        ].map(s=>(
          <div key={s.label} className="glass p-4 rounded-lg">
            <div className="text-sm text-dim">{s.label}</div>
            <div className="text-2xl font-semibold">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Entities</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Applications (30d)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="applications" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Feedback Coverage</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" label />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h3 className="text-xl font-semibold">Recent Feedback</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {feedback.length === 0 && <div className="glass p-4">No feedback yet.</div>}
        {feedback.map((f:any)=> (
          <div key={f.id} className="p-4 glass rounded-lg">
            <div className="text-sm text-dim">{new Date(f.created_at).toLocaleString()}</div>
            <div className="font-semibold mt-1">{'★'.repeat(f.rating)}{'☆'.repeat(5-f.rating)}</div>
            <p className="mt-2">{f.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
