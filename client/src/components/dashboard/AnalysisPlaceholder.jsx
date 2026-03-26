import React from 'react';
import { motion } from 'motion/react';
import { Mic } from 'lucide-react';

const AnalysisPlaceholder = () => {
  return (
    <motion.div 
      key="placeholder"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[200px] border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-8 text-center space-y-4 bg-muted/50"
    >
      <div className="w-12 h-12 bg-card rounded-2xl flex items-center justify-center shadow-sm">
        <Mic className="text-muted-foreground/30 w-6 h-6" />
      </div>
      <p className="text-muted-foreground text-sm font-medium max-w-[200px] mx-auto">
        Start recording to see real-time emotional analysis
      </p>
    </motion.div>
  );
};

export default AnalysisPlaceholder;
