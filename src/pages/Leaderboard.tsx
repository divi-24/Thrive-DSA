import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, ArrowLeft } from 'lucide-react';

const leaderboardData = [
  { id: 1, name: 'Alice', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', solved: 120, streak: 15 },
  { id: 2, name: 'John Doe', avatar: 'https://github.com/shadcn.png', solved: 98, streak: 8 },
  { id: 3, name: 'Bob', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', solved: 90, streak: 6 },
  { id: 4, name: 'You', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', solved: 85, streak: 5 },
  { id: 5, name: 'Eve', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', solved: 80, streak: 4 },
];

const Leaderboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      <main className="flex-1 container mx-auto px-2 md:px-4 py-8 flex flex-col gap-6 items-center">
        <div className="w-full max-w-2xl flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <a href="/dashboard"><ArrowLeft className="h-5 w-5" /></a>
          </Button>
          <h1 className="text-3xl font-bold flex items-center gap-2"><Award className="h-7 w-7 text-primary" /> Leaderboard</h1>
        </div>
        <Card className="w-full max-w-2xl p-6 bg-background/90 border border-border rounded-2xl shadow-md">
          <CardTitle className="text-lg font-bold mb-4">Top Users</CardTitle>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-muted-foreground text-sm">
                  <th className="py-2 px-2">Rank</th>
                  <th className="py-2 px-2">User</th>
                  <th className="py-2 px-2">Solved</th>
                  <th className="py-2 px-2">Streak</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user, idx) => (
                  <tr key={user.id} className={`transition ${user.name === 'You' ? 'bg-primary/10 font-bold' : ''}`}> 
                    <td className="py-2 px-2 font-semibold text-center">{idx + 1}</td>
                    <td className="py-2 px-2 flex items-center gap-2">
                      <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full border-2 border-primary" />
                      {user.name}
                    </td>
                    <td className="py-2 px-2">{user.solved}</td>
                    <td className="py-2 px-2">{user.streak}d</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Leaderboard; 