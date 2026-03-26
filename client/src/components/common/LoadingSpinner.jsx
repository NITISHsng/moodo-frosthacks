import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
