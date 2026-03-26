import { useState } from 'react';
import { motion } from 'motion/react';
import { Mic } from 'lucide-react';
import { AuthModal } from '../components';

const Auth = ({ onLogin }) => {
  const [showAuthModal, setShowAuthModal] = useState(true);

  const handleCloseModal = () => {
    setShowAuthModal(true); // Keep it open on Auth page
  };

  const handleAuthSuccess = () => {
    onLogin();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-8 flex items-center gap-2"
      >
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Mic className="text-primary-foreground w-5 h-5" />
        </div>
        <span className="text-xl font-bold font-display tracking-tight text-foreground">MOODO</span>
      </motion.div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleCloseModal}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Auth;
