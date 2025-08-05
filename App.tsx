import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "./types/project";
import { Dashboard } from "./components/Dashboard";
import { Achievements } from "./components/Achievements";
import { Settings } from "./components/Settings";
import { Projects } from "./components/Projects";
import { EditProject } from "./components/EditProject";
import { PublishProject } from "./components/PublishProject";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import {
  LayoutDashboard,
  Trophy,
  Settings as SettingsIcon,
  Rocket,
  FolderOpen,
} from "lucide-react";

// Sample data with the new publish workflow
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "React Portfolio Website",
    description: "Building a responsive portfolio with React and Tailwind CSS",
    status: "in-progress",
    progress: 75,
    startDate: "2024-01-15",
    deadline: "2024-02-15",
    category: "Frontend",
    dailyGoal: "2 hours coding",
  },
  {
    id: "2",
    title: "LeetCode Daily Practice",
    description: "Solving algorithm problems to improve coding skills",
    status: "in-progress",
    progress: 40,
    startDate: "2024-01-01",
    category: "Algorithms",
    dailyGoal: "3 problems daily",
  },
  {
    id: "3",
    title: "Expense Tracker App",
    description: "Full-stack expense tracking application with authentication",
    status: "planning",
    progress: 10,
    startDate: "2024-01-20",
    deadline: "2024-03-01",
    category: "Full-stack",
  },
  {
    id: "4",
    title: "Task Management Dashboard",
    description: "A productivity app for managing personal and team tasks",
    status: "completed",
    progress: 100,
    startDate: "2023-11-01",
    category: "Full-stack",
    // This one is completed but not yet published
    isPublished: false,
  },
  {
    id: "5",
    title: "E-Commerce Platform",
    description: "Complete e-commerce solution with payment integration",
    status: "completed",
    progress: 100,
    startDate: "2023-09-01",
    category: "Full-stack",
    // This one is published
    isPublished: true,
    githubUrl: "https://github.com/username/ecommerce-platform",
    demoUrl: "https://my-ecommerce-demo.vercel.app",
    showcaseDescription:
      "A comprehensive e-commerce platform built with React, Node.js, and Stripe payments. Features include user authentication, product management, shopping cart, and secure checkout.",
    showcaseFeatures: [
      "User Authentication & Authorization",
      "Product Catalog with Search & Filters",
      "Shopping Cart & Wishlist",
      "Stripe Payment Integration",
      "Order Management System",
      "Admin Dashboard",
    ],
    showcaseImage:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    title: "Algorithm Visualizer",
    description: "Interactive visualizations for sorting and graph algorithms",
    status: "completed",
    progress: 100,
    startDate: "2023-10-01",
    category: "Frontend",
    // This one is published
    isPublished: true,
    githubUrl: "https://github.com/username/algorithm-visualizer",
    demoUrl: "https://algorithm-visualizer-demo.netlify.app",
    showcaseDescription:
      "An interactive web application that visualizes various sorting and pathfinding algorithms. Built with React and Canvas API for smooth animations.",
    showcaseFeatures: [
      "Sorting Algorithm Visualization",
      "Pathfinding Algorithm Demos",
      "Adjustable Speed Controls",
      "Step-by-step Breakdown",
      "Multiple Array Sizes",
      "Educational Tooltips",
    ],
    showcaseImage:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80",
  },
];

