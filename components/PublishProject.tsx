import { useState, useEffect } from "react";
import { Project } from "../types/project";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { motion } from "motion/react";
import { FileUpload } from "./ui/file-upload";
import { Plus, Trash2, Github, ExternalLink, Eye, Sparkles, CheckCircle2 } from "lucide-react";

interface PublishProjectProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onPublish: (project: Project) => void;
}

export function PublishProject({ project, isOpen, onClose, onPublish }: PublishProjectProps) {
  const [formData, setFormData] = useState<Project | null>(null);

  useEffect(() => {
    if (project) {
      setFormData({ 
        ...project,
        // Ensure showcase fields exist with defaults
        showcaseFeatures: project.showcaseFeatures || [''],
        showcaseDescription: project.showcaseDescription || project.description
      });
    }
  }, [project]);

  if (!project || !formData) return null;

  const handlePublish = () => {
    const publishedProject = {
      ...formData,
      isPublished: true,
      showcaseFeatures: formData.showcaseFeatures?.filter(f => f.trim()).length 
        ? formData.showcaseFeatures.filter(f => f.trim()) 
        : undefined
    };
    onPublish(publishedProject);
    onClose();
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
      <DialogContent className="w-[95vw] max-w-2xl mx-auto max-h-[90vh] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-black">
                Publish to Portfolio
                <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              </div>
              <DialogDescription className="mt-1">
                Make "{project.title}" visible in your public portfolio
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Preview Card */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-50/100 to-emerald-100/50 dark:from-green-950/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-800/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Eye className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg text-green-700 dark:text-green-300 mb-1">
                    Portfolio Preview
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    This is how your project will appear to visitors and potential employers
                  </p>
                </div>
              </div>
            </div>

            {/* Portfolio Showcase Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 text-black">
                  <Label htmlFor="publish-githubUrl" className="flex items-center gap-2 text-black">
                    <Github className="h-4 w-4" />
                    GitHub URL
                  </Label>
                  <Input
                    id="publish-githubUrl"
                    value={formData.githubUrl || ''}
                    onChange={(e) => setFormData(prev => prev ? { ...prev, githubUrl: e.target.value || undefined } : null)}
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div className="space-y-2 text-black">
                  <Label htmlFor="publish-demoUrl" className="flex items-center gap-2 text-black">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo URL
                  </Label>
                  <Input
                    id="publish-demoUrl"
                    value={formData.demoUrl || ''}
                    onChange={(e) => setFormData(prev => prev ? { ...prev, demoUrl: e.target.value || undefined } : null)}
                    placeholder="https://your-demo.com"
                  />
                </div>
              </div>

              <div className="space-y-2 text-black">
                <Label htmlFor="publish-showcaseDescription">Portfolio Description</Label>
                <Textarea
                  id="publish-showcaseDescription"
                  value={formData.showcaseDescription || ''}
                  onChange={(e) => setFormData(prev => prev ? { ...prev, showcaseDescription: e.target.value || undefined } : null)}
                  placeholder="Describe your project for potential employers and visitors..."
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  This will be displayed in your portfolio instead of the basic description
                </p>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-black">
                  Key Features & Highlights
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
                <div className="space-y-2 text-black">
                  {(formData.showcaseFeatures || ['']).map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder={`Feature ${index + 1} (e.g., "Authentication with JWT")`}
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
                <p className="text-xs text-muted-foreground">
                  Highlight the key features and technologies that make this project impressive
                </p>
              </div>

              <div className="space-y-2 text-black">
                <FileUpload
                  id="publish-showcaseImage"
                  label="Project Screenshot (Optional)"
                  value={formData.showcaseImage}
                  onChange={(value) => setFormData(prev => prev ? { ...prev, showcaseImage: value } : null)}
                  placeholder="Upload an image or enter a URL"
                />
                <p className="text-xs text-muted-foreground">
                  Add a screenshot or demo image to make your project stand out
                </p>
              </div>
            </div>

            <Separator />

            {/* Publishing Info */}
            <div className="p-4 rounded-lg bg-gray-200 border border-border/50 text-black">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-500" />
                What happens when you publish?
              </h4>
              <div className="space-y-1 text-sm text-black/70">
                <p>• Your project becomes visible in the "Projects" portfolio tab</p>
                <p>• You can always edit the portfolio information later</p>
                <p>• You can unpublish anytime if you change your mind</p>
                <p>• The project stays in your completed work tracking</p>
              </div>
            </div>
          </motion.div>
        </ScrollArea>

        <div className="flex gap-3 pt-4 border-t border-border/50">
          <Button onClick={handlePublish} className="flex-1 gap-2 bg-black text-white hover:bg-black/80 hover:text-white">
            <Sparkles className="h-4 w-4" />
            Publish to Portfolio
          </Button>
          <Button variant="outline" onClick={onClose} className="gap-2 bg-white text-black hover:bg-gray-200 hover:text-black">
            <Eye className="h-4 w-4" />
            Preview Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}