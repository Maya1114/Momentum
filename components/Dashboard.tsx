import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types/project";
// import { ProjectTimeline } from "./ProjectTimeline";
import { KeepBuildingCard } from "./KeepBuildingCard";
import { AddProject, AddProjectRef } from "./AddProject";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import {
  Plus,
  BarChart3,
  // Clock,
  CheckCircle2,
  Play,
  Calendar,
  Target,
  Edit,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

interface DashboardProps {
  projects: Project[];
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  streakGoal: "part-time" | "full-time" | "crazy-mode";
  showStreakBanner: boolean;
  onToggleStreakBanner: () => void;
  onAddProject: (project: Omit<Project, "id">) => void;
  onEditProject: (project: Project) => void;
  onUpdateProject: (project: Project) => void;
  onPublishProject: (project: Project) => void;
}

const statusConfig = {
  planning: {
    color:
      "from-blue-950/30 to-blue-900/30 dark:from-blue-950/40 dark:to-blue-900/40",
    border: "border-blue-200/50 dark:border-blue-800/50",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    icon: "text-blue-300 dark:text-blue-200",
    progress: "from-blue-500 to-blue-600",
  },
  "in-progress": {
    color:
      "from-orange-950/30 to-orange-900/30 dark:from-orange-950/20 dark:to-orange-900/20",
    border: "border-orange-200/50 dark:border-orange-800/50",
    badge:
      "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    icon: "text-orange-300 dark:text-orange-200",
    progress: "from-orange-500 to-orange-600",
  },
  completed: {
    color:
      "from-green-950/70 to-green-900/30 dark:from-green-950/30 dark:to-green-900/40",
    border: "border-green-200/50 dark:border-green-800/50",
    badge: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    icon: "text-green-300 dark:text-green-200",
    progress: "from-green-500 to-green-600",
  },
};

export function Dashboard({
  projects,
  currentStreak,
  longestStreak,
  lastActiveDate,
  streakGoal,
  showStreakBanner,
  onToggleStreakBanner,
  onAddProject,
  onEditProject,
  onUpdateProject,
  onPublishProject,
}: DashboardProps) {
  const [editingProgress, setEditingProgress] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const addProjectRef = useRef<AddProjectRef>(null);

  // Filter projects for dashboard view
  const activeProjects = projects.filter(
    (p) => p.status === "planning" || p.status === "in-progress"
  );
  const completedUnpublished = projects.filter(
    (p) => p.status === "completed" && !p.isPublished
  );
  const publishedProjects = projects.filter(
    (p) => p.status === "completed" && p.isPublished
  );

  const totalProgress =
    activeProjects.length > 0
      ? Math.round(
          activeProjects.reduce((acc, p) => acc + p.progress, 0) /
            activeProjects.length
        )
      : 0;

  const handleAddProject = (newProject: Omit<Project, "id">) => {
    onAddProject(newProject);
    // Form will auto-reset in AddProject component
  };

  // Effect to scroll to form when it becomes visible
  useEffect(() => {
    if (showAddForm) {
      const timer = setTimeout(() => {
        addProjectRef.current?.scrollIntoView();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showAddForm]);

  const handleNewProjectClick = () => {
    if (!showAddForm) {
      setShowAddForm(true);
    } else {
      addProjectRef.current?.scrollIntoView();
    }
  };

  const handleProgressChange = (projectId: string, newProgress: number[]) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      const updatedProject = { ...project, progress: newProgress[0] };
      onUpdateProject(updatedProject);
    }
  };

  const handleStatusToggle = (project: Project) => {
    const newStatus =
      project.status === "planning" ? "in-progress" : "planning";
    onUpdateProject({ ...project, status: newStatus });
  };

  const renderProjectCard = (project: Project, index: number) => {
    const config = statusConfig[project.status as keyof typeof statusConfig];

    return (
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -2 }}
        className="group"
      >
        <Card
          className={`p-6 bg-gradient-to-br ${config.color} ${config.border} hover:shadow-lg transition-all duration-300`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-medium text-lg mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {project.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(project.startDate).toLocaleDateString()}
                </div>
                {project.deadline && (
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    Due {new Date(project.deadline).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleStatusToggle(project)}
                className={`h-auto p-1 ${config.icon}`}
              >
                <Badge className={config.badge}>
                  {project.status === "planning"
                    ? "Planning"
                    : project.status === "in-progress"
                    ? "Active"
                    : "Completed"}
                </Badge>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditProject(project)}
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Progress Section */}
          {project.status !== "completed" && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-medium">{project.progress}%</span>
              </div>

              {editingProgress === project.id ? (
                <div className="space-y-2">
                  <Slider
                    value={[project.progress]}
                    onValueChange={(value) =>
                      handleProgressChange(project.id, value)
                    }
                    onPointerUp={() => setEditingProgress(null)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Drag to update progress
                  </p>
                </div>
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => setEditingProgress(project.id)}
                >
                  <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden hover:h-3 transition-all">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      className={`h-full bg-gradient-to-r ${config.progress} rounded-full transition-all`}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to adjust
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Completed Project Actions */}
          {project.status === "completed" && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  Completed
                </span>
                <span className="text-sm font-medium">100%</span>
              </div>
              <div className="w-full bg-green-100 dark:bg-green-950/30 rounded-full h-2">
                <div className="h-full w-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
              </div>

              <div className="pt-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onPublishProject(project)}
                  className="w-full gap-2 bg-green-600 hover:bg-green-700"
                >
                  <Sparkles className="h-3 w-3" />
                  Publish to Portfolio
                </Button>
              </div>
            </div>
          )}

          {/* Daily Goal */}
          {project.dailyGoal && (
            <div className="mt-4 p-3 bg-background/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Daily Goal</p>
              <p className="text-sm font-medium">{project.dailyGoal}</p>
            </div>
          )}
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Clean Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-medium">Good to see you back</h1>
          <p className="text-muted-foreground mt-1">
            Focus on what you're building • {activeProjects.length} active •{" "}
            {completedUnpublished.length} ready to publish
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button onClick={handleNewProjectClick} className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </motion.div>
      </motion.div>

      {/* Toggleable Streak Banner */}
      <AnimatePresence>
        {showStreakBanner && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <KeepBuildingCard
              currentStreak={currentStreak}
              longestStreak={longestStreak}
              lastActiveDate={lastActiveDate}
              streakGoal={streakGoal}
              onClose={onToggleStreakBanner}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card className="p-6 bg-gradient-to-br from-blue-950/70 to-blue-900/70 dark:from-blue-950/40 dark:to-blue-900/40 border-blue-200/50 dark:border-blue-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Play className="h-5 w-5 text-blue-300 dark:text-blue-200" />
            </div>
            <div>
              <p className="text-2xl font-medium">{activeProjects.length}</p>
              <p className="text-sm text-muted-foreground">Active projects</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-950/70 to-orange-900/70 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200/50 dark:border-orange-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-orange-300 dark:text-orange-200" />
            </div>
            <div>
              <p className="text-2xl font-medium">
                {completedUnpublished.length}
              </p>
              <p className="text-sm text-muted-foreground">Ready to publish</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-950/70 to-green-900/70 dark:from-green-950/40 dark:to-green-900/40 border-green-200/50 dark:border-green-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Sparkles className="h-5 w-5 text-green-300 dark:text-green-200" />
            </div>
            <div>
              <p className="text-2xl font-medium">{publishedProjects.length}</p>
              <p className="text-sm text-muted-foreground">Published</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-950/70 to-purple-900/70 dark:from-purple-950/40 dark:to-purple-900/40 border-purple-200/50 dark:border-purple-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <BarChart3 className="h-5 w-5 text-purple-300 dark:text-purple-200" />
            </div>
            <div>
              <p className="text-2xl font-medium">{totalProgress}%</p>
              <p className="text-sm text-muted-foreground">Avg progress</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Active Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-medium">Active Work</h2>
            <p className="text-sm text-muted-foreground">
              Projects you're currently working on
            </p>
          </div>
        </div>

        {activeProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="text-4xl mb-4 opacity-50">🚀</div>
            <h3 className="text-lg font-medium mb-2">
              Ready to start building?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Create your first project and begin tracking your development
              journey
            </p>
            <Button onClick={handleNewProjectClick} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Project
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeProjects.map((project, index) =>
              renderProjectCard(project, index)
            )}
          </div>
        )}
      </motion.div>

      {/* Completed - Ready to Publish */}
      {completedUnpublished.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium">Ready to Showcase</h2>
              <p className="text-sm text-muted-foreground">
                Completed projects ready for your portfolio
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedUnpublished.map((project, index) =>
              renderProjectCard(project, index)
            )}
          </div>
        </motion.div>
      )}

      {/* Add Project Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-medium">Start Something New</h2>
            <p className="text-sm text-muted-foreground">
              Add a new project to your active work
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddForm(!showAddForm)}
            className="gap-2"
          >
            {showAddForm ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            {showAddForm ? "Hide Form" : "Show Form"}
          </Button>
        </div>

        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AddProject
                ref={addProjectRef}
                onAdd={handleAddProject}
                onCancel={() => setShowAddForm(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
