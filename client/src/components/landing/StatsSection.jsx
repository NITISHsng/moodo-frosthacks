import React from 'react';
import { motion } from 'motion/react';

const StatsSection = () => {
  const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Voice Notes Analyzed", value: "2M+" },
    { label: "Mood Accuracy", value: "98.5%" },
    { label: "Privacy Rating", value: "A+" }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative z-10 py-16 bg-background border-y border-border"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-2 cursor-default"
            >
              <p className="text-4xl font-bold text-primary font-display">{s.value}</p>
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsSection;
