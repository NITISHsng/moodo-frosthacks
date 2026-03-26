import React from 'react';
import { motion } from 'motion/react';

const PartnerLogos = () => {
  const logos = ['HealthLine', 'Mindful', 'Wellness', 'Psychology', 'NeuroTech'];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative z-10 py-12 bg-card overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-center text-muted-foreground text-sm font-bold uppercase tracking-widest mb-10">
          Trusted by leading mental health organizations
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {logos.map((logo, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1, opacity: 1, y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-2xl font-bold font-display text-muted-foreground tracking-tighter cursor-default"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PartnerLogos;
