import React, { useState } from 'react';
import { Search, Filter, MoreVertical, User as UserIcon, Zap, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'motion/react';
import { Patient, PatientStatus } from '../types';
import { cn } from '../lib/utils';

interface PatientLiveStatusProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  fullWidth?: boolean;
}

export default function PatientLiveStatus({ patients, onSelectPatient, fullWidth }: PatientLiveStatusProps) {
  const [filter, setFilter] = useState<PatientStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(p => {
    const matchesFilter = filter === 'All' || p.status === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusColors: Record<PatientStatus, string> = {
    'Stable': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'Needs Attention': 'bg-amber-50 text-amber-600 border-amber-100',
    'High Risk': 'bg-red-50 text-red-600 border-red-100',
  };

  const getTrendIcon = (history: { score: number }[]) => {
    if (history.length < 2) return <Minus className="w-4 h-4 text-slate-300" />;
    const last = history[history.length - 1].score;
    const prev = history[history.length - 2].score;
    if (last > prev + 0.1) return <TrendingUp className="w-4 h-4 text-emerald-500" />;
    if (last < prev - 0.1) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-slate-300" />;
  };

  return (
    <section className={cn("bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden", fullWidth ? "w-full" : "")}>
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Patient Live Status</h2>
          <p className="text-sm text-slate-500">Real-time monitoring of all active patients</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
            {(['All', 'Stable', 'Needs Attention', 'High Risk'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
                  filter === s ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Live Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Current Score</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Trend</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Last Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredPatients.map((patient) => (
              <motion.tr 
                key={patient.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                onClick={() => onSelectPatient(patient)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={patient.avatar} 
                      alt={patient.name} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{patient.name}</p>
                      <p className="text-xs text-slate-500">{patient.age} years old</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[11px] font-bold border",
                    statusColors[patient.status]
                  )}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className={cn(
                    "inline-flex items-center justify-center w-10 h-10 rounded-xl font-black text-lg",
                    patient.currentScore <= 3 ? "bg-red-100 text-red-600" : 
                    patient.currentScore <= 6 ? "bg-amber-100 text-amber-600" : 
                    "bg-emerald-100 text-emerald-600"
                  )}>
                    {patient.currentScore.toFixed(1)}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center">
                    {getTrendIcon(patient.liveHistory)}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 text-slate-500 text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    {patient.lastUpdate}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredPatients.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-slate-400 italic">No patients found matching your criteria.</p>
        </div>
      )}
    </section>
  );
}
