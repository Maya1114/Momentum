import { useState, useRef, useImperativeHandle, forwardRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { FileUpload } from "./ui/file-upload";
import { X, Plus, Trash2, Github, ExternalLink } from "lucide-react";
import { Project } from "../types/project";

interface AddProjectProps {
  onAdd: (project: Omit<Project, "id">) => void;
  onCancel: () => void;
}

export interface AddProjectRef {
  scrollIntoView: () => void;
  resetForm: () => void;
}

const initialFormData = {
  title: "",
  description: "",
  status: "planning" as const,
  progress: 0,
  startDate: new Date().toISOString().split("T")[0],
  deadline: "",
  category: "",
  dailyGoal: "",
  // Portfolio showcase fields
  githubUrl: "",
  demoUrl: "",
  showcaseDescription: "",
  showcaseFeatures: [""],
  showcaseImage: "",
};

export const AddProject = forwardRef<AddProjectRef, AddProjectProps>(
  ({ onAdd, onCancel }, ref) => {
    const [formData, setFormData] = useState(initialFormData);
    const cardRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      scrollIntoView: () => {
        cardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      },
      resetForm: () => {
        setFormData({
          ...initialFormData,
          startDate: new Date().toISOString().split("T")[0],
        });
      },
    }));

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.title.trim() || !formData.category.trim()) return;

      onAdd({
        ...formData,
        deadline: formData.deadline || undefined,
        dailyGoal: formData.dailyGoal || undefined,
        githubUrl: formData.githubUrl || undefined,
        demoUrl: formData.demoUrl || undefined,
        showcaseDescription: formData.showcaseDescription || undefined,
        showcaseFeatures:
          formData.showcaseFeatures.filter((f) => f.trim()).length > 0
            ? formData.showcaseFeatures.filter((f) => f.trim())
            : undefined,
        showcaseImage: formData.showcaseImage || undefined,
      });

      // Reset form after successful submission
      setFormData({
        ...initialFormData,
        startDate: new Date().toISOString().split("T")[0],
      });
    };

    const addFeature = () => {
      setFormData((prev) => ({
        ...prev,
        showcaseFeatures: [...prev.showcaseFeatures, ""],
      }));
    };

    const removeFeature = (index: number) => {
      setFormData((prev) => ({
        ...prev,
        showcaseFeatures: prev.showcaseFeatures.filter((_, i) => i !== index),
      }));
    };

    const updateFeature = (index: number, value: string) => {
      setFormData((prev) => ({
        ...prev,
        showcaseFeatures: prev.showcaseFeatures.map((feature, i) =>
          i === index ? value : feature
        ),
      }));
    };

    return (
      <Card ref={cardRef} className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Add New Project</CardTitle>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Project Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="e.g., React Todo App"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Brief description of your project"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) =>
                      setFormData((prev) => ({ ...prev, status: value }))
                    }
                  >
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline (Optional)</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        deadline: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dailyGoal">Daily Goal (Optional)</Label>
                <Input
                  id="dailyGoal"
                  value={formData.dailyGoal}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dailyGoal: e.target.value,
                    }))
                  }
                  placeholder="e.g., 2 hours coding, 5 commits"
                />
              </div>
            </div>

            <Separator />

            {/* Portfolio Showcase Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-2 py-1">
                  Portfolio Showcase
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Customize how this project appears in your portfolio
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="githubUrl"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    GitHub URL
                  </Label>
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        githubUrl: e.target.value,
                      }))
                    }
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="demoUrl" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Demo URL
                  </Label>
                  <Input
                    id="demoUrl"
                    value={formData.demoUrl}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        demoUrl: e.target.value,
                      }))
                    }
                    placeholder="https://your-demo.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="showcaseDescription">
                  Showcase Description
                </Label>
                <Textarea
                  id="showcaseDescription"
                  value={formData.showcaseDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      showcaseDescription: e.target.value,
                    }))
                  }
                  placeholder="Detailed description for your portfolio showcase"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
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
                  {formData.showcaseFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                      />
                      {formData.showcaseFeatures.length > 1 && (
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

              <div className="space-y-2">
                <FileUpload
                  id="showcaseImage"
                  label="Showcase Image URL (Optional)"
                  value={formData.showcaseImage}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      showcaseImage: value || "",
                    }))
                  }
                  placeholder="Upload an image or enter a URL"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" className="flex-1">
                Add Project
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
);

AddProject.displayName = "AddProject";
