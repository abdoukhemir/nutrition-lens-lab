import { Flame, Beef, Wheat, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  foodItems: string[];
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
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  { 
    key: "protein" as const, 
    label: "Protein", 
    unit: "g", 
    icon: Beef, 
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  { 
    key: "carbs" as const, 
    label: "Carbs", 
    unit: "g", 
    icon: Wheat, 
    color: "text-amber-500",
    bgColor: "bg-amber-500/10"
  },
  { 
    key: "fat" as const, 
    label: "Fat", 
    unit: "g", 
    icon: Droplets, 
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
];

export function NutritionResults({ data }: NutritionResultsProps) {
  if (!data) return null;

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
      {/* Food Items Detected */}
      <div className="bg-card rounded-2xl p-5 shadow-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Detected Foods
        </h3>
        <div className="flex flex-wrap gap-2">
          {data.foodItems.map((item, index) => (
            <span 
              key={index}
              className="px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-sm font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Macro Grid */}
      <div className="grid grid-cols-2 gap-4">
        {macroConfig.map((macro, index) => {
          const Icon = macro.icon;
          const value = data[macro.key];
          
          return (
            <div
              key={macro.key}
              className={cn(
                "bg-card rounded-2xl p-5 shadow-card transition-transform hover:scale-[1.02]",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn("p-2.5 rounded-xl w-fit mb-3", macro.bgColor)}>
                <Icon className={cn("w-5 h-5", macro.color)} />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {value}
                <span className="text-sm font-medium text-muted-foreground ml-1">
                  {macro.unit}
                </span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">{macro.label}</p>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center text-muted-foreground px-4">
        *Estimates based on AI analysis. Actual values may vary.
      </p>
    </div>
  );
}
