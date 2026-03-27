import { Patient } from './types';
import { format } from 'date-fns';

const generateInitialHistory = (score: number) => {
  return Array.from({ length: 10 }).map((_, i) => ({
    time: format(new Date(Date.now() - (10 - i) * 2000), 'HH:mm:ss'),
    score: Math.max(1, Math.min(10, score + (Math.random() - 0.5) * 2))
  }));
};

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    age: 28,
    currentScore: 2.4,
    status: 'High Risk',
    riskLevel: 'High',
    lastUpdate: format(new Date(), 'HH:mm:ss'),
    liveHistory: generateInitialHistory(2.4),
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 34,
    currentScore: 5.1,
    status: 'Needs Attention',
    riskLevel: 'Medium',
    lastUpdate: format(new Date(), 'HH:mm:ss'),
    liveHistory: generateInitialHistory(5.1),
    avatar: 'https://picsum.photos/seed/michael/100/100'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    age: 22,
    currentScore: 8.7,
    status: 'Stable',
    riskLevel: 'Low',
    lastUpdate: format(new Date(), 'HH:mm:ss'),
    liveHistory: generateInitialHistory(8.7),
    avatar: 'https://picsum.photos/seed/emma/100/100'
  },
  {
    id: '4',
    name: 'David Rodriguez',
    age: 45,
    currentScore: 4.8,
    status: 'Needs Attention',
    riskLevel: 'Medium',
    lastUpdate: format(new Date(), 'HH:mm:ss'),
    liveHistory: generateInitialHistory(4.8),
    avatar: 'https://picsum.photos/seed/david/100/100'
  }
];

export const mockRegistrationData = [
  { date: '2026-03-21', count: 12 },
  { date: '2026-03-22', count: 18 },
  { date: '2026-03-23', count: 15 },
  { date: '2026-03-24', count: 25 },
  { date: '2026-03-25', count: 22 },
  { date: '2026-03-26', count: 30 },
  { date: '2026-03-27', count: 28 },
];
