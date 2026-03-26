import React from 'react';
import { TrendingDown, ArrowRight, AlertCircle, Zap } from 'lucide-react';
import { MoodChart } from '..';
import { useNavigate } from 'react-router-dom';

const TrendCard = ({ data, trendPercentage }) => {
  const navigate = useNavigate();
  const handleViewFull = () => {
    navigate('/dashboard/trends');
  };

  return (
    <div className="bg-card rounded-3xl p-8 shadow-sm border border-border space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-display text-foreground">Mood Trends</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-destructive/10 text-destructive rounded-full text-xs font-bold">
            <TrendingDown className="w-3 h-3" />
            {trendPercentage}% this week
          </div>
          <button 
            onClick={handleViewFull}
            className="text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
          >
            View Full <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
      
      <div className="h-[300px]">
        <MoodChart data={data} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-4">
          <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center shadow-sm">
            <AlertCircle className="text-primary w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-foreground text-sm">Trend Alert</p>
            <p className="text-xs text-muted-foreground mt-1">
              We've noticed a downward trend over the last 5 days. Consider a check-in.
            </p>
          </div>
        </div>
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-4">
          <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center shadow-sm">
            <Zap className="text-primary w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-foreground text-sm">Evening Insight</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your mood typically dips in the evenings. Try some light meditation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendCard;
