import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Date Range State
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const params: any = {};
        if (startDate) params.start_date = startDate;
        if (endDate) params.end_date = endDate;
        
        const r = await api.get('/apply/me', { params });
        setApps(r.data);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [startDate, endDate]);

  if (loading) return <div className="glass p-6">Loading your applications…</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Your Applications</h2>

      {/* Date Range Filter */}
      <div className="flex gap-6 mb-6">
        <div>
          <label className="block text-gray-600 dark:text-gray-200">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-gray-600 dark:text-gray-200">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {apps.length === 0 ? (
        <div className="glass p-6">
          <div className="font-medium mb-1 text-gray-800 dark:text-white">No applications yet</div>
          <div className="text-dim text-sm text-gray-600 dark:text-gray-400">Start by browsing jobs that match your skills.</div>
          <div className="mt-4">
            <Link to="/jobs" className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white">
              Find Jobs
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Improved Grid Layout */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {apps.map((a) => (
              <div key={a.id} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <div className="font-semibold text-xl text-indigo-700 dark:text-indigo-400">{a.job_title}</div>
                <div className="text-gray-600 text-sm dark:text-gray-300">{a.job_title} at {a.company}</div>
                <div className="mt-2 text-gray-700 line-clamp-3 dark:text-gray-200">{a.job_description}</div>
                <div className="mt-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Applied on: {new Date(a.created_at).toLocaleString()}</div>
                </div>
                <div className="mt-3">
                  <div className="text-sm text-indigo-500 dark:text-indigo-400">Match Score: {a.match_score}%</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link to="/jobs" className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white">
              Find More Jobs
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
