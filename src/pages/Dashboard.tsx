import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, User, Activity, ArrowRight, Plus, BookOpen, Award, Zap, Smile, CheckCircle2, MessageSquare, Sun, Moon, Clock, CloudSun, Bolt } from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { formatDistanceToNow } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import Confetti from 'react-confetti';
import { Switch } from '@/components/ui/switch';
import { Tooltip } from 'react-tooltip';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, ChartTooltip, Legend);

const mockStats = {
  attempted: 156,
  solved: 98,
  streak: 8,
  xp: 1240,
  successRate: 92,
};

const activityData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Problems Solved',
      data: [3, 5, 4, 6, 2, 7, 5],
      backgroundColor: 'rgba(99, 102, 241, 0.7)',
      borderRadius: 8,
    },
  ],
};

const platformData = {
  labels: ['LeetCode', 'Codeforces', 'CodeChef', 'AtCoder'],
  datasets: [
    {
      label: 'Problems',
      data: [40, 25, 20, 13],
      backgroundColor: ['#FFA116', '#1F8ACB', '#E84D8A', '#4CAF50'],
      borderWidth: 1,
    },
  ],
};

const achievements = [
  { id: 1, title: '7 Day Streak', icon: <Zap className="h-5 w-5 text-yellow-400" />, desc: 'Solved for 7 days' },
  { id: 2, title: '100 Problems', icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, desc: 'Solved 100 problems' },
  { id: 3, title: 'Community Helper', icon: <Award className="h-5 w-5 text-blue-400" />, desc: 'Helped 50 users' },
  { id: 4, title: 'Language Master', icon: <BookOpen className="h-5 w-5 text-purple-500" />, desc: 'Solved in 3 languages' },
];

const recentActivity = [
  { id: 1, type: 'solved', text: 'Solved "Two Sum"', time: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: 2, type: 'badge', text: 'Earned "7 Day Streak" badge', time: new Date(Date.now() - 5 * 60 * 60 * 1000) },
  { id: 3, type: 'comment', text: 'Commented on "Binary Tree Inorder Traversal"', time: new Date(Date.now() - 8 * 60 * 60 * 1000) },
];

const motivationalQuotes = [
  'Every expert was once a beginner.',
  'Consistency is the key to mastery.',
  'Solve one more problem today!',
  'Celebrate small wins on your journey.',
  'Learning never exhausts the mind.',
];

const goals = [
  { id: 1, label: 'Daily Goal', target: 5, current: 4, type: 'daily' },
  { id: 2, label: 'Weekly Goal', target: 25, current: 18, type: 'weekly' },
  { id: 3, label: 'Monthly Goal', target: 100, current: 62, type: 'monthly' },
];

