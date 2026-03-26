import React from 'react';
import { ChevronRight } from 'lucide-react';

const SettingsItem = ({ icon: Icon, title, description, iconBg, iconColor, onClick }) => {
  return (
    <div 
      className="p-6 flex items-center justify-between hover:bg-muted transition-colors cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`${iconColor} w-5 h-5`} />
        </div>
        <div>
          <p className="font-bold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" />
    </div>
  );
};

export default SettingsItem;
