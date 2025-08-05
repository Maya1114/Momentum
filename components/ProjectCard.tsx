import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Progress } from "./ui/progress";
import { Calendar, Clock, Code, Target } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed';
  progress: number;
  startDate: string;
  deadline?: string;
  category: string;
  dailyGoal?: string;
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
}

const statusColors = {
  'planning': 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-orange-100 text-orange-800',
  'completed': 'bg-green-100 text-green-800'
};

const statusLabels = {
  'planning': 'Planning',
  'in-progress': 'In Progress',
  'completed': 'Completed'
};

export function ProjectCard({ project, onEdit }: ProjectCardProps) {
  const getDaysUntilDeadline = () => {
    if (!project.deadline) return null;
    const today = new Date();
    const deadline = new Date(project.deadline);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilDeadline();

  return (
    <Card className="w-full bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-base font-medium text-foreground mb-1">{project.title}</h3>
            <p className="text-sm text-muted-foreground">{project.description}</p>
          </div>
          <Badge className={`ml-2 ${statusColors[project.status]} text-xs`}>
            {statusLabels[project.status]}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Progress */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          {/* Category and Goal */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Code className="h-3 w-3" />
              <span>{project.category}</span>
            </div>
            {project.dailyGoal && (
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                <span>{project.dailyGoal}</span>
              </div>
            )}
          </div>

          {/* Dates */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Started {new Date(project.startDate).toLocaleDateString()}</span>
            </div>
            {daysLeft !== null && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span className={daysLeft < 7 ? 'text-orange-600' : ''}>
                  {daysLeft > 0 ? `${daysLeft} days left` : daysLeft === 0 ? 'Due today' : 'Overdue'}
                </span>
              </div>
            )}
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(project)}
            className="w-full text-sm"
          >
            Update Progress
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}