const leaderboard = [
  { id: 1, name: 'Alice', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', solved: 120 },
  { id: 2, name: 'John Doe', avatar: 'https://github.com/shadcn.png', solved: 98 },
  { id: 3, name: 'Bob', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', solved: 90 },
];

const contests = [
  { id: 1, name: 'LeetCode Weekly #350', date: '2024-06-15 18:30' },
  { id: 2, name: 'Codeforces Round #900', date: '2024-06-18 21:00' },
];

const discussions = [
  { id: 1, title: 'How to optimize DP problems?', time: new Date(Date.now() - 3 * 60 * 60 * 1000) },
  { id: 2, title: 'Best resources for system design', time: new Date(Date.now() - 8 * 60 * 60 * 1000) },
];

const resourceSpotlight = {
  title: 'Top 10 Tips for Cracking Coding Interviews',
  link: 'https://www.geeksforgeeks.org/10-tips-for-coding-interviews/',
  desc: 'A must-read article for anyone preparing for technical interviews.'
};

// GitHub-style streak calendar mock data
const streakCalendar = Array.from({ length: 7 }, (_, week) =>
  Array.from({ length: 7 }, (_, day) => ({
    date: new Date(Date.now() - ((week * 7 + day) * 24 * 60 * 60 * 1000)),
    solved: Math.floor(Math.random() * 5),
  }))
);

const personalBests = {
  bestStreak: 14,
  fastestSolve: '2m 30s',
  highestXPDay: 320,
};

const liveNotifications = [
  { id: 1, type: 'info', message: 'New contest announced: Codeforces Round #901!' },
  { id: 2, type: 'success', message: 'You just hit a new streak record!' },
];

const dailyChallenge = {
  title: 'Daily Challenge: Longest Substring Without Repeating Characters',
  link: '/problems/longest-substring-without-repeating-characters',
  desc: "Sharpen your skills with today's handpicked challenge!"
};

const weather = {
  temp: '28°C',
  condition: 'Sunny',
  city: 'New Delhi',
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

// Add a mock for 'resume last problem'
const lastProblem = {
  title: 'Binary Tree Zigzag Level Order Traversal',
  link: '/problems/binary-tree-zigzag-level-order-traversal',
};

const Dashboard: React.FC = () => {
  const [quote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWidgets, setShowWidgets] = useState({
    goals: true,
    leaderboard: true,
    contests: true,
    streak: true,
    discussions: true,
    resource: true,
    personalBests: true,
    notifications: true,
    dailyChallenge: true,
    weather: true,
  });
  const [theme, setTheme] = useState('dark');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Simulate celebration on new achievement (for demo)
  useEffect(() => {
    setTimeout(() => setShowConfetti(true), 1000);
    setTimeout(() => setShowConfetti(false), 4000);
  }, []);

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Theme switcher
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Animated Progress Ring for XP
  const xpRingData = {
    labels: ['XP', 'Remaining'],
    datasets: [
      {
        data: [mockStats.xp % 1000, 1000 - (mockStats.xp % 1000)],
        backgroundColor: ['#a78bfa', '#e5e7eb'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20 ${theme === 'dark' ? 'dark' : ''}`}>
      <Navbar />
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={200} />} 
      <main className="flex-1 container mx-auto px-2 md:px-4 py-8 flex flex-col gap-6 items-center">
        {/* Top: Greeting, Avatar, Quick Stats, Progress Bars */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-2">
          {/* Greeting & Avatar */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <img src="https://github.com/shadcn.png" alt="avatar" className="h-14 w-14 rounded-full border-2 border-primary shadow-md" />
            <div>
              <h1 className="text-2xl font-bold">{getGreeting()}, John Doe!</h1>
              <p className="text-sm text-muted-foreground">Ready to ace your next DSA challenge?</p>
            </div>
          </div>
          {/* Quick Stats */}
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-background/90 border rounded-xl p-3 flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Solved</span>
                <span className="font-bold text-lg text-green-500">{mockStats.solved}</span>
              </div>
              <div className="bg-background/90 border rounded-xl p-3 flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Attempted</span>
                <span className="font-bold text-lg text-primary">{mockStats.attempted}</span>
              </div>
              <div className="bg-background/90 border rounded-xl p-3 flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Streak</span>
                <span className="font-bold text-lg text-yellow-400">{mockStats.streak}d</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-background/90 border rounded-xl p-3 flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Success Rate</span>
                <span className="font-bold text-lg text-green-600">{mockStats.successRate}%</span>
              </div>
              <div className="bg-background/90 border rounded-xl p-3 flex flex-col items-center">
                <span className="text-xs text-muted-foreground">XP</span>
                <span className="font-bold text-lg text-purple-500">{mockStats.xp}</span>
              </div>
            </div>
          </div>
          {/* Progress Bars */}
          <div className="flex flex-col gap-2">
            {goals.map(goal => (
              <div key={goal.id} className="mb-1">
                <div className="flex justify-between text-xs mb-1">
                  <span>{goal.label}</span>
                  <span>{goal.current}/{goal.target}</span>
                </div>
                <Progress value={Math.min((goal.current / goal.target) * 100, 100)} className="h-2 rounded" />
              </div>
            ))}
          </div>
        </div>
        {/* Action Shortcuts */}
        <div className="w-full max-w-6xl flex flex-wrap md:flex-nowrap gap-3 justify-center items-center mb-2">
          <Button variant="default" className="rounded-lg flex items-center gap-2" asChild><a href="/solutions"><BarChart3 className="h-4 w-4" /> Start Practice</a></Button>
          <Button variant="default" className="rounded-lg flex items-center gap-2" asChild><a href={lastProblem.link}><ArrowRight className="h-4 w-4" /> Resume Last Problem</a></Button>
          <Button variant="outline" className="rounded-lg flex items-center gap-2" asChild><a href="/notes"><BookOpen className="h-4 w-4" /> View Notes</a></Button>
          <Button variant="outline" className="rounded-lg flex items-center gap-2" asChild><a href="/leaderboard"><Award className="h-4 w-4" /> Leaderboard</a></Button>
          {contests[0] && (
            <Button variant="secondary" className="rounded-lg flex items-center gap-2" asChild><a href="#"><BarChart3 className="h-4 w-4" /> Next Contest: {contests[0].name}</a></Button>
          )}
        </div>
        {/* Compact Widgets Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recent Achievements */}
          <Card className="p-4 flex flex-col gap-2 max-h-[300px] overflow-x-auto">
            <CardTitle className="text-base font-bold mb-2 flex items-center gap-2"><Award className="h-5 w-5 text-primary" /> Recent Achievements</CardTitle>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {achievements.slice(0, 4).map((ach) => (
                <div key={ach.id} className="min-w-[120px] bg-background/90 border rounded-xl p-2 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer" title={ach.desc}>
                  {ach.icon}
                  <div className="font-semibold mt-1 text-sm">{ach.title}</div>
                </div>
              ))}
            </div>
          </Card>
          {/* Recent Activity */}
          <Card className="p-4 flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            <CardTitle className="text-base font-bold mb-2 flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> Recent Activity</CardTitle>
            <div className="flex flex-col gap-2">
              {recentActivity.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center gap-2 text-sm">
                  {item.type === 'solved' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                  {item.type === 'badge' && <Award className="h-4 w-4 text-yellow-400" />}
                  {item.type === 'comment' && <MessageSquare className="h-4 w-4 text-blue-400" />}
                  <span className="flex-1">{item.text}</span>
                  <span className="text-xs text-muted-foreground">{formatDistanceToNow(item.time, { addSuffix: true })}</span>
                </div>
              ))}
            </div>
          </Card>
          {/* Language/Platform Breakdown */}
          <Card className="p-4 flex flex-row gap-6 max-h-[300px] items-center bg-background/95 border border-border rounded-2xl shadow-md">
            <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
              <Doughnut
                data={platformData}
                options={{
                  responsive: true,
                  cutout: '70%',
                  plugins: { legend: { display: false } },
                }}
              />
              {/* Total in center */}
              <span className="absolute text-xl font-bold text-primary" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                {platformData.datasets[0].data.reduce((a, b) => a + b, 0)}
                <span className="block text-xs font-normal text-muted-foreground">Total</span>
              </span>
            </div>
            {/* Custom Legend */}
            <div className="flex flex-col gap-3 justify-center">
              {platformData.labels.map((label, idx) => {
                const count = platformData.datasets[0].data[idx];
                const total = platformData.datasets[0].data.reduce((a, b) => a + b, 0);
                const percent = ((count / total) * 100).toFixed(1);
                return (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-sm cursor-pointer group"
                    data-tip={`${count} problems (${percent}%)`}
                  >
                    <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: platformData.datasets[0].backgroundColor[idx] }} />
                    <span className="font-medium">{label}</span>
                    <span className="text-muted-foreground ml-2">{count}</span>
                    <span className="ml-1 text-xs text-muted-foreground">({percent}%)</span>
                  </div>
                );
              })}
              <Tooltip effect="solid" />
            </div>
          </Card>
          {/* Daily Challenge & Resource Spotlight */}
          <div className="flex flex-col gap-4 max-h-[300px]">
            <Card className="p-4 flex flex-col gap-2 mb-2">
              <CardTitle className="text-base font-bold mb-2 flex items-center gap-2"><ArrowRight className="h-5 w-5 text-primary" /> Daily Challenge</CardTitle>
              <div className="text-sm mb-2">{dailyChallenge.title}</div>
              <Button variant="default" size="sm" className="rounded-lg flex items-center gap-2 w-fit" asChild>
                <a href={dailyChallenge.link}>Solve Now</a>
              </Button>
            </Card>
            <Card className="p-4 flex flex-col gap-2">
              <CardTitle className="text-base font-bold mb-2 flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> Resource Spotlight</CardTitle>
              <a href={resourceSpotlight.link} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline text-sm">{resourceSpotlight.title}</a>
              <div className="text-xs text-muted-foreground">{resourceSpotlight.desc}</div>
            </Card>
          </div>
        </div>
        {/* Optional: Leaderboard Preview, Discussion Highlights, Mini Streak Calendar */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {/* Leaderboard Preview */}
          <Card className="p-4 flex flex-col gap-2 max-h-[180px]">
            <CardTitle className="text-base font-bold mb-2 flex items-center gap-2"><Award className="h-5 w-5 text-primary" /> Top 3 Leaderboard</CardTitle>
            <div className="flex flex-col gap-1">
              {leaderboard.slice(0, 3).map((user, idx) => (
                <div key={user.id} className="flex items-center gap-2 text-sm">
                  <span className={`font-bold w-5 text-center ${idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-silver-400' : 'text-bronze-400'}`}>{idx + 1}</span>
                  <img src={user.avatar} alt={user.name} className="h-7 w-7 rounded-full border-2 border-primary" />
                  <span className="flex-1">{user.name}</span>
                  <span className="text-primary font-bold">{user.solved}</span>
                </div>
              ))}
            </div>
          </Card>
          {/* Discussion Highlights */}
          <Card className="p-4 flex flex-col gap-2 max-h-[180px]">
            <CardTitle className="text-base font-bold mb-2 flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /> Recent Discussions</CardTitle>
            <div className="flex flex-col gap-1">
              {discussions.slice(0, 2).map(disc => (
                <div key={disc.id} className="flex items-center gap-2 text-sm">
                  <span className="flex-1 font-medium">{disc.title}</span>
                  <span className="text-xs text-muted-foreground">{formatDistanceToNow(disc.time, { addSuffix: true })}</span>
                </div>
              ))}
            </div>
          </Card>
          {/* Mini Streak Calendar */}
          <Card className="p-4 flex flex-col gap-2 max-h-[180px] items-center">
            <CardTitle className="text-base font-bold mb-2 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Streak
              <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full flex items-center gap-1">
                <Award className="h-3 w-3 text-yellow-500" /> Best: {personalBests.bestStreak}
              </span>
            </CardTitle>
            <div className="flex gap-2 mb-1">
              {streakCalendar[0].map((day, idx) => {
                const isToday = idx === new Date().getDay();
                const filled = day.solved > 0;
                return (
                  <div
                    key={idx}
                    className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${filled ? 'bg-primary/80 border-primary animate-pulse' : 'bg-transparent border-muted/30'} ${isToday && filled ? 'ring-2 ring-yellow-400' : ''}`}
                    data-tip={filled ? `Solved on ${day.date.toLocaleDateString()}` : `Missed (${day.date.toLocaleDateString()})`}
                  />
                );
              })}
              <Tooltip effect="solid" />
            </div>
            <div className="text-sm font-medium text-primary">Current Streak: {mockStats.streak} days</div>
            {mockStats.streak > 0 ? (
              <div className="text-xs text-green-500 mt-1 flex items-center gap-1">🔥 Keep it up!</div>
            ) : (
              <div className="text-xs text-muted-foreground mt-1">Let's start a new streak!</div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 