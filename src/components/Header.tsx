import { Leaf, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="w-full py-4 px-4 backdrop-blur-sm bg-card/80 sticky top-0 z-50 border-b border-border/50">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2.5 rounded-2xl gradient-hero shadow-glow">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-secondary animate-bounce-soft" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-foreground tracking-tight">
              Hill Calories
            </span>
            <span className="text-[10px] font-medium text-muted-foreground -mt-0.5">
              AI Nutrition Analysis
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full">
            <Sparkles className="w-3 h-3" />
            Free to use
          </span>
        </div>
      </div>
    </header>
  );
}
