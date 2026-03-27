import React from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const AuthNavbar = ({ onLoginClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Why MOODO', href: '#why-moodo' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="w-full px-6 lg:px-12 py-6 flex justify-between items-center bg-transparent relative z-50">
      <motion.div 
        className="flex items-center gap-2"
      >
        <img 
          src="/logo1.png" 
          alt="Logo"
          className="w-40"
        />
      </motion.div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => scrollToSection(item.href)}
            className="text-foreground/80 hover:text-foreground font-medium transition-colors"
          >
            {item.label}
          </button>
        ))}
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLoginClick}
          className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all text-sm shadow-lg shadow-primary/10"
        >
          Login
        </motion.button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLoginClick}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all text-sm shadow-lg shadow-primary/10"
        >
          Login
        </motion.button>
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-foreground hover:text-primary transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border shadow-lg md:hidden"
        >
          <div className="flex flex-col p-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-left text-foreground/80 hover:text-foreground font-medium transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default AuthNavbar;
