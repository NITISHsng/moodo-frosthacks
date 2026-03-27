import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple verification for demonstration
    // In a real app, this would be an API call
    if (email === 'admin@moodo.app' && password === 'admin123') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      onLoginSuccess();
      navigate('/admin');
    } else {
      setError('Invalid admin credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 lg:p-10 border border-slate-100"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
            <LogIn className="text-white w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black font-display text-slate-900 uppercase tracking-tight">Admin Gateway</h2>
          <p className="text-slate-500 mt-2 text-sm font-medium">Verify your credentials to access the command center</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold text-center"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-xs">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@moodo.app"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all outline-none text-sm text-slate-900 font-bold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-xs">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all outline-none text-sm text-slate-900 font-bold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-2 group text-sm uppercase tracking-widest mt-6"
          >
            Authenticate
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </motion.div>
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <button 
                onClick={() => navigate('/dashboard')}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center gap-2 mx-auto"
            >
                <ArrowLeft className="w-3 h-3" />
                Return to Dashboard
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
