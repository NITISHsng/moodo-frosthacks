import React from 'react';
import { motion } from 'motion/react';
import { 
  Mic, Activity, Brain, FileText, Zap, Cpu, WifiOff, BarChart3, 
  MessageSquare, Sparkles, LineChart, Search, UserCheck, History, 
  Shield, Bell, LayoutDashboard, Lock, ShieldCheck, HeartPulse, CheckCircle2 
} from 'lucide-react';
import { FeatureCard } from '..';

const FeaturesSection = () => {
  const featureGroups = [
    {
      title: "Voice & Processing",
      icon: Mic,
      features: [
        { title: "Real-Time Voice Feedback", desc: "Instant analysis as you speak.", icon: Activity },
        { title: "AI Voice Feature Extraction", desc: "Advanced acoustic pattern recognition.", icon: Brain },
        { title: "Lightweight & Real-Time Processing", desc: "Fast, efficient emotional detection.", icon: Cpu },
        { title: "Offline-Capable Analysis", desc: "Works even without internet.", icon: WifiOff },
      ]
    },
    {
      title: "Analytics & Insights",
      icon: BarChart3,
      features: [
        { title: "Mood Score Generation", desc: "Daily emotional health metrics.", icon: Sparkles },
        { title: "Time-Series Mood Tracking", desc: "Visualize changes over time.", icon: LineChart },
        { title: "Smart Insights & Patterns", desc: "AI-driven emotional discovery.", icon: Brain },
        { title: "Emotion History Timeline", desc: "Complete log of your journey.", icon: History },
      ]
    },
    {
      title: "Platform & Care",
      icon: Shield,
      features: [
        { title: "Proactive Alert System", desc: "Early warnings for emotional shifts.", icon: Bell },
        { title: "Interactive Dashboard", desc: "All your insights in one place.", icon: LayoutDashboard },
        { title: "Secure User Authentication", desc: "Enterprise-grade protection.", icon: Lock },
        { title: "Privacy-First Architecture", desc: "Your data stays yours, always.", icon: ShieldCheck },
      ]
    }
  ];

  return (
    <section className="relative z-10 py-24 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-20"
        >
          <h2 className="text-4xl font-bold text-foreground font-display">Powerful Features for Your Wellbeing</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover how MOODO combines advanced AI with intuitive design to help you understand your emotional health like never before.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureGroups.map((group, groupIndex) => (
            <motion.div 
              key={groupIndex}
              initial={{ opacity: 0, x: groupIndex === 0 ? -20 : groupIndex === 2 ? 20 : 0, y: groupIndex === 1 ? 20 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-xl font-bold text-primary flex items-center gap-2 px-4">
                <group.icon className="w-5 h-5" /> {group.title}
              </h3>
              <div className="space-y-4">
                {group.features.map((f, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <FeatureCard {...f} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
