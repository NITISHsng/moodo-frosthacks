import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mic, TrendingUp } from 'lucide-react';

const HeroSection = ({ onGetStarted }) => {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 py-12 lg:py-0">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="lg:w-1/2 space-y-8 text-left"
      >
        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl lg:text-7xl font-bold font-display leading-[1.1] text-foreground"
          >
            Your Emotions, <br />
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-primary inline-block"
            >
              Visualized.
            </motion.span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-lg"
          >
            Experience the future of mental wellbeing monitoring. Simple, secure, and powered by advanced vocal AI.
          </motion.p>
        </div>
        
        <div className="pt-4 lg:mb-12">
          <motion.button 
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGetStarted}
            className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-xl shadow-primary/10 hover:bg-primary/90 transition-all flex items-center gap-3 text-lg group"
          >
            Get Started
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        className="lg:w-1/2 flex justify-center lg:justify-end relative mt-12 lg:mt-0"
      >
        <div className="relative w-full max-w-[500px] flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10" />
          
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20"
          >
            <img 
              src="https://img.freepik.com/premium-vector/mental-health-tracker-character-using-electronic-gadget-monitor-control-stress-level-mood_277904-34047.jpg" 
              alt="Mental health monitoring illustration"
              className="w-auto h-full max-h-[300px] drop-shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div 
            animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 w-16 h-16 bg-card rounded-2xl shadow-2xl flex items-center justify-center z-30 border border-border"
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Mic className="text-primary-foreground w-5 h-5" />
            </div>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 -left-8 bg-card/95 backdrop-blur-md px-6 py-4 rounded-3xl shadow-2xl border border-border flex items-center gap-4 z-30"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Mood Score</p>
              <p className="text-base font-bold text-foreground">+12% Improvement</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
};

export default HeroSection;
