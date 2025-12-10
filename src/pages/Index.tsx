import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { ImageUploader } from "@/components/ImageUploader";
import { NutritionResults } from "@/components/NutritionResults";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  foodItems: string[];
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
      // Convert file to base64
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(selectedFile);
      });

      // TODO: Replace with actual API call to edge function
      // For now, simulate analysis with mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response - this will be replaced with actual AI analysis
      const mockData: NutritionData = {
        calories: 485,
        protein: 32,
        carbs: 45,
        fat: 18,
        foodItems: ["Grilled Chicken", "Brown Rice", "Steamed Broccoli", "Olive Oil"],
      };
      
      setNutritionData(mockData);
      toast.success("Analysis complete!");
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
      
      <main className="container py-8 px-4">
        {/* Hero Section */}
        <section className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Nutrition Analysis
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            Know What You Eat
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Snap a photo of your meal and get instant macro breakdowns powered by AI.
          </p>
        </section>

        {/* Upload Section */}
        <section className="mb-8">
          <ImageUploader
            onImageSelect={handleImageSelect}
            isAnalyzing={isAnalyzing}
            selectedImage={selectedImage}
            onClear={handleClear}
          />
        </section>

        {/* Analyze Button */}
        {selectedImage && !nutritionData && !isAnalyzing && (
          <section className="flex justify-center mb-8 animate-fade-in">
            <Button
              variant="hero"
              size="lg"
              onClick={handleAnalyze}
              className="gap-2"
            >
              Analyze Meal
              <ArrowRight className="w-5 h-5" />
            </Button>
          </section>
        )}

        {/* Results Section */}
        <section className="mb-12">
          <NutritionResults data={nutritionData} />
        </section>

        {/* Try Again */}
        {nutritionData && (
          <section className="flex justify-center animate-fade-in">
            <Button variant="outline" onClick={handleClear}>
              Analyze Another Meal
            </Button>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-sm text-muted-foreground">
          © 2024 Hill Calories AI. Eat smarter.
        </p>
      </footer>
    </div>
  );
};

export default Index;
