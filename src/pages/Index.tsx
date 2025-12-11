import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { ImageUploader } from "@/components/ImageUploader";
import { NutritionResults } from "@/components/NutritionResults";
import { FeatureHighlights } from "@/components/FeatureHighlights";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Zap } from "lucide-react";
import { toast } from "sonner";

interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionData {
  food: FoodItem[];
  total: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);

  const handleImageSelect = useCallback((file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setSelectedFile(file);
    setNutritionData(null);
  }, []);

  const handleClear = useCallback(() => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage(null);
    setSelectedFile(null);
    setNutritionData(null);
  }, [selectedImage]);

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("https://n8ninstance.abderrahmenkhemir.me/webhook/mealai", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze image");
      }

      const result = await response.json();
      
      // Handle the response format: [{ output: { status, food, total } }]
      const data = Array.isArray(result) ? result[0]?.output : result.output || result;
      
      if (data.status === "success" && data.food && data.total) {
        setNutritionData({
          food: data.food,
          total: data.total,
        });
        toast.success("Analysis complete!");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4">
        {/* Hero Section - Compact & Punchy */}
        <section className="py-8 md:py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 animate-fade-in">
              <Zap className="w-3 h-3" />
              Instant AI Analysis
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 leading-tight animate-fade-in" style={{ animationDelay: "50ms" }}>
              Snap. Analyze. <span className="text-primary">Eat Smart.</span>
            </h1>
            
            <p className="text-base text-muted-foreground max-w-md mx-auto mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
              Upload any meal photo and get accurate calorie & macro estimates in seconds.
            </p>

            {/* Value Props - Inline */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "150ms" }}>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                No calorie counting
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Works with any food
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                100% free
              </span>
            </div>
          </div>
        </section>

        {/* Upload Section - Prominent */}
        <section className="pb-8">
          <div className="max-w-lg mx-auto">
            <ImageUploader
              onImageSelect={handleImageSelect}
              isAnalyzing={isAnalyzing}
              selectedImage={selectedImage}
              onClear={handleClear}
            />
          </div>
        </section>

        {/* Analyze Button - Bold CTA */}
        {selectedImage && !nutritionData && !isAnalyzing && (
          <section className="flex justify-center pb-8 animate-scale-in">
            <Button
              variant="hero"
              size="lg"
              onClick={handleAnalyze}
              className="gap-2 min-w-[200px]"
            >
              <Sparkles className="w-5 h-5" />
              Analyze Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </section>
        )}

        {/* Results Section */}
        {nutritionData && (
          <section className="pb-8">
            <NutritionResults data={nutritionData} />
            <div className="flex justify-center mt-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
              <Button variant="secondary" size="lg" onClick={handleClear} className="gap-2">
                Analyze Another Meal
              </Button>
            </div>
          </section>
        )}

        {/* Features Section - Visual Interest */}
        {!selectedImage && <FeatureHighlights />}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border mt-8">
        <div className="container text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 Hill Calories AI · Built for healthier eating
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
