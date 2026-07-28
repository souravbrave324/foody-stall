import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sunrise, Sun, Moon, Zap, Check, Sparkles } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const THEME_OPTIONS = [
  {
    id: "auto",
    label: "Auto (Sync with Time)",
    sub: "Switches morning, afternoon & night automatically",
    icon: Zap,
    color: "text-amber-400",
  },
  {
    id: "morning",
    label: "Peaceful Morning",
    sub: "High-contrast golden sunrise & crisp espresso text",
    icon: Sunrise,
    color: "text-amber-600",
  },
  {
    id: "afternoon",
    label: "Wholesome Afternoon",
    sub: "Warm copper, terracotta & cozy bistro ambiance",
    icon: Sun,
    color: "text-orange-500",
  },
  {
    id: "night",
    label: "Elegant Moonlight Night",
    sub: "Luxurious light blue sky & moonlight celestial glow",
    icon: Moon,
    color: "text-sky-400",
  },
];

const ThemeToggle = () => {
  const { themeMode, setThemeMode, effectiveTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getActiveIcon = () => {
    if (themeMode === "auto") {
      if (effectiveTheme === "morning") return <Sunrise size={18} className="text-amber-400" />;
      if (effectiveTheme === "afternoon") return <Sun size={18} className="text-orange-400" />;
      return <Moon size={18} className="text-indigo-400" />;
    }
    if (themeMode === "morning") return <Sunrise size={18} className="text-amber-500" />;
    if (themeMode === "afternoon") return <Sun size={18} className="text-orange-400" />;
    return <Moon size={18} className="text-indigo-400" />;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={menuRef}>
      {/* Floating Main Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white border border-white/20 shadow-2xl backdrop-blur-xl flex items-center gap-3 cursor-pointer group transition-all"
      >
        <div className="p-1 rounded-full bg-white/10">{getActiveIcon()}</div>
        <div className="flex flex-col text-left">
          <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1">
            {themeMode === "auto" && <Zap size={10} className="text-amber-400" />} Theme
          </span>
          <span className="text-xs font-bold capitalize text-white group-hover:text-primary transition-colors">
            {themeMode === "auto" ? `Auto (${effectiveTheme})` : themeMode}
          </span>
        </div>
      </motion.button>

      {/* Popover Selection Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-80 bg-slate-950/95 border border-white/15 rounded-3xl p-4 shadow-2xl backdrop-blur-2xl space-y-2 z-50"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Sparkles size={14} className="text-primary" /> Select Atmosphere
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {themeMode === "auto" ? "Time Sync Active" : "Custom Set"}
              </span>
            </div>

            {THEME_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isSelected = themeMode === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setThemeMode(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full p-3 rounded-2xl text-left flex items-start gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary/20 border border-primary/40 text-white shadow-lg"
                      : "hover:bg-white/5 border border-transparent text-slate-300"
                  }`}
                >
                  <div className={`p-2 rounded-xl bg-white/5 mt-0.5 ${opt.color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white">{opt.label}</span>
                      {isSelected && <Check size={14} className="text-primary" />}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{opt.sub}</p>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;