import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const JobTrack = () => {
  const [jobs, setJobs] = useState(() => JSON.parse(localStorage.getItem('jobs')) || []);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Applied');

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = () => {
    if (!company || !position) return;
    const newJob = {
      id: Date.now(),
      company,
      position,
      status,
      date: new Date().toLocaleDateString(),
    };
    setJobs([newJob, ...jobs]);
    setCompany('');
    setPosition('');
    setStatus('Applied');
  };

  const updateStatus = (id, newStatus) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, status: newStatus } : job));
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 to-purple-200 animate-background bg-fixed">
      <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl font-bold text-center mb-8 text-gray-800">
        🎯 JobTrack - Application Tracker
      </motion.h1>

      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <input className="px-4 py-2 rounded shadow border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 transition-all" placeholder="Company Name" value={company} onChange={e => setCompany(e.target.value)} />
        <input className="px-4 py-2 rounded shadow border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 transition-all" placeholder="Position" value={position} onChange={e => setPosition(e.target.value)} />
        <select value={status} onChange={e => setStatus(e.target.value)} className="px-4 py-2 rounded shadow border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 transition-all">
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </motion.div>

      <motion.button onClick={addJob} whileTap={{ scale: 0.95 }} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md transition w-full md:w-auto mb-6">
        ➕ Add Job
      </motion.button>

      <div className="grid gap-6">
        {jobs.length === 0 && <p className="text-center text-gray-500">No job applications added yet.</p>}
        {jobs.map(job => (
          <motion.div key={job.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{job.company}</h2>
                <p className="text-gray-600">{job.position}</p>
                <p className="text-sm text-gray-400">{job.date}</p>
              </div>
              <div>
                <select
                  value={job.status}
                  onChange={e => updateStatus(job.id, e.target.value)}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 transition"
                >
                  <option>Applied</option>
                  <option>Interviewing</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div className="text-right">
                <button onClick={() => deleteJob(job.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                  🗑️ Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JobTrack;
