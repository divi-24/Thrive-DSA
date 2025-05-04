import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AnimatedTransition from "@/components/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Settings, 
  Edit, 
  Code, 
  Star, 
  Trophy, 
  Calendar, 
  Clock,
  BookOpen,
  MessageSquare,
  Heart,
  Share2,
  Github,
  Linkedin,
  Twitter,
  Globe,
  BarChart3,
  Target,
  Award,
  Zap,
  TrendingUp,
  Bookmark,
  Bell,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock4,
  Plus,
  Search,
  Filter,
  MoreVertical,
  ExternalLink,
  Copy,
  Eye,
  ThumbsUp,
  MessageCircle,
  BookmarkCheck,
  Activity,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  BarChart as RechartsBarChart,
  Pin,
  Upload,
  PieChart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useSpring, animated } from '@react-spring/web';
import ReactMarkdown from 'react-markdown';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend);

// Mock data for skills and progress
const skills = [
  { name: "Data Structures", level: 85, category: "Core" },
  { name: "Algorithms", level: 80, category: "Core" },
  { name: "Dynamic Programming", level: 75, category: "Advanced" },
  { name: "Graph Theory", level: 70, category: "Advanced" },
  { name: "System Design", level: 65, category: "Advanced" },
  { name: "Problem Solving", level: 90, category: "Core" }
];

const achievements = [
  { id: "1", title: "7 Day Streak", description: "Solved problems for 7 consecutive days", icon: "streak", date: "2024-03-15" },
  { id: "2", title: "Problem Solver", description: "Solved 100 problems", icon: "problems", date: "2024-03-10" },
  { id: "3", title: "Community Helper", description: "Helped 50 users with their solutions", icon: "community", date: "2024-03-05" },
  { id: "4", title: "Language Master", description: "Solved problems in 3 different languages", icon: "languages", date: "2024-03-01" }
];

const calendarData = {
  "2024-03-15": { solved: 5, streak: true },
  "2024-03-14": { solved: 3, streak: true },
  "2024-03-13": { solved: 4, streak: true },
  "2024-03-12": { solved: 2, streak: true },
  "2024-03-11": { solved: 1, streak: true },
  "2024-03-10": { solved: 3, streak: true },
  "2024-03-09": { solved: 2, streak: true }
};

// Mock data for solutions
const solutions = [
  {
    id: "1",
    title: "Two Sum",
    platform: "LeetCode",
    language: "Python",
    difficulty: "Easy",
    date: "2024-03-15",
    views: 120,
    likes: 45,
    comments: 12
  },
  {
    id: "2",
    title: "Regular Expression Matching",
    platform: "LeetCode",
    language: "Java",
    difficulty: "Hard",
    date: "2024-03-14",
    views: 85,
    likes: 32,
    comments: 8
  },
  {
    id: "3",
    title: "Binary Tree Inorder Traversal",
    platform: "LeetCode",
    language: "JavaScript",
    difficulty: "Medium",
    date: "2024-03-13",
    views: 95,
    likes: 28,
    comments: 6
  }
];

// Mock data for user profile
const userProfile = {
  name: "John Doe",
  username: "johndoe",
  bio: "Passionate about solving complex problems and sharing knowledge with the community. Specializing in algorithms and system design.",
  avatar: "https://github.com/shadcn.png",
  badges: [
    { name: "Problem Solver", icon: "trophy", color: "gold" },
    { name: "Community Helper", icon: "award", color: "silver" },
    { name: "Language Master", icon: "code", color: "bronze" }
  ],
  socialLinks: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    website: "https://johndoe.dev"
  },
  stats: {
    totalProblems: 156,
    solvedProblems: 98,
    solutions: 45,
    contributions: 12,
    followers: 234,
    following: 156,
    streak: 7,
    rank: "Top 5%"
  }
};

// Mock data for notifications
const notifications = [
  {
    id: "1",
    type: "like",
    message: "Someone liked your solution for 'Two Sum'",
    timestamp: "2024-03-15T10:30:00Z",
    read: false
  },
  {
    id: "2",
    type: "comment",
    message: "New comment on your solution for 'Regular Expression Matching'",
    timestamp: "2024-03-15T09:15:00Z",
    read: true
  },
  {
    id: "3",
    type: "follow",
    message: "New follower: @alice",
    timestamp: "2024-03-14T16:45:00Z",
    read: true
  }
];

