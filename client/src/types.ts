export type RiskLevel = 'Low' | 'Medium' | 'High';
export type PatientStatus = 'Stable' | 'Needs Attention' | 'High Risk';

export interface Patient {
  id: string;
  name: string;
  age: number;
  currentScore: number; // 1-10
  status: PatientStatus;
  riskLevel: RiskLevel;
  lastUpdate: string;
  // Short-term fluctuation for live graph (e.g., last 10-20 seconds/points)
  liveHistory: { time: string; score: number }[];
  avatar?: string;
}
