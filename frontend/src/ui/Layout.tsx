import React, { useState, useEffect } from "react"; // Add React imports
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom"; // Add react-router-dom imports
import { FaHome, FaUpload, FaBriefcase, FaRobot, FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa"; // React Icons import

export default function Layout() {
  const [dark, setDark] = useState<boolean>(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );
  const nav = useNavigate();
  const { pathname } = useLocation();
  const role = localStorage.getItem("role");
  const authed = !!localStorage.getItem("token");

  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDark(saved === "dark");
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    nav("/login");
  };

  const NavLink = ({ to, label, icon: Icon }: any) => {
    const active = pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
          active
            ? "bg-indigo-600 text-white"
            : "glass-btn hover:shadow-md text-sm"
        }`}
      >
        <Icon className="w-4 h-4" />
        <span className="hidden sm:block">{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* navbar */}
      <header className="sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="nav-glass flex items-center justify-between px-3 py-2">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/openai.svg"
                className="w-6 h-6 opacity-90"
                alt="logo"
              />
              <span className="font-semibold">AI Resume Analyzer</span>
            </Link>

            <nav className="flex items-center gap-2">
              <NavLink to="/" label="Home" icon={FaHome} />
              <NavLink to="/upload" label="Upload" icon={FaUpload} />
              <NavLink to="/jobs" label="Jobs" icon={FaBriefcase} />
              {authed && <NavLink to="/dashboard" label="Dashboard" icon={FaHome} />}
              {role === "admin" && (
                <>
                  <NavLink to="/admin/dashboard" label="Admin" icon={FaHome} />
                  <NavLink to="/admin/chatbot" label="Chatbot" icon={FaRobot} />
                </>
              )}
              <button
                onClick={() => setDark((d) => !d)}
                className="glass-btn ml-1"
                aria-label="toggle theme"
                title="Toggle theme"
              >
                {dark ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
              </button>
              {authed ? (
                <button onClick={logout} className="glass-btn ml-1 flex items-center gap-2">
                  <FaSignOutAlt className="w-4 h-4" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              ) : (
                <Link to="/login" className="glass-btn ml-1">Login</Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* main content */}
      <main className="flex-grow max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* footer */}
      <footer className="footer-container mt-8 bg-gradient-to-t from-indigo-800 to-transparent py-8">
        <div className="footer-grid">
          <div>
            <div className="footer-heading">About</div>
            <p className="footer-text">
              Analyze resumes with AI, extract skills, measure JD similarity, and apply with confidence.
            </p>
            <img src="/path/to/footer-image.jpg" alt="AI Analysis" className="footer-image" />
          </div>
          <div>
            <div className="footer-heading">Quick Links</div>
            <ul className="footer-links">
              <li><Link to="/upload">Upload Resume</Link></li>
              <li><Link to="/jobs">Browse Jobs</Link></li>
              <li><Link to="/feedback">Feedback</Link></li>
              {role === "admin" && <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>}
            </ul>
          </div>
          <div>
            <div className="footer-heading">Newsletter</div>
            <form
              className="newsletter-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed! 🎉");
              }}
            >
              <input className="newsletter-input" placeholder="you@email.com" />
              <button className="newsletter-btn">Subscribe</button>
            </form>
            <div className="footer-note">No spam, unsubscribe anytime.</div>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} AI Resume Analyzer • Built with ❤️
        </div>
      </footer>
    </div>
  );
}