export default function App() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [publishingProject, setPublishingProject] = useState<Project | null>(
    null
  );
  const [currentStreak, setCurrentStreak] = useState(7);
  const [longestStreak, setLongestStreak] = useState(15);
  const [lastActiveDate, setLastActiveDate] = useState(
    new Date().toISOString()
  );
  const [streakGoal, setStreakGoal] = useState<
    "part-time" | "full-time" | "crazy-mode"
  >("full-time");
  const [activeView, setActiveView] = useState<
    "dashboard" | "projects" | "achievements" | "settings"
  >("dashboard");
  const [showStreakBanner, setShowStreakBanner] = useState(true);

  const handleAddProject = (newProject: Omit<Project, "id">) => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString(),
    };
    setProjects((prev) => [project, ...prev]);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );

    // Update streak if progress was made
    const originalProject = projects.find((p) => p.id === updatedProject.id);
    if (originalProject && updatedProject.progress > originalProject.progress) {
      const today = new Date().toISOString();
      const lastActiveDay = new Date(lastActiveDate).toDateString();
      const todayDay = new Date(today).toDateString();

      if (lastActiveDay !== todayDay) {
        setCurrentStreak((prev) => prev + 1);
        setLongestStreak((prev) => Math.max(prev, currentStreak + 1));
        setLastActiveDate(today);
      }
    }
  };

  const handleEditProject = (updatedProject: Project) => {
    handleUpdateProject(updatedProject);
  };

  const handlePublishProject = (project: Project) => {
    setPublishingProject(project);
  };

  const handleConfirmPublish = (publishedProject: Project) => {
    handleUpdateProject(publishedProject);
    setPublishingProject(null);
  };

  const handleUnpublishProject = (project: Project) => {
    handleUpdateProject({ ...project, isPublished: false });
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  // Calculate stats for the new workflow
  const activeProjects = projects.filter(
    (p) => p.status === "planning" || p.status === "in-progress"
  );
  const completedProjects = projects.filter((p) => p.status === "completed");
  const publishedProjects = projects.filter(
    (p) => p.status === "completed" && p.isPublished
  );

  const renderContent = () => {
    const contentMap = {
      dashboard: (
        <Dashboard
          projects={projects}
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          lastActiveDate={lastActiveDate}
          streakGoal={streakGoal}
          showStreakBanner={showStreakBanner}
          onToggleStreakBanner={() => setShowStreakBanner(!showStreakBanner)}
          onAddProject={handleAddProject}
          onEditProject={setEditingProject}
          onUpdateProject={handleUpdateProject}
          onPublishProject={handlePublishProject}
        />
      ),
      projects: (
        <Projects
          projects={projects}
          onEditProject={setEditingProject}
          onUnpublishProject={handleUnpublishProject}
        />
      ),
      achievements: (
        <Achievements
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          completedProjects={completedProjects.length}
          totalProjects={projects.length}
        />
      ),
      settings: (
        <Settings streakGoal={streakGoal} onStreakGoalChange={setStreakGoal} />
      ),
    };

    return contentMap[activeView];
  };

  const getTabCount = (tab: string) => {
    switch (tab) {
      case "dashboard":
        return activeProjects.length;
      case "projects":
        return publishedProjects.length;
      case "achievements":
        return null;
      case "settings":
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="dark">
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background text-foreground">
          <Sidebar className="border-r-0">
            <SidebarHeader className="p-6 border-b border-border/50">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"
                >
                  <Rocket className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <h1 className="font-semibold text-lg">Momentum</h1>
                  <p className="text-xs text-muted-foreground">
                    Keep building amazing things
                  </p>
                </div>
              </motion.div>
            </SidebarHeader>

            <SidebarContent className="p-4">
              <SidebarMenu className="space-y-2">
                {[
                  {
                    id: "dashboard",
                    icon: LayoutDashboard,
                    label: "Dashboard",
                    description: "Track & publish",
                  },
                  {
                    id: "projects",
                    icon: FolderOpen,
                    label: "Portfolio",
                    description: "Public showcase",
                  },
                  {
                    id: "achievements",
                    icon: Trophy,
                    label: "Achievements",
                    description: "Your progress",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  const count = getTabCount(item.id);
                  return (
                    <SidebarMenuItem key={item.id}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 2 }}
                      >
                        <SidebarMenuButton
                          onClick={() => setActiveView(item.id as any)}
                          isActive={activeView === item.id}
                          className="w-full h-auto p-3 rounded-xl transition-all duration-200 hover:bg-sidebar-accent/50 flex-col items-start gap-1"
                        >
                          <div className="flex items-center gap-3 w-full">
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            <div className="flex-1 text-left">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">
                                  {item.label}
                                </span>
                                {count !== null && (
                                  <span className="text-xs bg-sidebar-accent px-2 py-0.5 rounded-full">
                                    {count}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </SidebarMenuButton>
                      </motion.div>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-border/50">
              <SidebarMenu>
                <SidebarMenuItem>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ x: 2 }}
                  >
                    <SidebarMenuButton
                      onClick={() => setActiveView("settings")}
                      isActive={activeView === "settings"}
                      className="w-full h-11 rounded-xl transition-all duration-200 hover:bg-sidebar-accent/50"
                    >
                      <SettingsIcon className="h-4 w-4" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </motion.div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <header className="border-b border-border/50 p-4 bg-background/50 backdrop-blur-sm">
              <SidebarTrigger className="hover:bg-accent/50 transition-colors rounded-lg" />
            </header>

            <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>

        {/* Edit Project Modal */}
        <EditProject
          project={editingProject}
          isOpen={!!editingProject}
          onClose={() => setEditingProject(null)}
          onSave={handleEditProject}
          onDelete={handleDeleteProject}
        />

        {/* Publish Project Modal */}
        <PublishProject
          project={publishingProject}
          isOpen={!!publishingProject}
          onClose={() => setPublishingProject(null)}
          onPublish={handleConfirmPublish}
        />
      </SidebarProvider>
    </div>
  );
}
