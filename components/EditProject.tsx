import { useState, useEffect } from "react";
import { Project } from "../types/project";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Alert, AlertDescription } from "./ui/alert";
import { Plus, Trash2, Github, ExternalLink, EyeOff, Sparkles } from "lucide-react";

interface EditProjectProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

export function EditProject({ project, isOpen, onClose, onSave, onDelete }: EditProjectProps) {
  const [formData, setFormData] = useState<Project | null>(null);

  // Initialize form data when project changes
  useEffect(() => {
    if (project) {
      setFormData({ 
        ...project,
        // Ensure showcase fields exist with defaults
        showcaseFeatures: project.showcaseFeatures || ['']
      });
    }
  }, [project]);

  if (!project || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      showcaseFeatures: formData.showcaseFeatures?.filter(f => f.trim()).length 
        ? formData.showcaseFeatures.filter(f => f.trim()) 
        : undefined
    });
    onClose();
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      onDelete(project.id);
      onClose();
    }
  };

  const handleUnpublish = () => {
    if (confirm('Are you sure you want to unpublish this project? It will be removed from your public portfolio but remain in your completed projects.')) {
      onSave({ ...formData, isPublished: false });
      onClose();
    }
  };

  const addFeature = () => {
    setFormData(prev => prev ? {
      ...prev,
      showcaseFeatures: [...(prev.showcaseFeatures || []), '']
    } : null);
  };

  const removeFeature = (index: number) => {
    setFormData(prev => prev ? {
      ...prev,
      showcaseFeatures: (prev.showcaseFeatures || []).filter((_, i) => i !== index)
    } : null);
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => prev ? {
      ...prev,
      showcaseFeatures: (prev.showcaseFeatures || []).map((feature, i) => 
        i === index ? value : feature
      )
    } : null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-2xl mx-auto max-h-[90vh] bg-white dark:bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2 text-black">
                Edit Project
                {formData.isPublished && (
                  <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Published
                  </Badge>
                )}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Project Info */}
            <div className="space-y-4 text-black">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Project Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => prev ? { ...prev, title: e.target.value } : null)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Basic Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => prev ? { ...prev, description: e.target.value } : null)}
                  rows={2}
                />
                <p className="text-xs text-muted-foreground">
                  This is used for tracking. Portfolio uses the showcase description below.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-progress">Progress: {formData.progress}%</Label>
                <Slider
                  id="edit-progress"
                  value={[formData.progress]}
                  onValueChange={(value) => setFormData(prev => prev ? { ...prev, progress: value[0] } : null)}
                  max={100}
                  step={5}
                  className="w-full [&_[data-slot=slider-track]]:bg-gray-200 [&_[data-slot=slider-range]]:bg-muted [&_[data-slot=slider-thumb]]:bg-primary [&_[data-slot=slider-thumb]]:border-muted/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => prev ? { ...prev, category: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="Full-stack">Full-stack</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="Mobile">Mobile</SelectItem>
                      <SelectItem value="Algorithms">Algorithms</SelectItem>
                      <SelectItem value="Open Source">Open Source</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => prev ? { ...prev, status: value } : null)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-deadline">Deadline</Label>
                <Input
                  id="edit-deadline"
                  type="date"
                  value={formData.deadline || ''}
                  onChange={(e) => setFormData(prev => prev ? { ...prev, deadline: e.target.value || undefined } : null)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-dailyGoal">Daily Goal</Label>
                <Input
                  id="edit-dailyGoal"
                  value={formData.dailyGoal || ''}
                  onChange={(e) => setFormData(prev => prev ? { ...prev, dailyGoal: e.target.value || undefined } : null)}
                  placeholder="e.g., 2 hours coding, 5 commits"
                />
              </div>
            </div>

            <Separator />

            {/* Portfolio Showcase Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-2 py-1 text-black">
                  Portfolio Showcase
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {formData.isPublished ? 'Currently published' : 'Will be used when published'}
                </span>
              </div>

              {formData.isPublished && (
                <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertDescription>
                    This project is currently published in your portfolio. Changes here will update your public showcase.
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 text-black">
                  <Label htmlFor="edit-githubUrl" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub URL
                  </Label>
                  <Input
                    id="edit-githubUrl"
                    value={formData.githubUrl || ''}
                    onChange={(e) => setFormData(prev => prev ? { ...prev, githubUrl: e.target.value || undefined } : null)}
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div className="space-y-2 text-black">
                  <Label htmlFor="edit-demoUrl" className="flex items-center gap-2 text-black">
                    <ExternalLink className="h-4 w-4" />
                    Demo URL
                  </Label>
                  <Input
                    id="edit-demoUrl"
                    value={formData.demoUrl || ''}
                    onChange={(e) => setFormData(prev => prev ? { ...prev, demoUrl: e.target.value || undefined } : null)}
                    placeholder="https://your-demo.com"
                  />
                </div>
              </div>

              <div className="space-y-2 text-black">
                <Label htmlFor="edit-showcaseDescription">Showcase Description</Label>
                <Textarea
                  id="edit-showcaseDescription"
                  value={formData.showcaseDescription || ''}
                  onChange={(e) => setFormData(prev => prev ? { ...prev, showcaseDescription: e.target.value || undefined } : null)}
                  placeholder="Professional description for your portfolio showcase"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  This replaces the basic description in your portfolio
                </p>
              </div>

              <div className="space-y-2 text-black">
                <Label className="flex items-center gap-2">
                  Key Features
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFeature}
                    className="h-6 px-2"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </Label>
                <div className="space-y-2">
                  {(formData.showcaseFeatures || ['']).map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                      />
                      {(formData.showcaseFeatures || []).length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFeature(index)}
                          className="px-2"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-black">
                <Label htmlFor="edit-showcaseImage">Showcase Image URL (Optional)</Label>
                <Input
                  id="edit-showcaseImage"
                  value={formData.showcaseImage || ''}
                  onChange={(e) => setFormData(prev => prev ? { ...prev, showcaseImage: e.target.value || undefined } : null)}
                  placeholder="https://example.com/project-screenshot.png"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1 bg-black text-white hover:bg-gray-800 hover:text-white">
                Save Changes
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="bg-white text-black hover:bg-gray-200 hover:text-black">
                Cancel
              </Button>
            </div>

            <Separator />
            
            {/* Portfolio Actions */}
            <div className="space-y-3">
              {formData.isPublished && (
                <Button 
                  type="button" 
                  variant="outline"
                  size="sm" 
                  onClick={handleUnpublish}
                  className="w-full gap-2"
                >
                  <EyeOff className="h-3 w-3" />
                  Unpublish from Portfolio
                </Button>
              )}
              
              <Button 
                type="button" 
                variant="destructive" 
                size="sm" 
                onClick={handleDelete}
                className="w-full"
              >
                Delete Project
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}