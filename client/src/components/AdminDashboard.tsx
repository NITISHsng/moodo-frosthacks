/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Bell, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  LogOut,
  Settings,
  User as UserIcon,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { mockPatients as initialPatients, mockRegistrationData } from '../mockData';
import { Patient, RiskLevel, PatientStatus } from '../types';

// Components

import LivePatientProfile from './LivePatientProfile';
import QuickStats from './QuickStats';
import UserTable from './UserTable';
import UserRegistrationGraph from './UserRegistrationGraph';
import UserStatusPieChart from './UserStatusPieChart';

interface AdminDashboardProps {
  onLogout?: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);

  // Simulation: Real-time mood updates DISABLED as requested
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prev => prev.map(p => {
        const fluctuation = (Math.random() - 0.5) * 0.8;
        const newScore = Math.max(1, Math.min(10, p.currentScore + fluctuation));
        
        // Determine status based on score
        let status: PatientStatus = 'Stable';
        let risk: RiskLevel = 'Low';
        if (newScore <= 3) {
          status = 'High Risk';
          risk = 'High';
        } else if (newScore <= 6) {
          status = 'Needs Attention';
          risk = 'Medium';
        }

        const newHistory = [...p.liveHistory, { time: format(new Date(), 'HH:mm:ss'), score: newScore }].slice(-20);

        return {
          ...p,
          currentScore: newScore,
          status,
          riskLevel: risk,
          lastUpdate: format(new Date(), 'HH:mm:ss'),
          liveHistory: newHistory
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  */

  const navItems = [
    { id: 'dashboard', label: 'Live Dashboard', icon: LayoutDashboard },
    { id: 'all-users', label: 'All Users', icon: Users },

  ];

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || null;
  const highRiskPatients = [...patients].filter(p => p.riskLevel === 'High').sort((a, b) => a.currentScore - b.currentScore);

  // Quick Stats Calculations
  const totalUsers = patients.length;
  const activeUsers = patients.length; 
  const averageMood = patients.reduce((acc, p) => acc + p.currentScore, 0) / patients.length;
  const usersAtRiskTrend = patients.filter(p => {
    if (p.liveHistory.length < 2) return false;
    const first = p.liveHistory[0].score;
    const last = p.liveHistory[p.liveHistory.length - 1].score;
    return last < first;
  }).length;

  const lowMoodCount = patients.filter(p => p.currentScore <= 3).length;
  const goodMoodCount = patients.filter(p => p.currentScore >= 7).length;
  const riskyMoodCount = patients.filter(p => p.riskLevel === 'High').length;

  const pieData = [
    { name: 'Active', value: activeUsers, color: '#f97316' }, // orange-500
    { name: 'Good Mood', value: goodMoodCount, color: '#10b981' }, // emerald-500
    { name: 'Low Mood', value: lowMoodCount, color: '#f59e0b' }, // amber-500
    { name: 'Risky', value: riskyMoodCount, color: '#ef4444' } // red-500
  ];

  const renderContent = () => {
    if (selectedPatient) {
      return <LivePatientProfile patient={selectedPatient} onBack={() => setSelectedPatientId(null)} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <QuickStats 
              totalUsers={totalUsers}
              activeUsers={activeUsers}
              averageMood={averageMood}
              usersAtRisk={usersAtRiskTrend}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <UserRegistrationGraph data={mockRegistrationData} />
              </div>
              <div className="lg:col-span-1">
                <UserStatusPieChart data={pieData} />
              </div>
            </div>
          </div>
        );
      case 'all-users':
        return <UserTable patients={patients} onSelectPatient={(p) => setSelectedPatientId(p.id)} />;

      default:
        return <div className="flex items-center justify-center h-64 text-slate-400 italic">Feature coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-orange-100">
      {/* Sidebar - Desktop */}
      <aside 
        className={cn(
          "fixed left-0 top-0 h-full bg-white border-r border-slate-200 z-40 transition-all duration-300 ease-in-out hidden md:flex flex-col",
          isSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="p-6 flex items-center justify-end">
          {!isSidebarCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex items-center gap-2.5"
            >
          <img 
          src="/logo1.png" 
          alt="Logo"
          className="w-30"
        />
            </motion.div>
            
          )}

          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-full flex items-center justify-center py-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSelectedPatientId(null);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
                activeTab === item.id 
                  ? "bg-orange-50 text-orange-600 shadow-sm border border-orange-100/50" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-orange-600" : "text-slate-400 group-hover:text-slate-600")} />
              {!isSidebarCollapsed && <span className="font-bold text-sm tracking-tight">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 transition-all font-bold text-sm">
            <Settings className="w-5 h-5" />
            {!isSidebarCollapsed && <span>Settings</span>}
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm"
          >
            <LogOut className="w-5 h-5" />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed left-0 top-0 h-full w-64 bg-white z-50 md:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 flex items-center gap-2 border-bottom border-slate-100">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">M</div>
                <span className="text-xl font-bold tracking-tight text-orange-600">Moodo</span>
              </div>
              <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSelectedPatientId(null);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all",
                      activeTab === item.id 
                        ? "bg-orange-50 text-orange-600" 
                        : "text-slate-500 hover:bg-slate-50"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main 
        className={cn(
          "transition-all duration-300 ease-in-out min-h-screen flex flex-col",
          isSidebarCollapsed ? "md:pl-20" : "md:pl-64"
        )}
      >
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between z-30 shadow-sm shadow-slate-100/50">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all border border-transparent hover:border-slate-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none mb-1">Mahabrata</p>
                <p className="micro-label text-slate-400 lowercase italic">Clinical Psychologist</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 border-2 border-white shadow-md">
                <UserIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="flex-1 p-4 md:p-8 max-w-[1600px] mx-auto w-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
