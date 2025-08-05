import { motion } from "motion/react";
import { Project } from "../types/project";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Clock, Play, Edit } from "lucide-react";

interface ProjectTimelineProps {
  projects: Project[];
  onEditProject: (project: Project) => void;
}

const statusConfig = {
  'planning': {
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    dot: 'bg-blue-500'
  },
  'in-progress': {
    color: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    dot: 'bg-orange-500'
  },
  'completed': {
    color: 'bg-green-500/10 text-green-600 border-green-500/20',
    dot: 'bg-green-500'
  },
  'paused': {
    color: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
    dot: 'bg-gray-500'
  }
};

const statusLabels = {
  'planning': 'Planning',
  'in-progress': 'In Progress',
  'completed': 'Completed',
  'paused': 'Paused'
};

export function ProjectTimeline({ projects, onEditProject }: ProjectTimelineProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {projects.map((project, index) => {
        const config = statusConfig[project.status];
        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            {/* Timeline Line */}
            {index < projects.length - 1 && (
              <div className="absolute left-4 top-12 w-0.5 h-16 bg-border" />
            )}
            
            <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50 hover:bg-card transition-colors border border-border/50 hover:border-border">
              {/* Status Dot */}
              <div className="relative flex-shrink-0 mt-1">
                <div className={`w-2 h-2 rounded-full ${config.dot}`} />
              </div>

              {/* Project Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(project.startDate).toLocaleDateString()}
                      </div>
                      {project.deadline && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Due {new Date(project.deadline).toLocaleDateString()}
                        </div>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex items-center gap-3">
                    <Badge className={config.color}>
                      {statusLabels[project.status]}
                    </Badge>
                    
                    {/* Progress */}
                    <div className="text-right">
                      <div className="text-sm font-medium">{project.progress}%</div>
                      <div className="w-16 bg-muted rounded-full h-1.5 mt-1">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => onEditProject(project)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}