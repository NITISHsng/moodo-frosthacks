import React from 'react';

const StatCard = ({ label, value, icon: Icon, color, bg }) => {
  return (
    <div className="bg-card p-6 rounded-3xl border border-border shadow-sm space-y-4">
      <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center`}>
        <Icon className={`${color} w-6 h-6`} />
      </div>
      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          {label}
        </p>
        <p className="text-3xl font-bold font-display text-foreground mt-1">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
