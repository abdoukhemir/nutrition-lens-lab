import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { ImageUploader } from "@/components/ImageUploader";
import { NutritionResults } from "@/components/NutritionResults";
import { FeatureHighlights } from "@/components/FeatureHighlights";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Apple, Salad, Zap } from "lucide-react";
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

      const response = await fetch("https://custom-n8n-i2df.onrender.com/webhook-test/mealai", {
        method: "POST",
        body: formData,
        signal: AbortSignal.timeout(120000),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze image");
      }

      const result = await response.json();
      
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
    <div className="min-h-screen">
      <Header />
      
      <main className="container px-4">
        {/* Hero Section */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary text-sm font-semibold mb-6 animate-fade-in shadow-soft">
              <Zap className="w-4 h-4" />
              AI-Powered Nutrition Analysis
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-5 leading-tight animate-fade-in" style={{ animationDelay: "100ms" }}>
              Know exactly what's
              <br />
              <span className="text-gradient">on your plate</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
              Snap a photo of any meal and get instant calorie & macro breakdown. 
              No more guessing, no more logging.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <span className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-soft">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Works with any food
              </span>
              <span className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-soft">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Results in seconds
              </span>
              <span className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-soft">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                100% free
              </span>
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section className="pb-10 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="max-w-xl mx-auto">
            <ImageUploader
              onImageSelect={handleImageSelect}
              isAnalyzing={isAnalyzing}
              selectedImage={selectedImage}
              onClear={handleClear}
            />
          </div>
        </section>

        {/* Analyze CTA */}
        {selectedImage && !nutritionData && !isAnalyzing && (
          <section className="flex justify-center pb-10 animate-scale-in">
            <Button
              variant="hero"
              size="xl"
              onClick={handleAnalyze}
              className="gap-3"
            >
              <Sparkles className="w-5 h-5" />
              Analyze My Meal
              <ArrowRight className="w-5 h-5" />
            </Button>
          </section>
        )}

        {/* Results Section */}
        {nutritionData && (
          <section className="pb-12">
            <NutritionResults data={nutritionData} />
            <div className="flex justify-center mt-8 animate-fade-in" style={{ animationDelay: "400ms" }}>
              <Button variant="subtle" size="lg" onClick={handleClear} className="gap-2">
                Analyze Another Meal
              </Button>
            </div>
          </section>
        )}

        {/* Features Section */}
        {!selectedImage && <FeatureHighlights />}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border mt-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Hill Calories AI · Eat smarter, live better
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Apple className="w-4 h-4 text-primary" />
              <span>Made with</span>
              <Salad className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
