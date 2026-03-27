import React, { useState } from 'react';
import { Patient } from '../types';
import { getAnonymousId, cn } from '../lib/utils';
import { User, ShieldCheck, ExternalLink, MoreVertical, Search, Filter } from 'lucide-react';

interface UserTableProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
}

type MoodFilter = 'all' | 'low' | 'neutral' | 'good';

export default function UserTable({ patients, onSelectPatient }: UserTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [moodFilter, setMoodFilter] = useState<MoodFilter>('all');

  const filteredPatients = patients.filter(patient => {
    const anonId = getAnonymousId(patient.id);
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anonId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesMood = true;
    if (moodFilter === 'low') matchesMood = patient.currentScore <= 3;
    else if (moodFilter === 'neutral') matchesMood = patient.currentScore > 3 && patient.currentScore <= 7;
    else if (moodFilter === 'good') matchesMood = patient.currentScore > 7;

    return matchesSearch && matchesMood;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">All Active Users</h2>
          <p className="text-sm text-slate-500 font-medium">Complete registry of live monitoring sessions</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by Name or Anonymous ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 ml-2 hidden sm:block" />
          <select 
            value={moodFilter}
            onChange={(e) => setMoodFilter(e.target.value as MoodFilter)}
            className="w-full sm:w-40 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Moods</option>
            <option value="low">Low (1-3)</option>
            <option value="neutral">Neutral (4-7)</option>
            <option value="good">Good (8-10)</option>
          </select>
        </div>
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Anonymous ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Level</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Live Score</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Update</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => {
                  const anonId = getAnonymousId(patient.id);
                  return (
                    <tr 
                      key={patient.id} 
                      className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                      onClick={() => onSelectPatient(patient)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                            <User className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">{anonId}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border",
                          patient.riskLevel === 'High' ? "bg-red-50 text-red-600 border-red-100" :
                          patient.riskLevel === 'Medium' ? "bg-amber-50 text-amber-600 border-amber-100" :
                          "bg-emerald-50 text-emerald-600 border-emerald-100"
                        )}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            patient.riskLevel === 'High' ? "bg-red-500 animate-pulse" :
                            patient.riskLevel === 'Medium' ? "bg-amber-500" :
                            "bg-emerald-500"
                          )} />
                          <span className="text-xs font-bold text-slate-600">{patient.riskLevel}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={cn(
                          "text-lg font-black tracking-tighter",
                          patient.currentScore <= 3 ? "text-red-600" : 
                          patient.currentScore <= 7 ? "text-amber-600" : "text-emerald-600"
                        )}>
                          {patient.currentScore.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-slate-500">{patient.lastUpdate}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                            title="View Profile"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <Search className="w-8 h-8 opacity-20" />
                      <p className="text-sm font-bold">No users found matching your filters</p>
                      <button 
                        onClick={() => { setSearchQuery(''); setMoodFilter('all'); }}
                        className="text-xs text-orange-600 font-bold hover:underline mt-2"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Showing {filteredPatients.length} of {patients.length} active monitoring sessions
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-600 transition-colors">Previous</button>
            <button className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 rounded-lg">1</button>
            <button className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-600 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
