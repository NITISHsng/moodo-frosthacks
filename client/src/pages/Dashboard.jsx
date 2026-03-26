import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { VoiceRecorder } from '../components';
import { AlertModal } from '../components';
import { DashboardHeader } from '../components';
import { TextEmotionInput } from '../components';

import { useMood, useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [emotionText, setEmotionText] = useState('');
  const [isTextProcessing, setIsTextProcessing] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [mobileMode, setMobileMode] = useState('speak'); // 'speak' or 'text'

  const { dashboard, getDashboard, analyzeMood } = useMood();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    getDashboard('7d');
  }, [getDashboard]);

  const moodHistory = dashboard?.entries || [];
  const trendPercentage = dashboard?.trend || 0;

  const handleVoiceResult = (result) => {

    // Refresh after a delay to get updated history
    setTimeout(() => getDashboard('7d'), 1500);
    
    // Evaluate proactive alerts
    if (result.moodScore < 5 || result.alert) {
      setTimeout(() => setShowAlert(true), 1500);
    }

    // Navigate to the new nested child route
    navigate('/dashboard/result', { state: { result } });
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!emotionText.trim()) return;

    setIsTextProcessing(true);
    
    try {
      const data = await analyzeMood({ pitch: 0, jitter: 0, speech_rate: 0 }, emotionText);
      
      handleVoiceResult({
        text: emotionText,
        sentiment: data?.normalizedScore || 0.5,
        features: { pitch: "N/A (Text)", energy: "N/A (Text)", rate: "N/A (Text)" },
        moodScore: data?.moodScore || 5.0,
        source: 'text'
      });
      setEmotionText('');
    } catch (err) {
      console.error("Text analysis error:", err);
    } finally {
      setIsTextProcessing(false);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
      {/* Dynamic Background Textures & Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 rounded-3xl">
         <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
         <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '12s' }} />
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 dark:opacity-20" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }}
        className="z-10 flex-shrink-0 space-y-3"
      >
        <DashboardHeader streak={dashboard?.streak || 0} date={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} />
        
        {/* Mobile Mode Selector */}
        <div className="lg:hidden flex items-center justify-center">
          <div className="inline-flex items-center gap-1 bg-gradient-to-r from-card to-card/80 p-1 rounded-2xl border border-border/60 shadow-lg backdrop-blur-sm">
            <button
              onClick={() => setMobileMode('speak')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                mobileMode === 'speak' 
                  ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md shadow-primary/20 scale-105' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              🎤 Speak
            </button>
            <button
              onClick={() => setMobileMode('text')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                mobileMode === 'text' 
                  ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md shadow-primary/20 scale-105' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              ✍️ Text
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="w-full z-10 flex-1 overflow-hidden flex flex-col"
      >
        {/* Desktop: Side by side */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6 flex-1">
          <div className={`h-full ${isTextProcessing || emotionText.trim() ? 'opacity-50 pointer-events-none' : ''}`}>
            <VoiceRecorder 
              onResult={handleVoiceResult}
              onRecordingChange={setIsVoiceActive}
            />
          </div>

          <div className={`h-full ${isVoiceActive ? 'opacity-50 pointer-events-none' : ''}`}>
            <TextEmotionInput 
              value={emotionText}
              onChange={(e) => setEmotionText(e.target.value)}
              onSubmit={handleTextSubmit}
              isProcessing={isTextProcessing}
            />
          </div>
        </div>

        {/* Mobile: Toggle between modes */}
        <div className="lg:hidden flex-1">
          {mobileMode === 'speak' ? (
            <VoiceRecorder 
              onResult={handleVoiceResult}
              onRecordingChange={setIsVoiceActive}
            />
          ) : (
            <TextEmotionInput 
              value={emotionText}
              onChange={(e) => setEmotionText(e.target.value)}
              onSubmit={handleTextSubmit}
              isProcessing={isTextProcessing}
            />
          )}
        </div>

        {/* Privacy Notice */}
        <div className="flex items-center justify-center gap-2 px-4 py-2 mt-3 bg-muted/50 rounded-full text-[9px] md:text-[10px] font-medium text-muted-foreground uppercase tracking-tight w-fit mx-auto backdrop-blur-sm">
          <ShieldCheck className="w-3 h-3 text-green-500" />
          <span>Your words stay private • Only vibes are saved</span>
        </div>
      </motion.div>

      <AlertModal isOpen={showAlert} onClose={() => setShowAlert(false)} />
    </div>
  );
};

export default Dashboard;
