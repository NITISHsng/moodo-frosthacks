import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';

interface PieData {
  name: string;
  value: number;
  color: string;
}

interface UserStatusPieChartProps {
  data: PieData[];
}

export default function UserStatusPieChart({ data }: UserStatusPieChartProps) {
  return (
    <div className="premium-card p-10 space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl">
          <PieIcon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-black tracking-tight text-slate-900 uppercase">User Sentiment</h3>
          <p className="text-xs text-slate-500 font-medium tracking-tight">Active session mood distribution</p>
        </div>
      </div>

      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border border-slate-100 shadow-xl rounded-xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        {payload[0].name}
                      </p>
                      <p className="text-sm font-black text-slate-900">
                        {payload[0].value} Users
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              content={({ payload }) => (
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  {payload?.map((entry: any, index: number) => (
                    <div key={`legend-${index}`} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{entry.value}</span>
                    </div>
                  ))}
                </div>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        {data.slice(0, 4).map((item, i) => (
          <div key={i} className="p-2 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{item.name}</p>
            <p className="text-sm font-black text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
