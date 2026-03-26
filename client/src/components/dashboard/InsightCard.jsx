import React from 'react';

const InsightCard = ({ title, description, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-primary/5 border-primary/10 text-primary',
    success: 'bg-emerald-500/5 border-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  };

  return (
    <div className={`p-4 rounded-2xl border ${variants[variant]}`}>
      <p className={`font-bold mb-1 ${variants[variant].split(' ').pop()}`}>
        {title}
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default InsightCard;
