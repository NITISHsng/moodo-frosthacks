import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const HeroSection = ({ onGetStarted }) => {
  return (
    <main className="mt-8 flex-1 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row justify-between gap-12 relative z-10 py-12 lg:py-0">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="lg:w-1/2 space-y-8 text-center flex flex-col justify-center items-center"
      >
        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl lg:text-7xl leading-[1.1] text-foreground text-center"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            Track Your Mood,<br />
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-primary inline-block"
            >
              Understand Yourself.
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
            Start Mood Tracking
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        className="lg:w-1/2 relative"
      >
        <div className="relative w-full max-w-[500px] flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 w-[140%] h-[140%] bg-primary/5 rounded-full blur-[100px] -z-10" />
          
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20"
          >
            <img 
              src="/hero-right.svg" 
              alt="Mental health monitoring illustration"
              className="w-auto h-full max-h-[400px] drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
};

export default HeroSection;
