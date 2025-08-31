import { Link } from 'react-router-dom';
import { Upload, Briefcase, Brain, ShieldCheck, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="text-center space-y-16">
      {/* Hero */}
      <section className="relative overflow-hidden glass py-12">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(600px 300px at 0% 0%, rgba(99,102,241,0.25), transparent), radial-gradient(800px 300px at 100% 100%, rgba(244,63,94,0.2), transparent)",
          }}
        />
        <h1 className="text-4xl md:text-5xl font-bold">AI Resume Analyzer</h1>
        <p className="mt-2 text-slate-600 dark:text-white/70 max-w-2xl mx-auto">
          Upload a resume, extract skills, compare with JDs, and get job matches instantly.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link to="/upload" className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white">
            Upload Resume
          </Link>
          <Link
            to="/jobs"
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Browse Jobs
          </Link>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { icon: Sparkles, label: 'Smart Parsing' },
            { icon: ShieldCheck, label: 'Secure Uploads' },
            { icon: Briefcase, label: 'Better Matches' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="glass p-4 rounded-lg flex items-center justify-center gap-2">
              <Icon className="w-8 h-8 text-indigo-600" />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="p-4 glass rounded-lg hover:shadow-md transition">
            <Upload className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="font-semibold">1. Upload Resume</h3>
            <p className="text-gray-600 dark:text-gray-300">PDF/DOCX supported with secure handling.</p>
          </div>
          <div className="p-4 glass rounded-lg hover:shadow-md transition">
            <Brain className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="font-semibold">2. AI Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">Extract skills, keywords, and highlights.</p>
          </div>
          <div className="p-4 glass rounded-lg hover:shadow-md transition">
            <Briefcase className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="font-semibold">3. Job Matches</h3>
            <p className="text-gray-600 dark:text-gray-300">See match scores and apply in one click.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">What users say</h2>
        <div className="grid md:grid-cols-3 gap-4 text-left">
          {[
            {
              name: 'Aarav',
              quote: 'Got a 92% match on my dream role. The tips were spot on!',
              img: 'https://images.pexels.com/photos/3775532/pexels-photo-3775532.jpeg?auto=compress&cs=tinysrgb&w=600',
            },
            {
              name: 'Neha',
              quote: 'The skills extraction saved me hours tailoring my resume.',
              img: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
            },
            {
              name: 'Rohit',
              quote: 'Applied to 3 roles with confidence after seeing similarity scores.',
              img: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
            },
          ].map(({ name, quote, img }) => (
            <div key={name} className="p-4 glass rounded-lg">
              <img src={img} alt={name} className="w-16 h-16 rounded-full mx-auto mb-4" />
              <p className="font-semibold text-gray-700">{name}</p>
              <p className="text-gray-500">{quote}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
