import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AnimatedTransition from "@/components/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  ArrowRight, 
  Search, 
  Code, 
  Filter, 
  Star, 
  Clock, 
  Tag,
  ChevronRight,
  Eye,
  Heart,
  MessageSquare,
  Share2
} from "lucide-react";
import { mockSolutions } from "@/data/mockData";
import { motion } from "framer-motion";

interface Solution {
  id: string;
  platform: string;
  problemId: string;
  title: string;
  difficulty: string;
  language: string;
  code: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  lastUpdated: string;
}

const Solutions: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [solutions, setSolutions] = useState<Solution[]>([]);

  // Mock data for solutions
  useEffect(() => {
    const mockData: Solution[] = [
      {
        id: "1",
        platform: "leetcode",
        problemId: "1",
        title: "Two Sum",
        difficulty: "Easy",
        language: "C++",
        code: mockSolutions["leetcode-1"],
        tags: ["Array", "Hash Table"],
        views: 234,
        likes: 56,
        comments: 12,
        lastUpdated: "2024-03-15"
      },
      {
        id: "2",
        platform: "leetcode",
        problemId: "2",
        title: "Regular Expression Matching",
        difficulty: "Hard",
        language: "Python",
        code: mockSolutions["leetcode-2"],
        tags: ["String", "Dynamic Programming"],
        views: 189,
        likes: 34,
        comments: 8,
        lastUpdated: "2024-03-10"
      },
      {
        id: "3",
        platform: "hackerrank",
        problemId: "1",
        title: "Solve Me First",
        difficulty: "Easy",
        language: "JavaScript",
        code: mockSolutions["hackerrank-1"],
        tags: ["Basic"],
        views: 156,
        likes: 23,
        comments: 5,
        lastUpdated: "2024-03-05"
      }
    ];
    setSolutions(mockData);
  }, []);

  const filteredSolutions = solutions.filter(solution => {
    const matchesSearch = solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         solution.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTab = selectedTab === "all" || solution.platform === selectedTab;
    const matchesLanguage = selectedLanguage === "all" || solution.language === selectedLanguage;
    const matchesDifficulty = selectedDifficulty === "all" || solution.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesTab && matchesLanguage && matchesDifficulty;
  });

  const difficultyColors = {
    Easy: "text-green-500 bg-green-950/30 border border-green-500/20",
    Medium: "text-yellow-500 bg-yellow-950/30 border border-yellow-500/20",
    Hard: "text-red-500 bg-red-950/30 border border-red-500/20"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">My Solutions</h1>
            <p className="text-muted-foreground">View and manage all your coding solutions in one place</p>
          </div>

          {isAuthenticated ? (
            <div className="space-y-6">
              {/* Search and Filter Section */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search solutions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="px-3 py-2 rounded-md border border-border bg-background text-sm"
                  >
                    <option value="all">All Languages</option>
                    <option value="C++">C++</option>
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                  </select>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="px-3 py-2 rounded-md border border-border bg-background text-sm"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Platform Tabs */}
              <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="leetcode">LeetCode</TabsTrigger>
                  <TabsTrigger value="hackerrank">HackerRank</TabsTrigger>
                  <TabsTrigger value="codeforces">Codeforces</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Solutions Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredSolutions.map((solution) => (
                  <motion.div key={solution.id} variants={itemVariants}>
                    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{solution.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Code className="h-4 w-4" />
                              {solution.language}
                            </CardDescription>
                          </div>
                          <Badge className={difficultyColors[solution.difficulty as keyof typeof difficultyColors]}>
                            {solution.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {solution.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {solution.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {solution.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {solution.comments}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {new Date(solution.lastUpdated).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => navigate(`/platform/${solution.platform}/${solution.problemId}`)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Add New Solution Button */}
              <div className="flex justify-center mt-8">
                <Button asChild className="group" size="lg">
                  <Link to="/solutions/new">
                    <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
                    Add New Solution
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Please log in to view your solutions</p>
              <Button asChild>
                <a href="/login">Log In</a>
              </Button>
            </div>
          )}
        </main>
      </div>
    </AnimatedTransition>
  );
};

export default Solutions; 