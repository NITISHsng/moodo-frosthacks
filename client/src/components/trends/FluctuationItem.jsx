import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const FluctuationItem = ({ day, change, trend, time }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-muted rounded-2xl border border-border">
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm",
          trend === 'up' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        )}>
          {trend === 'up' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
        </div>
        <div>
          <p className="font-bold text-foreground">{day}</p>
          <p className="text-[10px] text-muted-foreground uppercase font-bold">{time}</p>
        </div>
      </div>
      <div className={cn(
        "font-bold text-lg",
        trend === 'up' ? "text-green-600" : "text-red-600"
      )}>
        {change}
      </div>
    </div>
  );
};

export default FluctuationItem;
