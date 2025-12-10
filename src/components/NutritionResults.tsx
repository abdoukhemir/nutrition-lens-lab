import { Flame, Beef, Wheat, Droplets, Check } from "lucide-react";
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
    bgColor: "bg-secondary/15",
    ringColor: "ring-secondary/30"
  },
  { 
    key: "protein" as const, 
    label: "Protein", 
    unit: "g", 
    icon: Beef, 
    color: "text-primary",
    bgColor: "bg-primary/15",
    ringColor: "ring-primary/30"
  },
  { 
    key: "carbs" as const, 
    label: "Carbs", 
    unit: "g", 
    icon: Wheat, 
    color: "text-amber-600",
    bgColor: "bg-amber-500/15",
    ringColor: "ring-amber-500/30"
  },
  { 
    key: "fat" as const, 
    label: "Fat", 
    unit: "g", 
    icon: Droplets, 
    color: "text-blue-600",
    bgColor: "bg-blue-500/15",
    ringColor: "ring-blue-500/30"
  },
];

export function NutritionResults({ data }: NutritionResultsProps) {
  if (!data) return null;

  return (
    <div className="w-full max-w-lg mx-auto space-y-5">
      {/* Success Header */}
      <div className="flex items-center justify-center gap-2 animate-scale-in">
        <div className="p-1.5 rounded-full bg-primary/15">
          <Check className="w-4 h-4 text-primary" />
        </div>
        <span className="text-sm font-semibold text-foreground">Analysis Complete</span>
      </div>

      {/* Food Items Detected */}
      <div className="bg-card rounded-xl p-4 shadow-soft border border-border animate-fade-in" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Detected Foods
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {data.foodItems.map((item, index) => (
            <span 
              key={index}
              className="px-2.5 py-1 bg-accent text-accent-foreground rounded-md text-xs font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Macro Grid */}
      <div className="grid grid-cols-2 gap-3">
        {macroConfig.map((macro, index) => {
          const Icon = macro.icon;
          const value = data[macro.key];
          
          return (
            <div
              key={macro.key}
              className={cn(
                "bg-card rounded-xl p-4 shadow-soft border border-border",
                "hover:shadow-card transition-all duration-200",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className={cn("p-2 rounded-lg ring-2", macro.bgColor, macro.ringColor)}>
                  <Icon className={cn("w-4 h-4", macro.color)} />
                </div>
                <span className="text-xs text-muted-foreground font-medium">{macro.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {value}
                <span className="text-xs font-medium text-muted-foreground ml-0.5">
                  {macro.unit}
                </span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-center text-muted-foreground px-4">
        *AI estimates may vary from actual nutritional values
      </p>
    </div>
  );
}
