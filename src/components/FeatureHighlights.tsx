import { Camera, Brain, Zap, Shield, Sparkles, Target } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Snap Any Meal",
    description: "Works with any food photo – homemade, restaurant, or packaged.",
    gradient: "gradient-hero",
    iconColor: "text-primary-foreground",
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced vision AI identifies ingredients and portions instantly.",
    gradient: "bg-accent",
    iconColor: "text-primary",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get complete nutrition breakdown in under 3 seconds.",
    gradient: "gradient-orange",
    iconColor: "text-secondary-foreground",
  },
  {
    icon: Shield,
    title: "100% Private",
    description: "Your photos are analyzed and immediately deleted. No data stored.",
    gradient: "bg-muted",
    iconColor: "text-foreground",
  },
];

export function FeatureHighlights() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            How It Works
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">
            Nutrition tracking made <span className="text-gradient">effortless</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Stop guessing calories. Let AI do the heavy lifting while you focus on eating well.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                {/* Decorative blob */}
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors" />
                
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl ${feature.gradient} flex items-center justify-center mb-4 shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "600ms" }}>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <span>95% accuracy</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-border" />
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-secondary" />
            <span>Under 3 seconds</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-border" />
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>No signup required</span>
          </div>
        </div>
      </div>
    </section>
  );
}