// Mock data for charts
const activityData = [
  { date: '2024-03-01', problems: 3, streak: true },
  { date: '2024-03-02', problems: 5, streak: true },
  { date: '2024-03-03', problems: 4, streak: true },
  { date: '2024-03-04', problems: 6, streak: true },
  { date: '2024-03-05', problems: 2, streak: true },
  { date: '2024-03-06', problems: 7, streak: true },
  { date: '2024-03-07', problems: 5, streak: true },
];

const languageData = [
  { name: 'Python', value: 45, color: '#3572A5' },
  { name: 'Java', value: 30, color: '#B07219' },
  { name: 'JavaScript', value: 25, color: '#F1E05A' },
];

const difficultyData = [
  { name: 'Easy', value: 40, color: '#22C55E' },
  { name: 'Medium', value: 35, color: '#F59E0B' },
  { name: 'Hard', value: 25, color: '#EF4444' },
];

const performanceData = [
  { name: 'Success Rate', value: 92, previous: 88, trend: 'up' },
  { name: 'Average Time', value: 15, previous: 18, trend: 'down' },
  { name: 'Code Quality', value: 88, previous: 85, trend: 'up' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Add new mock data for GitHub-style activity
const generateGitHubStyleData = () => {
  const data = [];
  const today = new Date();
  const daysInWeek = 7;
  const weeks = 52;

  for (let week = 0; week < weeks; week++) {
    const weekData = [];
    for (let day = 0; day < daysInWeek; day++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (week * 7 + day));
      const solved = Math.floor(Math.random() * 5);
      weekData.push({
        date: date.toISOString().split('T')[0],
        solved,
        level: solved === 0 ? 0 : Math.min(Math.floor(solved / 2) + 1, 4)
      });
    }
    data.push(weekData);
  }
  return data;
};

const activityLevels = [
  { level: 0, color: 'var(--muted)' },
  { level: 1, color: 'var(--primary/20)' },
  { level: 2, color: 'var(--primary/40)' },
  { level: 3, color: 'var(--primary/60)' },
  { level: 4, color: 'var(--primary)' }
];

// Animated Counter component
const AnimatedCounter = ({ value }: { value: number }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: value,
    config: { mass: 1, tension: 120, friction: 14 },
  });
  return <animated.span>{number.to((n) => Math.floor(n))}</animated.span>;
};

// Profile Completion Calculation
const getProfileCompletion = (profile: any, socialLinks: any) => {
  let completed = 0;
  if (profile.avatar) completed++;
  if (profile.name) completed++;
  if (profile.username) completed++;
  if (profile.bio) completed++;
  if (socialLinks.github) completed++;
  if (socialLinks.linkedin) completed++;
  if (socialLinks.twitter) completed++;
  if (socialLinks.website) completed++;
  return Math.round((completed / 8) * 100);
};

const activityChartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Problems Solved",
      data: [3, 5, 4, 6, 2, 7, 5],
      backgroundColor: 'rgba(99, 102, 241, 0.7)',
      borderColor: 'rgba(99, 102, 241, 1)',
      borderWidth: 2,
      borderRadius: 6,
      tension: 0.4,
    },
  ],
};

const languagePieData = {
  labels: ["Python", "Java", "JavaScript"],
  datasets: [
    {
      label: "Languages",
      data: [45, 30, 25],
      backgroundColor: ["#3572A5", "#B07219", "#F1E05A"],
      borderWidth: 1,
    },
  ],
};

const difficultyBarData = {
  labels: ["Easy", "Medium", "Hard"],
  datasets: [
    {
      label: "Problems",
      data: [40, 35, 25],
      backgroundColor: ["#22C55E", "#F59E0B", "#EF4444"],
      borderRadius: 6,
    },
  ],
};

const languageLegend = [
  { label: 'Python', color: '#3572A5' },
  { label: 'Java', color: '#B07219' },
  { label: 'JavaScript', color: '#F1E05A' },
];

const sectionDivider = <div className="my-8 border-t border-border opacity-40" />;

