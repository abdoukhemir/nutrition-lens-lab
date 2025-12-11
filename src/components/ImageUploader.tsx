import { useState, useRef, useCallback } from "react";
import { Upload, Camera, X, Loader2, ImagePlus, Utensils } from "lucide-react";
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
        <div className="relative rounded-3xl overflow-hidden shadow-card bg-card">
          <img 
            src={selectedImage} 
            alt="Selected meal" 
            className="w-full h-72 md:h-80 object-cover"
          />
          {isAnalyzing && (
            <div className="absolute inset-0 bg-foreground/80 backdrop-blur-md flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full gradient-hero animate-pulse-glow flex items-center justify-center">
                    <Utensils className="w-7 h-7 text-primary-foreground animate-bounce-soft" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-primary-foreground font-bold text-base">Analyzing your meal...</p>
                  <p className="text-primary-foreground/70 text-sm mt-1">AI magic in progress</p>
                </div>
              </div>
            </div>
          )}
          {!isAnalyzing && (
            <button
              onClick={onClear}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-card/95 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 shadow-soft hover:shadow-card"
              aria-label="Remove image"
            >
              <X className="w-5 h-5" />
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
          "relative border-2 border-dashed rounded-3xl p-10 md:p-14 transition-all duration-300 cursor-pointer group gradient-card",
          isDragging 
            ? "border-primary bg-accent scale-[1.02] shadow-glow" 
            : "border-border hover:border-primary/60 hover:shadow-card"
        )}
      >
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-primary/5 blur-2xl" />
        <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-secondary/10 blur-xl" />
        
        <div className="relative flex flex-col items-center gap-5">
          <div className={cn(
            "p-5 rounded-3xl transition-all duration-300 shadow-soft",
            isDragging 
              ? "gradient-hero scale-110 shadow-glow" 
              : "bg-accent group-hover:gradient-hero group-hover:shadow-glow"
          )}>
            <ImagePlus className={cn(
              "w-10 h-10 transition-all duration-300",
              isDragging ? "text-primary-foreground" : "text-primary group-hover:text-primary-foreground"
            )} />
          </div>
          
          <div className="text-center">
            <p className="font-bold text-foreground text-lg mb-1.5">
              {isDragging ? "Drop it here!" : "Drop your meal photo"}
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse • JPG, PNG, HEIC
            </p>
          </div>
          
          {/* Visual hint */}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">🍕</div>
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-xs">🥗</div>
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs">🍜</div>
            </div>
            <span className="text-xs text-muted-foreground">Any food works!</span>
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

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="default"
          size="lg"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="gap-2.5 flex-1 sm:flex-initial"
        >
          <Upload className="w-5 h-5" />
          Upload Photo
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={(e) => {
            e.stopPropagation();
            cameraInputRef.current?.click();
          }}
          className="gap-2.5 flex-1 sm:flex-initial"
        >
          <Camera className="w-5 h-5" />
          Take Photo
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
