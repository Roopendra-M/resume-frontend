import { useEffect, useMemo, useState } from "react";
import api from "../lib/api";

interface Resume {
  id: string;
  filename: string;
}

export default function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Admin create fields
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");

  // User selected resume
  const [selectedResume, setSelectedResume] = useState<string>("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const params: any = {};
        if (startDate) params.start_date = startDate;
        if (endDate) params.end_date = endDate;
        const r = await api.get("/jobs/", { params });
        setJobs(
          r.data.map((job: any) => ({
            id: job.id || job._id,
            title: job.title || "",
            company: job.company || "",
            location: job.location || "",
            description: job.description || "",
            skills: job.skills || [],
          }))
        );
      } catch (err) {
        console.error("Error fetching jobs:", err);
        showToast("Error fetching jobs", "error");
      } finally {
        setLoading(false);
      }
    };

    const fetchResumes = async () => {
      if (!token) return;
      try {
        const r = await api.get("/resume/me", { headers: { Authorization: `Bearer ${token}` } });
        setResumes(r.data);
      } catch (err) {
        console.error("Error fetching resumes:", err);
      }
    };

    fetchJobs();
    fetchResumes();
  }, [startDate, endDate, token]);

  // Admin: create job
  const createJob = async (e: any) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        company,
        location,
        description,
        skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
      };
      const { data } = await api.post("/jobs/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs((prev) => [{ ...data, id: data.id }, ...prev]);
      setTitle("");
      setCompany("");
      setLocation("");
      setDescription("");
      setSkills("");
      showToast("Job posted successfully!", "success");
    } catch (err: any) {
      console.error("Error creating job:", err);
      showToast(err.response?.data?.detail || "Unauthorized: Please login", "error");
    }
  };

  // Apply for job
  const apply = async (job_id: string) => {
    if (!token) {
      showToast("Unauthorized: Please login", "error");
      return;
    }
    if (!selectedResume) {
      showToast("Please select a resume", "error");
      return;
    }
    try {
      const { data } = await api.post(
        "/apply/",
        { job_id, resume_id: selectedResume },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setModalContent(data);
      setIsModalOpen(true);
      showToast("Applied successfully!", "success");
    } catch (err: any) {
      console.error("Error applying:", err.response?.data || err.message);
      showToast(err.response?.data?.detail || "Error applying", "error");
    }
  };

  const filtered = useMemo(() => {
    if (!query) return jobs;
    const q = query.toLowerCase();
    return jobs.filter((j) =>
      [j.title, j.company, j.location, j.description, (j.skills || []).join(" ")]
        .filter(Boolean)
        .some((t) => t.toLowerCase().includes(q))
    );
  }, [jobs, query]);

  return (
    <div className="space-y-6 relative p-4">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 rounded shadow-lg text-white z-50 transition-opacity duration-300 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Search & Filters */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Job Listings</h2>
        <input
          placeholder="Search title, company, skills…"
          className="w-64 max-w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Admin Form */}
      {role === "admin" && (
        <form onSubmit={createJob} className="glass p-6 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold">Post a New Job</h3>
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" />
          <input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" />
          <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" />
          <input placeholder="Skills (comma separated)" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" />
          <textarea placeholder="Job Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" />
          <button type="submit" className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg">Post Job</button>
        </form>
      )}

      {/* Job Listings */}
      {loading ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">Loading jobs…</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 && <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">No jobs match your search.</div>}
          {filtered.map((job) => (
            <div key={job.id} className="p-6 bg-glass dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="font-semibold text-xl text-indigo-700">{job.title}</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">{job.company} • {job.location}</div>
              <div className="mt-2 text-gray-700 dark:text-gray-300 line-clamp-4">{job.description}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {job.skills?.map((skill: string) => (
                  <span key={skill} className="text-xs px-2 py-1 rounded-full border border-indigo-500/40 bg-indigo-500/10 dark:bg-indigo-700/20">{skill}</span>
                ))}
              </div>

              {/* Resume dropdown for applying */}
              {role !== "admin" && resumes.length > 0 && (
                <select
                  value={selectedResume}
                  onChange={(e) => setSelectedResume(e.target.value)}
                  className="mt-2 w-full px-3 py-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="">Select Resume</option>
                  {resumes.map((r) => (
                    <option key={r.id} value={r.id}>{r.filename}</option>
                  ))}
                </select>
              )}

              <div className="mt-3">
                <button onClick={() => apply(job.id)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg w-full">Apply</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold text-white">Application Details</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-300">✕</button>
            </div>
            <div className="mt-4">
              <div className="text-lg font-medium text-indigo-400">Job Title: {modalContent?.job_title}</div>
              <div className="text-sm text-gray-300">Company: {modalContent?.company}</div>
              <div className="text-sm text-gray-300">Location: {modalContent?.location}</div>
              <div className="mt-4 text-gray-200">{modalContent?.description}</div>
              <div className="mt-6 text-xl font-semibold text-indigo-500">Match Score: {modalContent?.match_score}%</div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
