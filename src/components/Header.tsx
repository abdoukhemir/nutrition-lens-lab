import { Leaf } from "lucide-react";

export function Header() {
  return (
    <header className="w-full py-4 px-4">
      <div className="container flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl gradient-hero">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Hill Calories
          </span>
        </div>
      </div>
    </header>
  );
}
