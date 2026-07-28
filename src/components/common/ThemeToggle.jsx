import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sunrise, Sun, Moon, Zap, Check, Sparkles } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const THEME_OPTIONS = [
  {
    id: "auto",
    label: "Auto",
    sub: "Syncs Morning, Day & Night automatically with time",
    icon: Zap,
    color: "text-amber-400",
  },
  {
    id: "morning",
    label: "Morning",
    sub: "Golden sunrise light & crisp espresso atmosphere",
    icon: Sunrise,
    color: "text-amber-400",
  },
  {
    id: "afternoon",
    label: "Day",
    sub: "Warm copper, terracotta & cozy bistro atmosphere",
    icon: Sun,
    color: "text-orange-400",
  },
  {
    id: "night",
    label: "Night",
    sub: "Luxurious light blue sky & moonlight atmosphere",
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
      return <Moon size={18} className="text-sky-400" />;
    }
    if (themeMode === "morning") return <Sunrise size={18} className="text-amber-400" />;
    if (themeMode === "afternoon") return <Sun size={18} className="text-orange-400" />;
    return <Moon size={18} className="text-sky-400" />;
  };

  const getDisplayThemeName = () => {
    if (themeMode === "auto") {
      const activeName = effectiveTheme === "afternoon" ? "Day" : effectiveTheme === "morning" ? "Morning" : "Night";
      return `Auto (${activeName})`;
    }
    if (themeMode === "afternoon") return "Day";
    if (themeMode === "morning") return "Morning";
    return "Night";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={menuRef}>
      {/* Floating Main Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 rounded-full bg-slate-950/70 hover:bg-slate-900/90 text-white border border-white/25 shadow-2xl backdrop-blur-2xl flex items-center gap-3 cursor-pointer group transition-all"
      >
        <div className="p-1.5 rounded-full bg-white/10">{getActiveIcon()}</div>
        <div className="flex flex-col text-left">
          <span className="text-[9px] uppercase tracking-widest text-slate-300 font-bold flex items-center gap-1">
            {themeMode === "auto" && <Zap size={10} className="text-amber-400" />} Theme
          </span>
          <span className="text-xs font-extrabold capitalize text-white group-hover:text-primary transition-colors">
            {getDisplayThemeName()}
          </span>
        </div>
      </motion.button>

      {/* Transparent Glassmorphic Popover Selection Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-80 bg-slate-950/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-4 shadow-2xl space-y-2 z-50 theme-toggle-panel"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/15 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider !text-white flex items-center gap-2">
                <Sparkles size={14} className="text-primary" /> Select Atmosphere
              </span>
              <span className="text-[10px] !text-slate-300 font-mono">
                {themeMode === "auto" ? "Time Sync" : "Manual"}
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
                      ? "bg-white/20 border border-white/40 shadow-lg backdrop-blur-md"
                      : "bg-white/5 hover:bg-white/15 border border-white/10 backdrop-blur-md"
                  }`}
                >
                  <div className={`p-2 rounded-xl bg-white/10 mt-0.5 ${opt.color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black !text-white tracking-wide">{opt.label}</span>
                      {isSelected && <Check size={14} className="text-emerald-400" />}
                    </div>
                    <p className="text-[10px] !text-slate-200 mt-0.5 leading-tight font-medium">{opt.sub}</p>
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