import { Leaf } from "lucide-react";

export function Header() {
  return (
    <header className="w-full py-3 px-4 border-b border-border/50">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg gradient-hero">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-base font-bold text-foreground">
            Hill Calories
          </span>
        </div>
        <span className="text-xs font-medium text-muted-foreground bg-accent px-2 py-1 rounded-md">
          Beta
        </span>
      </div>
    </header>
  );
}
