import { useState } from 'react';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function Chatbot(){
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<string>('');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const role = localStorage.getItem('role');

  if (role !== 'admin') nav('/login');

  const send = async (e:any)=>{
    e.preventDefault();
    if(!query.trim()) return;
    try{
      setLoading(true);
      const { data } = await api.post('/chatbot/', { query });
      setAnswer(data.answer);
      setItems(data.items || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-4">
      <h2 className="text-2xl font-semibold">Admin Chatbot</h2>
      <form onSubmit={send} className="glass p-4 flex gap-2">
        <input className="flex-1" placeholder="Try: Top Python skill candidates" value={query} onChange={e=>setQuery(e.target.value)} />
        <button disabled={loading} className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white">
          {loading ? "Asking..." : "Ask"}
        </button>
      </form>

      {answer && (
        <div className="glass p-4">
          <div className="font-semibold mb-2">Answer</div>
          <div>{answer}</div>
        </div>
      )}

      {items.length>0 && (
        <div className="glass p-4">
          <div className="font-semibold mb-2">Matches</div>
          <ul className="space-y-2">
            {items.map((it,idx)=>(
              <li key={idx} className="text-sm flex justify-between gap-4">
                <div>
                  <div className="font-medium">User: {it.user_id}</div>
                  <div className="text-dim">Skills: {it.skills?.join(', ') || '—'}</div>
                </div>
                {it.match_score!=null && (
                  <div className="text-xs px-2 py-1 rounded bg-indigo-600/20 border border-indigo-600/40">
                    Score: {it.match_score}%
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
