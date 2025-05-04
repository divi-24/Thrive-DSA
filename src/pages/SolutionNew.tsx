import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';

const SolutionNew: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      <main className="flex-1 container mx-auto px-2 md:px-4 py-8 flex flex-col gap-6 items-center">
        <div className="w-full max-w-xl flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <a href="/solutions"><ArrowLeft className="h-5 w-5" /></a>
          </Button>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Plus className="h-6 w-6 text-primary" /> Add New Solution</h1>
        </div>
        <Card className="w-full max-w-xl p-6 bg-background/90 border border-border rounded-2xl shadow-md">
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Problem Title</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg bg-background/80" placeholder="e.g. Two Sum" required />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Platform</label>
                <select className="w-full px-3 py-2 border rounded-lg bg-background/80" required>
                  <option value="">Select</option>
                  <option>LeetCode</option>
                  <option>Codeforces</option>
                  <option>CodeChef</option>
                  <option>AtCoder</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Language</label>
                <select className="w-full px-3 py-2 border rounded-lg bg-background/80" required>
                  <option value="">Select</option>
                  <option>Python</option>
                  <option>Java</option>
                  <option>C++</option>
                  <option>JavaScript</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Solution Code</label>
              <textarea className="w-full px-3 py-2 border rounded-lg bg-background/80" rows={6} placeholder="Paste your code here..." required />
            </div>
            <Button type="submit" className="w-full mt-2">Submit Solution</Button>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default SolutionNew; 