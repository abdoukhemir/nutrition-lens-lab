import { Camera, Brain, Gauge, Shield } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Any Food, Any Angle",
    description: "Our AI recognizes thousands of dishes from any photo quality.",
  },
  {
    icon: Brain,
    title: "Smart Portion Detection",
    description: "Accurately estimates serving sizes without measuring.",
  },
  {
    icon: Gauge,
    title: "Instant Breakdown",
    description: "Get protein, carbs, fats & calories in under 3 seconds.",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "Photos are analyzed instantly and never stored.",
  },
];

export function FeatureHighlights() {
  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-foreground mb-2">
            Why Hill Calories?
          </h2>
          <p className="text-sm text-muted-foreground">
            The fastest way to understand what you're eating.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
