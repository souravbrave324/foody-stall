import { Sparkles, UtensilsCrossed } from "lucide-react";

export const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Glow halo */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-indigo-500 to-sky-400 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition duration-500" />
        
        {/* Icon container */}
        <div className="relative w-10 h-10 rounded-xl bg-slate-950 border border-white/20 flex items-center justify-center text-amber-400 shadow-xl group-hover:scale-105 transition-transform duration-300">
          <UtensilsCrossed size={19} className="transform group-hover:rotate-12 transition-transform duration-500 text-amber-400" />
          <Sparkles size={10} className="absolute top-1 right-1 text-sky-400 animate-pulse" />
        </div>
      </div>

      <div className="flex flex-col">
        <span className="font-serif font-black text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors flex items-center gap-1">
          FOODY<span className="text-amber-400 italic font-serif">STALL</span>
        </span>
        <span className="text-[8px] uppercase tracking-[0.3em] text-slate-400 font-bold -mt-1">
          Gourmet Sanctuary
        </span>
      </div>
    </div>
  );
};

export default Logo;
