import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { AnalysisResult } from '../components';
import { DashboardHeader } from '../components';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(true);
  
  const result = location.state?.result;
  
  useEffect(() => {
    if (!result) {
      navigate('/dashboard');
      return;
    }
    
    // Simulate the deletion process that was originally in Dashboard
    const timer = setTimeout(() => {
      setIsDeleting(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [result, navigate]);

  if (!result) return null;

  return (
    <div className="relative w-full space-y-8 min-h-[80vh] flex flex-col">
      {/* Dynamic Background Textures & Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 rounded-3xl">
         <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
         <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '12s' }} />
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 dark:opacity-20" />
      </div>



      <div className="flex-1 flex flex-col items-center max-w-2xl mx-auto w-full z-10 pt-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="w-full"
        >
          <AnalysisResult result={result} isDeleting={isDeleting} />
        </motion.div>
      </div>
    </div>
  );
};

export default Result;
