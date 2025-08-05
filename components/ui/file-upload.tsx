import * as React from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "./button";
import { Label } from "./label";
import { cn } from "./utils";

interface FileUploadProps {
  id?: string;
  label?: string;
  value?: string;
  onChange: (value: string | undefined) => void;
  accept?: string;
  className?: string;
  placeholder?: string;
}

export function FileUpload({
  id,
  label,
  value,
  onChange,
  accept = "image/*",
  className,
  placeholder = "Upload an image or enter a URL"
}: FileUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = React.useState(false);

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value || undefined);
  };

  const clearImage = () => {
    onChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      
      <div className="space-y-3">
        {/* File Upload Area */}
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-4 text-center transition-colors",
            dragActive 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50",
            value && "border-green-500 bg-green-50/50"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileInputChange}
            className="hidden"
            id={`${id}-file`}
          />
          
          {value ? (
            <div className="space-y-3">
              <div className="relative inline-block">
                <img 
                  src={value} 
                  alt="Preview" 
                  className="max-h-32 rounded-lg border"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearImage}
                  className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 text-white hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Image uploaded successfully
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  Drop an image here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports JPG, PNG, GIF up to 5MB
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2"
              >
                Choose File
              </Button>
            </div>
          )}
        </div>

        {/* URL Input */}
        <div className="space-y-2">
          <Label htmlFor={`${id}-url`} className="text-sm">
            Or enter image URL
          </Label>
          <div className="flex gap-2">
            <input
              id={`${id}-url`}
              type="url"
              placeholder="https://example.com/image.png"
              value={value?.startsWith('data:') ? '' : (value || '')}
              onChange={handleUrlChange}
              className="flex-1 px-3 py-2 text-sm border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {value && !value.startsWith('data:') && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearImage}
                className="px-2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 