const notificationTypeIcon = (type: string) => {
  switch (type) {
    case 'like': return <Heart className="h-5 w-5 text-pink-500" />;
    case 'comment': return <MessageSquare className="h-5 w-5 text-blue-400" />;
    case 'follow': return <Bell className="h-5 w-5 text-primary" />;
    case 'badge': return <Award className="h-5 w-5 text-yellow-400" />;
    default: return <Bell className="h-5 w-5 text-primary" />;
  }
};

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [expandedSkills, setExpandedSkills] = useState(false);
  const [expandedAchievements, setExpandedAchievements] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState(userProfile);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [notificationsList, setNotificationsList] = useState([
    {
      id: "1",
      type: "follow",
      message: "New follower: @alice",
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2m ago
      read: false
    },
    {
      id: "2",
      type: "like",
      message: "Someone liked your solution",
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1h ago
      read: false
    },
    {
      id: "3",
      type: "comment",
      message: "New comment on your solution",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3h ago
      read: true
    },
    {
      id: "4",
      type: "badge",
      message: "You earned the 'Problem Solver' badge!",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1d ago
      read: true
    }
  ]);
  const [unreadNotifications, setUnreadNotifications] = useState(
    notifications.filter(n => !n.read).length
  );
  const [activeChart, setActiveChart] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [chartData, setChartData] = useState(activityData);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState({
    github: '',
    linkedin: '',
    twitter: '',
    website: ''
  });
  const [gitHubStyleData, setGitHubStyleData] = useState(generateGitHubStyleData());
  const [themeColor, setThemeColor] = useState('#6366f1');
  const [bioMarkdown, setBioMarkdown] = useState(profileData.bio);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const profileCompletion = getProfileCompletion(profileData, socialLinks);
  const editFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setProfileData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          streak: Math.min(prev.stats.streak + 1, 30),
          solvedProblems: prev.stats.solvedProblems + 1
        }
      }));

      // Update chart data
      setChartData(prev => {
        const newData = [...prev];
        const lastDate = new Date(newData[newData.length - 1].date);
        lastDate.setDate(lastDate.getDate() + 1);
        newData.push({
          date: lastDate.toISOString().split('T')[0],
          problems: Math.floor(Math.random() * 5) + 2,
          streak: true
        });
        return newData.slice(-7);
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handleSaveProfile = () => {
    // Here you would typically make an API call to save the profile
    toast.success("Profile updated successfully!");
    setIsEditingProfile(false);
  };

  const handleNotificationClick = (id: string) => {
    setNotificationsList(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadNotifications(prev => Math.max(0, prev - 1));
  };

  const filteredSolutions = solutions.filter(solution => {
    const matchesSearch = solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         solution.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = filterLanguage === "all" || solution.language === filterLanguage;
    const matchesDifficulty = filterDifficulty === "all" || solution.difficulty === filterDifficulty;
    return matchesSearch && matchesLanguage && matchesDifficulty;
  });

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

  const SkillCard = ({ skill }: { skill: typeof skills[0] }) => (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{skill.name}</h3>
        <Badge variant="secondary">{skill.category}</Badge>
      </div>
      <Progress value={skill.level} className="h-2" />
      <div className="flex justify-between text-sm text-muted-foreground mt-1">
        <span>Level {skill.level}%</span>
        <span>{skill.level >= 80 ? "Expert" : skill.level >= 60 ? "Advanced" : "Intermediate"}</span>
      </div>
    </Card>
  );

  const AchievementCard = ({ achievement }: { achievement: typeof achievements[0] }) => (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          {achievement.icon === "streak" && <Zap className="h-5 w-5 text-primary" />}
          {achievement.icon === "problems" && <Target className="h-5 w-5 text-primary" />}
          {achievement.icon === "community" && <Award className="h-5 w-5 text-primary" />}
          {achievement.icon === "languages" && <Code className="h-5 w-5 text-primary" />}
        </div>
        <div>
          <h3 className="font-medium">{achievement.title}</h3>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
          <div className="text-xs text-muted-foreground mt-1">
            {new Date(achievement.date).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Card>
  );

  const CalendarDay = ({ date, data }: { date: string; data: { solved: number; streak: boolean } }) => (
    <div className={`p-2 rounded-lg text-center ${
      data.streak ? "bg-primary/10" : "bg-muted/10"
    }`}>
      <div className="text-sm font-medium">{new Date(date).getDate()}</div>
      <div className="text-xs text-muted-foreground">{data.solved} solved</div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 rounded-lg border shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            Problems: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  const handleEditProfileClick = () => {
    setIsEditingProfile(true);
    setTimeout(() => {
      editFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100); // Wait for form to render
  };

  const markAsRead = (id: string) => {
    setNotificationsList((prev) => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };
  const markAllAsRead = () => {
    setNotificationsList((prev) => prev.map(n => ({ ...n, read: true })));
  };
  const clearAll = () => {
    setNotificationsList([]);
  };

  if (!isAuthenticated) {
    return (
      <AnimatedTransition>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight mb-4">Profile</h1>
              <p className="text-muted-foreground mb-6">Please log in to view your profile</p>
              <Button asChild>
                <a href="/login">Log In</a>
              </Button>
            </div>
          </main>
        </div>
      </AnimatedTransition>
    );
  }

  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-2 md:px-4 py-8">
          {/* Top: Profile Card & Completion Meter */}
          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
            {/* Profile Card */}
            <Card className="flex-1 flex flex-col md:flex-row md:items-center gap-6 p-6 bg-background/90 border border-border rounded-2xl shadow-xl">
              <div className="flex flex-col items-center md:items-start gap-4">
                <Avatar className="h-28 w-28 border-4 border-primary shadow-lg">
                  <AvatarImage src={previewImage || profileData.avatar} />
                  <AvatarFallback>{profileData.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex gap-2 mt-2">
                  {Object.entries(socialLinks).map(([platform, url]) => (
                    url && (
                      <Button key={platform} variant="ghost" size="icon" asChild className="hover:bg-primary/10">
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {platform === "github" && <Github className="h-5 w-5" />}
                          {platform === "linkedin" && <Linkedin className="h-5 w-5" />}
                          {platform === "twitter" && <Twitter className="h-5 w-5" />}
                          {platform === "website" && <Globe className="h-5 w-5" />}
                        </a>
                      </Button>
                    )
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2 items-center md:items-start">
                <h1 className="text-3xl font-bold tracking-tight text-center md:text-left">{profileData.name}</h1>
                <p className="text-muted-foreground text-center md:text-left">@{profileData.username}</p>
                <p className="mt-2 text-muted-foreground text-center md:text-left">{profileData.bio}</p>
                <div className="flex gap-4 mt-4">
                  <Button variant="outline" className="gap-2 rounded-lg">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                  <Button className="gap-2 rounded-lg" onClick={handleEditProfileClick}>
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end gap-2 md:w-1/4">
                <span className="font-semibold">Profile Completion</span>
                <Progress value={profileCompletion} className="h-3 w-40 rounded-lg" style={{ background: '#e5e7eb' }} />
                <span className="text-sm font-medium">{profileCompletion}%</span>
              </div>
            </Card>
          </div>

          {sectionDivider}

          {/* Stats & Gamification */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
            <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Animated Stats Grid */}
              <Card className="flex flex-col items-center justify-center p-4 bg-background/90 border border-border rounded-2xl shadow-md">
                <BarChart3 className="h-6 w-6 text-primary mb-2" />
                <div className="text-2xl font-bold"><AnimatedCounter value={profileData.stats.solvedProblems} /></div>
                <div className="text-xs text-muted-foreground">out of {profileData.stats.totalProblems}</div>
                <div className="font-medium mt-1">Problems Solved</div>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4 bg-background/90 border border-border rounded-2xl shadow-md">
                <Code className="h-6 w-6 text-primary mb-2" />
                <div className="text-2xl font-bold"><AnimatedCounter value={profileData.stats.solutions} /></div>
                <div className="text-xs text-muted-foreground">shared with community</div>
                <div className="font-medium mt-1">Solutions</div>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4 bg-background/90 border border-border rounded-2xl shadow-md">
                <User className="h-6 w-6 text-primary mb-2" />
                <div className="text-2xl font-bold"><AnimatedCounter value={profileData.stats.followers} /></div>
                <div className="text-xs text-muted-foreground">followers • {profileData.stats.following} following</div>
                <div className="font-medium mt-1">Followers</div>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4 bg-background/90 border border-border rounded-2xl shadow-md">
                <Zap className="h-6 w-6 text-primary mb-2" />
                <div className="text-2xl font-bold"><AnimatedCounter value={profileData.stats.streak} /></div>
                <div className="text-xs text-muted-foreground">days active</div>
                <div className="font-medium mt-1">Streak</div>
              </Card>
            </div>
            {/* Gamification Card */}
            <div className="md:col-span-1">
              <Card className="h-full flex flex-col justify-center items-center p-6 bg-background/90 border border-border rounded-2xl shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-lg">Gamification</span>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>XP: 1240</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Level: 7</span>
                  </div>
                  <Progress value={70} className="h-2 rounded-lg" />
                  <span className="text-xs text-muted-foreground">70% to next level</span>
                </div>
              </Card>
            </div>
          </div>

          {sectionDivider}

          {/* Main Content: Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Left Column */}
            <div className="flex flex-col gap-8">
              {/* Achievements & Badges */}
              <Card className="p-6 bg-background/90 border border-border rounded-2xl shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl font-bold">Achievements & Badges</CardTitle>
                </div>
                <div className="flex flex-wrap gap-3">
                  {achievements.map((ach, idx) => (
                    <Badge key={ach.id} variant="secondary" className="flex items-center gap-1 text-base px-3 py-2 hover:scale-105 transition-transform shadow-sm">
                      {ach.icon === "streak" && <Zap className="h-4 w-4" />}
                      {ach.icon === "problems" && <Target className="h-4 w-4" />}
                      {ach.icon === "community" && <Award className="h-4 w-4" />}
                      {ach.icon === "languages" && <Code className="h-4 w-4" />}
                      {ach.title}
                    </Badge>
                  ))}
                </div>
              </Card>
              {/* Solution Highlights */}
              <Card className="p-6 bg-background/90 border border-border rounded-2xl shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl font-bold">Solution Highlights</CardTitle>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>Most Liked: Two Sum (45 likes)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-blue-400" />
                    <span>Most Viewed: Regular Expression Matching (120 views)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-2 py-1">
                    <Pin className="h-4 w-4 text-primary" />
                    <span className="font-semibold">Pinned: Binary Tree Inorder Traversal</span>
                  </div>
                </div>
              </Card>
              {/* Profile Customization */}
              <Card className="p-6 bg-background/90 border border-border rounded-2xl shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Edit className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl font-bold">Profile Customization</CardTitle>
                </div>
                <div className="mb-2 font-semibold">Bio (Markdown Supported)</div>
                <Textarea
                  value={bioMarkdown}
                  onChange={(e) => setBioMarkdown(e.target.value)}
                  className="mb-2 rounded-lg"
                  rows={4}
                />
                <div className="border rounded-lg p-2 bg-muted/30 shadow-inner">
                  <ReactMarkdown>{bioMarkdown}</ReactMarkdown>
                </div>
              </Card>
            </div>
            {/* Right Column */}
            <div className="flex flex-col gap-8">
              {/* Activity Feed */}
              <Card className="p-6 bg-background/90 border border-border rounded-2xl shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl font-bold">Activity Feed</CardTitle>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Earned "7 Day Streak" badge</span>
                    <span className="text-muted-foreground ml-auto">2h ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4 text-green-500" />
                    <span>Solved 5 problems</span>
                    <span className="text-muted-foreground ml-auto">Today</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span>Helped 2 users</span>
                    <span className="text-muted-foreground ml-auto">Yesterday</span>
                  </div>
                </div>
              </Card>
              {/* Followers & Following */}
              <Card className="p-6 bg-background/90 border border-border rounded-2xl shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl font-bold">Followers & Following</CardTitle>
                </div>
                <div className="flex flex-wrap gap-3 mb-2">
                  <Avatar className="h-10 w-10 hover:scale-110 transition-transform" title="John Doe"><AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" /></Avatar>
                  <Avatar className="h-10 w-10 hover:scale-110 transition-transform" title="Jane Smith"><AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" /></Avatar>
                  <Avatar className="h-10 w-10 hover:scale-110 transition-transform" title="Mike Brown"><AvatarImage src="https://randomuser.me/api/portraits/men/65.jpg" /></Avatar>
                  <Avatar className="h-10 w-10 hover:scale-110 transition-transform" title="Alice"><AvatarImage src="https://randomuser.me/api/portraits/women/22.jpg" /></Avatar>
                  <Avatar className="h-10 w-10 hover:scale-110 transition-transform" title="Bob"><AvatarImage src="https://randomuser.me/api/portraits/men/12.jpg" /></Avatar>
                  <Avatar className="h-10 w-10 hover:scale-110 transition-transform" title="Eve"><AvatarImage src="https://randomuser.me/api/portraits/women/55.jpg" /></Avatar>
                </div>
                <Button size="sm" variant="outline" className="rounded-lg">View All</Button>
              </Card>
              {/* Notifications */}
              <Card className="p-6 bg-background/90 border border-border rounded-2xl shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl font-bold">Notifications</CardTitle>
                  <div className="ml-auto flex gap-2">
                    <Button size="xs" variant="outline" className="rounded-lg" onClick={markAllAsRead} disabled={notificationsList.every(n => n.read)}>Mark all as read</Button>
                    <Button size="xs" variant="ghost" className="rounded-lg" onClick={clearAll}>Clear all</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {notificationsList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      <Bell className="h-10 w-10 mb-2 text-primary/40" />
                      <div className="font-semibold text-lg">No notifications</div>
                      <div className="text-sm">You're all caught up!</div>
                    </div>
                  ) : (
                    notificationsList.map((n) => (
                      <button
                        key={n.id}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group text-left ${n.read ? 'bg-transparent opacity-70' : 'bg-primary/10 border border-primary/30 shadow-sm'}`}
                        onClick={() => markAsRead(n.id)}
                      >
                        <span className="relative">
                          {notificationTypeIcon(n.type)}
                          {!n.read && <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary animate-pulse" />}
                        </span>
                        <span className="flex-1">
                          <span className="font-medium">{n.message}</span>
                          <span className="block text-xs text-muted-foreground mt-0.5">{formatDistanceToNow(new Date(n.timestamp), { addSuffix: true })}</span>
                        </span>
                        {!n.read && (
                          <span className="ml-auto text-xs text-primary font-semibold group-hover:underline">Mark as read</span>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </div>

          {sectionDivider}

          {/* Bottom: Interactive Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Activity Overview Card (unchanged) */}
            <Card className="bg-background/90 border border-border rounded-2xl shadow-xl p-6 flex flex-col justify-center items-center">
              <CardHeader className="pb-2 text-center w-full">
                <div className="flex items-center gap-2 justify-center mb-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-2xl font-bold">Activity Overview</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="w-full flex flex-col items-center">
                <div className="h-64 w-full">
                  <Bar
                    data={activityChartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { display: false },
                        tooltip: { enabled: true },
                      },
                      scales: {
                        x: { grid: { display: false } },
                        y: { beginAtZero: true, grid: { color: '#eee' } },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Redesigned Language & Difficulty Breakdown Card */}
            <Card className="bg-background/90 border border-border rounded-2xl shadow-xl p-6 flex flex-col justify-center items-center">
              <CardHeader className="pb-2 text-center w-full">
                <div className="flex items-center gap-2 justify-center mb-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  <CardTitle className="text-2xl font-bold">Language & Difficulty Breakdown</CardTitle>
                </div>
                <CardDescription className="text-base text-muted-foreground">See your coding diversity and challenge level</CardDescription>
              </CardHeader>
              <CardContent className="w-full flex flex-col items-center">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
                  {/* Doughnut Chart + Legend */}
                  <div className="flex flex-col items-center">
                    <div className="w-44 h-44 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <Doughnut
                        data={languagePieData}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: { display: false },
                            tooltip: {
                              callbacks: {
                                label: function(context) {
                                  return `${context.label}: ${context.parsed} problems`;
                                }
                              }
                            },
                          },
                          cutout: '70%',
                        }}
                      />
                    </div>
                    {/* Custom Legend */}
                    <div className="flex flex-col gap-2 mt-4">
                      {languageLegend.map((item) => (
                        <div key={item.label} className="flex items-center gap-2">
                          <span className="inline-block w-5 h-3 rounded bg-white border border-border" style={{ background: item.color }}></span>
                          <span className="text-base font-medium text-muted-foreground">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Difficulty Bar Chart */}
                  <div className="w-full md:w-64 flex flex-col items-center">
                    <div className="w-full h-44 bg-white rounded-xl shadow-lg flex items-center justify-center p-4">
                      <Bar
                        data={difficultyBarData}
                        options={{
                          indexAxis: 'y',
                          responsive: true,
                          plugins: {
                            legend: { display: false },
                            tooltip: {
                              callbacks: {
                                label: function(context) {
                                  return `${context.label}: ${context.parsed.x} problems`;
                                }
                              }
                            },
                          },
                          scales: {
                            x: { beginAtZero: true, grid: { color: '#eee' }, ticks: { color: '#222', font: { size: 14 } } },
                            y: { grid: { display: false }, ticks: { color: '#222', font: { size: 16, weight: 'bold' } } },
                          },
                          barThickness: 28,
                          borderRadius: 12,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Edit Card (conditionally rendered) */}
          {isEditingProfile && (
            <div ref={editFormRef} className="flex justify-center items-center min-h-[60vh]">
              <Card className="w-full max-w-3xl p-8 rounded-2xl shadow-xl bg-background/80 border border-border flex flex-col md:flex-row gap-8">
                {/* Avatar Section */}
                <div className="flex flex-col items-center md:items-start gap-4 md:w-1/3">
                  <div className="relative group">
                    <Avatar className="h-32 w-32 border-4 border-primary shadow-lg">
                      <AvatarImage src={previewImage || profileData.avatar} />
                    </Avatar>
                    <label htmlFor="profile-image" className="absolute bottom-2 right-2 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer shadow-md opacity-90 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="h-5 w-5" />
                      <input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">Change Avatar</span>
                </div>
                {/* Form Section */}
                <form className="flex-1 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="font-semibold text-base">Name</Label>
                    <Input 
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your name"
                      className="bg-muted/40 focus:bg-background rounded-lg px-4 py-2"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="username" className="font-semibold text-base">Username</Label>
                    <Input 
                      id="username"
                      value={profileData.username}
                      onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="Username"
                      className="bg-muted/40 focus:bg-background rounded-lg px-4 py-2"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="bio" className="font-semibold text-base">Bio</Label>
                    <Textarea 
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Your bio"
                      className="bg-muted/40 focus:bg-background rounded-lg px-4 py-2 min-h-[80px]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="font-semibold text-base">Social Links</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 bg-muted/30 rounded-lg px-3 py-2">
                        <Github className="h-5 w-5 text-[#333]" />
                        <Input
                          value={socialLinks.github}
                          onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                          placeholder="GitHub profile URL"
                          className="bg-transparent border-none focus:ring-0 text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2 bg-muted/30 rounded-lg px-3 py-2">
                        <Linkedin className="h-5 w-5 text-[#0077b5]" />
                        <Input
                          value={socialLinks.linkedin}
                          onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                          placeholder="LinkedIn profile URL"
                          className="bg-transparent border-none focus:ring-0 text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2 bg-muted/30 rounded-lg px-3 py-2">
                        <Twitter className="h-5 w-5 text-[#1da1f2]" />
                        <Input
                          value={socialLinks.twitter}
                          onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                          placeholder="Twitter profile URL"
                          className="bg-transparent border-none focus:ring-0 text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2 bg-muted/30 rounded-lg px-3 py-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <Input
                          value={socialLinks.website}
                          onChange={(e) => handleSocialLinkChange('website', e.target.value)}
                          placeholder="Personal website URL"
                          className="bg-transparent border-none focus:ring-0 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <Button type="button" onClick={handleSaveProfile} className="px-6">Save</Button>
                    <Button type="button" variant="outline" onClick={() => setIsEditingProfile(false)} className="px-6">Cancel</Button>
                  </div>
                </form>
              </Card>
            </div>
          )}
        </main>
      </div>
    </AnimatedTransition>
  );
};

export default Profile; 