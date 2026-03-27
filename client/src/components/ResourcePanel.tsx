import React from 'react';
import { Library, ArrowUpRight, BookOpen, PlayCircle, Heart, Wind, Brain, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface ResourcePanelProps {
  fullWidth?: boolean;
}

export default function ResourcePanel({ fullWidth }: ResourcePanelProps) {
  const resources = [
    { 
      id: '1', 
      title: 'Managing Anxiety in Daily Life', 
      category: 'Anxiety', 
      type: 'Article', 
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    { 
      id: '2', 
      title: '10-Minute Morning Meditation', 
      category: 'Stress', 
      type: 'Audio', 
      icon: Wind,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    { 
      id: '3', 
      title: 'Cognitive Reframing Techniques', 
      category: 'Depression', 
      type: 'Video', 
      icon: PlayCircle,
      color: 'bg-orange-50 text-orange-600 border-orange-100'
    },
    { 
      id: '4', 
      title: 'Building Emotional Resilience', 
      category: 'Self-Care', 
      type: 'Article', 
      icon: Heart,
      color: 'bg-rose-50 text-rose-600 border-rose-100'
    }
  ];

  return (
    <section className={cn("bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden", fullWidth ? "w-full" : "")}>
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Library className="w-5 h-5 text-orange-600" />
          <h2 className="text-lg font-bold text-slate-900">Resource Recommendations</h2>
        </div>
        <div className="flex items-center gap-2 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-wider border border-emerald-100">
          <ShieldCheck className="w-3 h-3" />
          Privacy Safe
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2 p-3 bg-orange-50/50 rounded-2xl border border-orange-100 mb-4">
          <Brain className="w-4 h-4 text-orange-600" />
          <p className="text-xs font-medium text-orange-900 leading-relaxed">
            AI suggests sharing these resources based on current live patient trends.
          </p>
        </div>

        <div className={cn("grid gap-3", fullWidth ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1")}>
          {resources.map((resource) => (
            <div 
              key={resource.id}
              className="group p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-orange-200 hover:bg-white hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cn("p-2 rounded-xl border", resource.color)}>
                  <resource.icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-orange-600 transition-all" />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{resource.type}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">{resource.category}</span>
                </div>
                <h4 className="font-bold text-slate-800 group-hover:text-orange-600 transition-colors leading-snug">
                  {resource.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] text-slate-500 leading-relaxed">
            <span className="font-bold uppercase tracking-wider">Privacy Note:</span> Resource usage is tracked locally and anonymously. No patient-identifiable data is stored or shared.
          </p>
        </div>
      </div>
    </section>
  );
}
