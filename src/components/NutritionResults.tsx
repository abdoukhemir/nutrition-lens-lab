import { Flame, Beef, Wheat, Droplets, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface NutritionResultsProps {
  data: NutritionData | null;
}

const macroConfig = [
  { 
    key: "calories" as const, 
    label: "Calories", 
    unit: "kcal", 
    icon: Flame, 
    gradient: "gradient-orange",
    textColor: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  { 
    key: "protein" as const, 
    label: "Protein", 
    unit: "g", 
    icon: Beef, 
    gradient: "gradient-hero",
    textColor: "text-primary",
    bgColor: "bg-primary/10",
  },
  { 
    key: "carbs" as const, 
    label: "Carbs", 
    unit: "g", 
    icon: Wheat, 
    gradient: "bg-highlight",
    textColor: "text-highlight-foreground",
    bgColor: "bg-highlight/10",
  },
  { 
    key: "fat" as const, 
    label: "Fat", 
    unit: "g", 
    icon: Droplets, 
    gradient: "bg-muted",
    textColor: "text-foreground",
    bgColor: "bg-muted",
  },
];

export function NutritionResults({ data }: NutritionResultsProps) {
  if (!data) return null;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Success Header */}
      <div className="flex items-center justify-center gap-3 animate-scale-in">
        <div className="p-2.5 rounded-2xl gradient-hero shadow-glow">
          <Check className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Analysis Complete</h2>
          <p className="text-xs text-muted-foreground">Found {data.food.length} items in your meal</p>
        </div>
      </div>

      {/* Total Macro Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in" style={{ animationDelay: "100ms" }}>
        {macroConfig.map((macro, index) => {
          const Icon = macro.icon;
          const value = data.total[macro.key];
          
          return (
            <div
              key={macro.key}
              className="bg-card rounded-2xl p-4 shadow-soft border border-border hover:shadow-card transition-all duration-200"
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", macro.gradient)}>
                <Icon className={cn("w-5 h-5", macro.key === "calories" || macro.key === "protein" ? "text-primary-foreground" : macro.textColor)} />
              </div>
              <p className="text-2xl font-extrabold text-foreground tabular-nums">
                {typeof value === 'number' ? Math.round(value) : value}
                <span className="text-xs font-medium text-muted-foreground ml-1">
                  {macro.unit}
                </span>
              </p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">{macro.label}</p>
            </div>
          );
        })}
      </div>

      {/* Food Items Breakdown */}
      <div className="bg-card rounded-3xl p-5 shadow-soft border border-border animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">
            Detected Foods
          </h3>
        </div>
        <div className="space-y-2">
          {data.food.map((item, index) => (
            <div 
              key={index}
              className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.quantity}</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="font-bold text-secondary">{item.calories} kcal</span>
                <div className="hidden sm:flex items-center gap-3 text-muted-foreground">
                  <span>P: {item.protein}g</span>
                  <span>C: {item.carbs}g</span>
                  <span>F: {item.fat}g</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center text-muted-foreground px-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
        * AI estimates may vary ±15% from actual nutritional values
      </p>
    </div>
  );
}
