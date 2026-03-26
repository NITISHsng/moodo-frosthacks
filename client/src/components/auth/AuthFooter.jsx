import React from 'react';
import { motion } from 'motion/react';
import { Mic } from 'lucide-react';

const AuthFooter = () => {
  return (
    <footer className="relative z-10 py-12 bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Mic className="text-primary-foreground w-5 h-5" />
          </div>
          <span className="text-xl font-bold font-display tracking-tight text-foreground">MOODO</span>
        </div>
        
        <div className="flex items-center gap-8 text-sm text-muted-foreground font-medium">
          <motion.button whileHover={{ scale: 1.1, color: "var(--primary)" }} className="transition-colors">
            Privacy Policy
          </motion.button>
          <motion.button whileHover={{ scale: 1.1, color: "var(--primary)" }} className="transition-colors">
            Terms of Service
          </motion.button>
          <motion.button whileHover={{ scale: 1.1, color: "var(--primary)" }} className="transition-colors">
            Contact Support
          </motion.button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          © 2026 MOODO AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default AuthFooter;
