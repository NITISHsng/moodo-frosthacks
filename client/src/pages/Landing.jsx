import { useState } from 'react';
import {
  AuthNavbar,
  AuthFooter,
  AuthModal,
  HeroSection,
  PartnerLogos,
  StatsSection,
  WhyMoodoSection,
  HowItWorksSection,
  FeaturesSection
} from '../components';

const Landing = ({ onLogin }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleOpenModal = () => {
    setShowAuthModal(true);
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
  };

  const handleAuthSuccess = () => {
    onLogin();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <AuthNavbar onLoginClick={handleOpenModal} />
      
      <HeroSection onGetStarted={handleOpenModal} />
      
      <PartnerLogos />
      
      {/* <StatsSection /> */}
      
      <div id="why-moodo" className="scroll-mt-20">
        <WhyMoodoSection />
      </div>
      
      <div id="how-it-works" className="scroll-mt-20">
        <HowItWorksSection />
      </div>
      
      <div id="features" className="scroll-mt-20">
        <FeaturesSection />
      </div>
      
      <AuthFooter />

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleCloseModal}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Landing;
