import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types/project";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Play,
  ExternalLink,
  Github,
  Search,
  Sparkles,
  Calendar,
  Trophy,
  Star,
  CheckCircle2,
  Edit,
} from "lucide-react";

interface ProjectsProps {
  projects: Project[];
  onEditProject: (project: Project) => void;
  onUnpublishProject: (project: Project) => void;
}

export function Projects({
  projects,
  onEditProject,
}: ProjectsProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter to only show published projects
  const publishedProjects = projects.filter(
    (p) => p.status === "completed" && p.isPublished
  );

  const filteredProjects = publishedProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.showcaseDescription &&
        project.showcaseDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  const generateDemoContent = (project: Project) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Project Header */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 p-8">
          <div className="relative z-10">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-semibold text-white mb-3"
            >
              {project.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/90 mb-4"
            >
              {project.showcaseDescription || project.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 flex-wrap"
            >
              <Badge className="bg-white/20 text-white border-white/30">
                {project.category}
              </Badge>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Published
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                {new Date(project.startDate).getFullYear()}
              </Badge>
            </motion.div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-lg" />
        </div>

        {/* Project Image */}
        {project.showcaseImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden rounded-xl"
          >
            <ImageWithFallback
              src={project.showcaseImage}
              alt={`${project.title} screenshot`}
              className="w-full h-64 object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
          </motion.div>
        )}

        {/* Features */}
        {project.showcaseFeatures && project.showcaseFeatures.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h4 className="font-medium text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Key Features
              </h4>
              <div className="space-y-2">
                {project.showcaseFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border/50"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <h4 className="font-medium text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Project Details
              </h4>
              <div className="space-y-3 p-4 rounded-lg bg-card border border-border/50">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Category
                  </span>
                  <Badge variant="outline">{project.category}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Started</span>
                  <span className="text-sm font-medium">
                    {new Date(project.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    Published
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Progress
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div className="w-full h-full bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">100%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center"
        >
          {project.demoUrl && (
            <Button
              className="gap-2"
              onClick={() => window.open(project.demoUrl, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </Button>
          )}
          {project.githubUrl && (
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.open(project.githubUrl, "_blank")}
            >
              <Github className="h-4 w-4" />
              View Code
            </Button>
          )}
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => onEditProject(project)}
          >
            <Edit className="h-4 w-4" />
            Edit Portfolio
          </Button>
        </motion.div>

        {/* Development Details */}
        {project.dailyGoal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="p-4 rounded-lg bg-muted/50 border border-border/50"
          >
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              Development Goal
            </h4>
            <p className="text-sm text-muted-foreground">{project.dailyGoal}</p>
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-medium">Portfolio Showcase</h1>
          <p className="text-muted-foreground mt-1">
            Your published projects • {publishedProjects.length} public project
            {publishedProjects.length !== 1 ? "s" : ""}
          </p>
        </div>
      </motion.div>

      {/* Search */}
      {publishedProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative max-w-md"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search published projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card/50 border-border/50 focus:bg-card focus:border-border transition-all duration-200"
          />
        </motion.div>
      )}

      {/* Portfolio Projects */}
      <AnimatePresence mode="wait">
        {filteredProjects.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="text-6xl mb-6 opacity-50"
            >
              🏆
            </motion.div>
            <h3 className="text-xl font-medium mb-2">
              {searchTerm
                ? "No published projects found"
                : publishedProjects.length === 0
                ? "No published projects yet"
                : "No matches"}
            </h3>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              {searchTerm
                ? "Try adjusting your search terms"
                : publishedProjects.length === 0
                ? "Complete and publish projects from your Dashboard to showcase them here"
                : "No projects match your search"}
            </p>
            {publishedProjects.length === 0 && (
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground max-w-md">
                  💡 <strong>Tip:</strong> Head to your Dashboard to complete
                  projects, then use the "Publish to Portfolio" button to add
                  them here with custom showcase information!
                </p>
                <Button variant="outline" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Go to Dashboard
                </Button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-1050/50 to-emerald-900/50 dark:from-green-950/20 dark:to-emerald-900/20 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">
                  {/* Published Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-green-500/20 text-green-600 border-green-500/30 dark:text-green-400">
                      ✓ Published
                    </Badge>
                  </div>

                  {/* Project Image */}
                  {project.showcaseImage && (
                    <div className="relative h-32 overflow-hidden">
                      <ImageWithFallback
                        src={project.showcaseImage}
                        alt={`${project.title} preview`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}

                  <CardHeader className={project.showcaseImage ? "pt-4" : ""}>
                    <CardTitle className="text-lg group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors pr-16">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.showcaseDescription || project.description}
                    </CardDescription>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(project.startDate).toLocaleDateString()}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Features Preview */}
                    {project.showcaseFeatures &&
                      project.showcaseFeatures.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-muted-foreground mb-2">
                            Key Features:
                          </p>
                          <div className="space-y-1">
                            {project.showcaseFeatures
                              .slice(0, 2)
                              .map((feature, i) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-2 text-xs"
                                >
                                  <div className="w-1 h-1 bg-green-500 rounded-full" />
                                  <span className="line-clamp-1">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            {project.showcaseFeatures.length > 2 && (
                              <div className="text-xs text-muted-foreground">
                                +{project.showcaseFeatures.length - 2} more
                                features
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                    {/* Progress Indicator */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          Published
                        </span>
                        <span className="text-sm font-medium">100%</span>
                      </div>
                      <div className="w-full bg-green-100 dark:bg-green-950/30 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{
                            delay: index * 0.1 + 0.5,
                            duration: 1,
                            ease: "easeOut",
                          }}
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        />
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1 gap-1 bg-green-600 hover:bg-green-700"
                        >
                          <Play className="h-3 w-3" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[85vh] overflow-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {project.title}
                            <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                              Published
                            </Badge>
                          </DialogTitle>
                          <DialogDescription>
                            {project.showcaseDescription || project.description}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-6">
                          {generateDemoContent(project)}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {project.githubUrl ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => window.open(project.githubUrl, "_blank")}
                      >
                        <Github className="h-3 w-3" />
                        Code
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => onEditProject(project)}
                      >
                        <Github className="h-3 w-3" />
                        Add URL
                      </Button>
                    )}

                    {project.demoUrl ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => window.open(project.demoUrl, "_blank")}
                      >
                        <ExternalLink className="h-3 w-3" />
                        Live
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => onEditProject(project)}
                      >
                        <ExternalLink className="h-3 w-3" />
                        Add URL
                      </Button>
                    )}
                  </CardFooter>

                  {/* Hover Effect Overlay */}
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
