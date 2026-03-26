import React from 'react';
import { motion } from 'motion/react';
import { Mic, Brain, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';

const HowItWorksSection = () => {
  const steps = [
    { 
      step: "01", 
      title: "Speak Naturally", 
      desc: "Record a short voice note about your day. No scripts, just you.",
      icon: Mic,
      color: "bg-primary/10 text-primary"
    },
    { 
      step: "02", 
      title: "AI Analysis", 
      desc: "Our advanced vocal AI extracts emotional features and sentiment in real-time.",
      icon: Brain,
      color: "bg-emerald-50 text-emerald-600"
    },
    { 
      step: "03", 
      title: "Get Insights", 
      desc: "View your mood score, trends, and personalized suggestions immediately.",
      icon: TrendingUp,
      color: "bg-amber-50 text-amber-600"
    }
  ];

  return (
    <section className="relative z-10 py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-20"
        >
          <h2 className="text-4xl font-bold text-foreground font-display">How MOODO Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to better emotional awareness.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group"
            >
              <div className="space-y-6 text-center">
                <div className={cn("w-20 h-20 mx-auto rounded-3xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3 duration-500 shadow-lg shadow-transparent group-hover:shadow-current/10", s.color)}>
                  <s.icon className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-bold tracking-widest uppercase opacity-30">{s.step}</span>
                  <h3 className="text-2xl font-bold text-foreground">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
              {i < 2 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+60px)] w-[calc(100%-120px)] h-[2px] bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
