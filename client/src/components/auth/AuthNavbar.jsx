import React from 'react';
import { motion } from 'motion/react';
import { Mic } from 'lucide-react';

const AuthNavbar = ({ onLoginClick }) => {
  return (
    <nav className="w-full px-6 lg:px-12 py-6 flex justify-between items-center bg-transparent relative z-50">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Mic className="text-primary-foreground w-5 h-5" />
        </div>
        <span className="text-xl font-bold font-display tracking-tight text-foreground">MOODO</span>
      </motion.div>
      
      <motion.button 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLoginClick}
        className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all text-sm shadow-lg shadow-primary/10"
      >
        Login
      </motion.button>
    </nav>
  );
};

export default AuthNavbar;
