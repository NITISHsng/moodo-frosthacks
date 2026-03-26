import React from 'react';
import { motion } from 'motion/react';

const FeatureCard = ({ title, desc, icon: Icon }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="p-4 rounded-2xl bg-muted border border-border hover:border-primary/50 hover:bg-card hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-default"
  >
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
      </div>
      <div className="space-y-1">
        <h4 className="font-bold text-foreground text-sm">{title}</h4>
        <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
      </div>
    </div>
  </motion.div>
);

export default FeatureCard;
