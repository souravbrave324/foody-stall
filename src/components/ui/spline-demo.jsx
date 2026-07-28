import { SplineScene } from "./splite";
import { Card } from "./Card";
import { Spotlight } from "./spotlight";
import { Sparkles, ArrowRight, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

export function SplineSceneBasic() {
  return (
    <Card className="w-full min-h-[500px] bg-slate-950/80 border border-white/15 relative overflow-hidden rounded-[2.5rem] shadow-2xl backdrop-blur-2xl">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
      />
      
      <div className="flex flex-col lg:flex-row h-full items-center">
        {/* Left content */}
        <div className="flex-1 p-8 md:p-14 relative z-10 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest w-fit">
            <Sparkles size={14} /> Interactive 3D Experience
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
            Immerse in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-300 to-amber-300 italic">
              Gastronomic Artistry
            </span>
          </h2>

          <p className="text-slate-300 max-w-lg leading-relaxed text-base">
            Interact with our live 3D culinary scene. Foody Stall combines avant-garde molecular gastronomy with digital elegance for an unforgettable dining journey.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/menu"
              className="px-7 py-3.5 bg-primary hover:bg-primary/80 text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-primary/30 transition-all cursor-pointer"
            >
              Explore Menu <ArrowRight size={14} />
            </Link>
            <Link
              to="/reservation"
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
            >
              <UtensilsCrossed size={14} /> Book a Table
            </Link>
          </div>
        </div>

        {/* Right content - Spline 3D Scene */}
        <div className="flex-1 relative w-full h-[400px] lg:h-[500px]">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
}
