import { useState, useRef, useCallback } from "react";
import { Upload, Camera, X, Loader2, ImagePlus } from "lucide-react";
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
      <div className="relative w-full animate-scale-in">
        <div className="relative rounded-2xl overflow-hidden shadow-card border border-border">
          <img 
            src={selectedImage} 
            alt="Selected meal" 
            className="w-full h-56 md:h-64 object-cover"
          />
          {isAnalyzing && (
            <div className="absolute inset-0 bg-foreground/70 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                </div>
                <span className="text-primary-foreground font-semibold text-sm">Analyzing your meal...</span>
              </div>
            </div>
          )}
          {!isAnalyzing && (
            <button
              onClick={onClear}
              className="absolute top-3 right-3 p-2 rounded-full bg-card/95 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground transition-colors shadow-soft"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-6 transition-all duration-300 cursor-pointer group",
          isDragging 
            ? "border-primary bg-primary/5 scale-[1.01]" 
            : "border-border hover:border-primary/50 hover:bg-accent/30"
        )}
      >
        <div className="flex flex-col items-center gap-3">
          <div className={cn(
            "p-3 rounded-xl transition-all duration-300",
            isDragging ? "bg-primary/20 scale-110" : "bg-accent group-hover:bg-primary/10"
          )}>
            <ImagePlus className={cn(
              "w-7 h-7 transition-colors",
              isDragging ? "text-primary" : "text-muted-foreground group-hover:text-primary"
            )} />
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground text-sm mb-0.5">
              {isDragging ? "Drop it here!" : "Drop your meal photo"}
            </p>
            <p className="text-xs text-muted-foreground">
              or click to browse your files
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

      {/* Camera Button - Bold & Prominent */}
      <div className="mt-4 flex justify-center">
        <Button
          variant="default"
          size="lg"
          onClick={(e) => {
            e.stopPropagation();
            cameraInputRef.current?.click();
          }}
          className="gap-2 w-full max-w-xs"
        >
          <Camera className="w-5 h-5" />
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
