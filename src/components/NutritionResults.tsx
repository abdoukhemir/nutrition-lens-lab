import { Flame, Beef, Wheat, Droplets, Check } from "lucide-react";
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

      {/* Food Items Detected - Detailed */}
      <div className="bg-card rounded-xl p-4 shadow-soft border border-border animate-fade-in" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Detected Foods
        </h3>
        <div className="space-y-2">
          {data.food.map((item, index) => (
            <div 
              key={index}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <div className="flex-1">
                <span className="text-sm font-medium text-foreground">{item.name}</span>
                <span className="text-xs text-muted-foreground ml-2">({item.quantity})</span>
              </div>
              <span className="text-sm font-semibold text-secondary">{item.calories} kcal</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total Macro Grid */}
      <div className="grid grid-cols-2 gap-3">
        {macroConfig.map((macro, index) => {
          const Icon = macro.icon;
          const value = data.total[macro.key];
          
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
                {typeof value === 'number' ? value.toFixed(1) : value}
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
