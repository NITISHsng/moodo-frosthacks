import React from 'react';
import { motion } from 'motion/react';
import { Zap, Mic, MessageSquare, BarChart3, ArrowRight, ShieldCheck, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const AnalysisResult = ({ result, isDeleting }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-3xl p-6 shadow-sm border border-border space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          {result.source === 'text' ? 'Text Sentiment Analysis' : 
           result.source === 'upload' ? 'Uploaded Audio Analysis' : 
           'Real-time Voice Analysis'}
        </h3>
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Processed in 1.2s</span>
      </div>

      {/* Pipeline Visual */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/50 rounded-2xl border border-border">
        {result.source !== 'text' && (
          <>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mic className="w-4 h-4 text-primary" />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground">{result.source === 'upload' ? 'FILE' : 'VOICE'}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground/30" />
          </>
        )}
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-primary" />
          </div>
          <span className="text-[10px] font-bold text-muted-foreground">TEXT</span>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground/30" />
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-primary" />
          </div>
          <span className="text-[10px] font-bold text-muted-foreground">SCORE</span>
        </div>
      </div>

      {/* Insight Section */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          {result.source === 'text' ? 'Input Text' : 'Insight'}
        </p>
        <p className="text-sm text-foreground italic leading-relaxed bg-muted p-4 rounded-2xl border border-border">
          "{result.text}"
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 bg-muted rounded-2xl text-center">
          <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Pitch</p>
          <p className="font-bold text-foreground">{result.features.pitch}</p>
        </div>
        <div className="p-3 bg-muted rounded-2xl text-center">
          <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Energy</p>
          <p className="font-bold text-foreground">{result.features.energy}</p>
        </div>
        <div className="p-3 bg-muted rounded-2xl text-center">
          <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Rate</p>
          <p className="font-bold text-foreground">{result.features.rate}</p>
        </div>
      </div>

      {/* Privacy Deletion Demo */}
      <div className="p-4 bg-card rounded-2xl border border-border overflow-hidden relative shadow-sm">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Privacy Protocol</p>
              <p className="text-[10px] text-muted-foreground">Audio Deletion Logic Active</p>
            </div>
          </div>
          {isDeleting ? (
            <div className="flex items-center gap-2 text-destructive text-[10px] font-bold animate-pulse">
              <Trash2 className="w-3 h-3" />
              DELETING RAW AUDIO...
            </div>
          ) : (
            <div className="flex items-center gap-2 text-primary text-[10px] font-bold">
              <ShieldCheck className="w-3 h-3" />
              AUDIO PURGED
            </div>
          )}
        </div>
        {isDeleting && (
          <motion.div 
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            className="absolute bottom-0 left-0 h-1 bg-primary"
          />
        )}
      </div>

      {/* Sentiment & Mood Score */}
      <div className="flex items-center gap-4">
        <div className="flex-1 p-4 bg-primary/10 rounded-2xl border border-primary/20">
          <p className="text-[10px] font-bold text-primary/60 uppercase mb-1">Sentiment (VADER)</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-primary text-xl">{result.sentiment > 0 ? '+' : ''}{result.sentiment}</span>
            <span className={cn(
              "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
              result.sentiment > 0 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
            )}>
              {result.sentiment > 0 ? 'Positive' : 'Negative'}
            </span>
          </div>
        </div>
        <div className="flex-1 p-4 bg-primary/10 rounded-2xl border border-primary/20">
          <p className="text-[10px] font-bold text-primary/60 uppercase mb-1">Mood Score</p>
          <div className="flex items-end gap-2 text-primary">
            <span className="text-3xl font-bold font-display">{result.moodScore}</span>
            <span className="opacity-60 text-sm mb-1">/ 10</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisResult;
