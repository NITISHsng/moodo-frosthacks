import React from 'react';
import { Shield, Eye } from 'lucide-react';

const PrivacyBanner = () => {
  return (
    <div className="bg-card rounded-3xl p-8 border border-border shadow-sm relative overflow-hidden">
      <div className="relative z-10 space-y-4">
        <h4 className="text-xl font-bold font-display text-foreground">Privacy Guarantee</h4>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
          Your voice is processed in real-time. We extract emotional features and convert speech to text, 
          but we never store the raw audio files. Your data is encrypted and only used to help you monitor your wellbeing.
        </p>
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <Shield className="w-4 h-4 text-primary" />
            GDPR Compliant
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <Eye className="w-4 h-4 text-primary" />
            Zero-Knowledge
          </div>
        </div>
      </div>
      <div className="absolute -right-8 -bottom-8 opacity-5 text-primary">
        <Shield className="w-64 h-64" />
      </div>
    </div>
  );
};

export default PrivacyBanner;
