import { useState, useRef, useCallback } from "react";
import { Upload, Camera, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isAnalyzing: boolean;
  selectedImage: string | null;
  onClear: () => void;
}

export function ImageUploader({ onImageSelect, isAnalyzing, selectedImage, onClear }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  if (selectedImage) {
    return (
      <div className="relative w-full max-w-md mx-auto animate-scale-in">
        <div className="relative rounded-2xl overflow-hidden shadow-card">
          <img 
            src={selectedImage} 
            alt="Selected meal" 
            className="w-full h-64 object-cover"
          />
          {isAnalyzing && (
            <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-10 h-10 text-primary-foreground animate-spin-slow" />
                <span className="text-primary-foreground font-semibold">Analyzing your meal...</span>
              </div>
            </div>
          )}
          {!isAnalyzing && (
            <button
              onClick={onClear}
              className="absolute top-3 right-3 p-2 rounded-full bg-card/90 backdrop-blur-sm hover:bg-card transition-colors shadow-soft"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer",
          isDragging 
            ? "border-primary bg-accent scale-[1.02]" 
            : "border-border hover:border-primary/50 hover:bg-accent/50"
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-full bg-accent">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground mb-1">
              Drop your meal photo here
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse
            </p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          variant="outline"
          onClick={() => cameraInputRef.current?.click()}
          className="gap-2"
        >
          <Camera className="w-4 h-4" />
          Take a Photo
        </Button>
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}
