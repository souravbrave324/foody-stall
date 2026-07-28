import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { fadeIn, staggerContainer } from "../../utils/animations";
import { ArrowRight, MessageSquare, UtensilsCrossed, ChevronRight, Sparkles, X, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import GlassCard from "../ui/GlassCard";
import { formatPrice } from "../../utils/helpers";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b", // Cocktail/Atmosphere
  "https://images.unsplash.com/photo-1559339352-11d035aa65de", // Fine Dining Dish
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0", // Restaurant Interior
];

const chefsSpecialDish = {
  id: 999,
  name: "Wild Glazed Salmon",
  category: "Chef's Special",
  price: 420,
  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  description: "Served with Truffle Mash",
  calories: "480 kcal",
  tags: ["Chef's Special"]
};

const MUST_TRY_SUGGESTIONS = [
  {
    id: 999,
    name: "Wild Glazed Salmon",
    category: "Chef's Special",
    price: 420,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    description: "Served with Truffle Mash & microgreens.",
    calories: "480 kcal",
    badge: "CHEF'S SPECIAL"
  },
  {
    id: 401,
    name: "Truffle Mushroom Risotto",
    category: "Dinner",
    price: 850,
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600",
    description: "Creamy arborio risotto with wild forest mushrooms.",
    calories: "450 kcal",
    badge: "CHEF'S RECOMMENDATION"
  },
  {
    id: 303,
    name: "Tiramisu",
    category: "Sweets",
    price: 520,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600",
    description: "Espresso-soaked ladyfingers with rich mascarpone.",
    calories: "480 kcal",
    badge: "DESSERT"
  },
  {
    id: 506,
    name: "Earl Grey Tea",
    category: "Drinks",
    price: 180,
    image: "https://the-tea-embassy.de/wp-content/uploads/2025/05/earl-grey-k-b-a-300x300.jpg",
    description: "Bergamot infused premium black tea.",
    calories: "0 kcal",
    badge: "TEA SELECTION"
  }
];

const Hero = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const [showMustTryModal, setShowMustTryModal] = useState(false);
  const { addToCartAndCheckout, addMultipleToCartAndCheckout } = useCart();

  // Automatic Background Switcher
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const totalMustTryPrice = MUST_TRY_SUGGESTIONS.reduce((sum, item) => sum + item.price, 0);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-bg-main">
      
      {/* Dynamic Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImg}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-bg-main/80 via-bg-main/40 to-bg-main z-10" />
            <img 
              src={HERO_IMAGES[currentImg]} 
              className="w-full h-full object-cover"
              alt="CafeNova Ambiance"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-6 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
        
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            variants={fadeIn("down", 0.2)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest mb-8 mx-auto lg:mx-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            NOW OPEN IN SECTOR 62, NOIDA
          </motion.div>

          <motion.h1 
            variants={fadeIn("up", 0.4)}
            className="text-6xl md:text-8xl font-serif text-white mb-6 leading-[1.05]"
          >
            Taste the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-300 italic">Future</span> <br /> 
            of Fine Dining.
          </motion.h1>

          <motion.p 
            variants={fadeIn("up", 0.6)}
            className="text-lg text-slate-400 max-w-xl mb-12 mx-auto lg:mx-0 leading-relaxed"
          >
            Experience a symphony of molecular gastronomy and traditional flavors. 
            Designed for the modern palate, crafted for the soul.
          </motion.p>

          {/* Button Grid - 4 Buttons Total */}
          <motion.div 
            variants={fadeIn("up", 0.8)}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            {/* CTA 1: Must Try */}
            <button 
              onClick={() => setShowMustTryModal(true)}
              className="group relative px-8 py-4 bg-primary rounded-2xl font-bold text-white overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(99,102,241,0.4)] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <UtensilsCrossed size={18} /> Must Try <Sparkles size={16} className="text-amber-300 group-hover:rotate-12 transition-transform" />
              </span>
            </button>

            {/* CTA 2: Contact */}
            <Link to="/contact" className="group px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl font-bold text-white transition-all hover:bg-white/10 hover:border-primary/50 flex items-center gap-2">
              <MessageSquare size={18} /> Contact Us
            </Link>

            {/* Secondary Rows */}
            <div className="w-full flex gap-6 justify-center lg:justify-start mt-4 pt-6 border-t border-white/5">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-white font-serif text-xl font-bold italic">4.9/5</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Google Rating</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-white font-serif text-xl font-bold italic">Michelin</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Inspired Menu</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Decorative Side Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden lg:block relative cursor-pointer"
          onClick={() => addToCartAndCheckout(chefsSpecialDish)}
        >
          <div className="glass-indigo p-8 rounded-[2.5rem] border border-white/10 relative z-20 hover:border-primary/50 transition-all duration-300 group">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-serif text-2xl italic">Chef's Special</h3>
              <span className="text-[10px] bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider group-hover:bg-primary group-hover:text-white transition-all">Order Now</span>
            </div>
            <div className="relative overflow-hidden rounded-2xl mb-6">
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c" 
                className="w-full h-64 object-cover grayscale hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                alt="Salmon Special"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg transform group-hover:scale-105 transition-transform">Click to Order</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-bold group-hover:text-primary transition-colors">Wild Glazed Salmon</p>
                <p className="text-primary text-sm">Served with Truffle Mash</p>
              </div>
              <span className="text-white font-serif text-2xl">₹420</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Must Try Recommendations Modal */}
      <AnimatePresence>
        {showMustTryModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 max-w-3xl w-full relative shadow-2xl space-y-6"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowMustTryModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div className="text-center max-w-md mx-auto space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-widest">
                  <Sparkles size={12} /> Chef's Signature Selections
                </div>
                <h3 className="text-3xl font-serif text-white">Must-Try Recommendations</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Our head chef's highly recommended pairings for an exceptional dining experience.
                </p>
              </div>

              {/* Suggestions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MUST_TRY_SUGGESTIONS.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      setShowMustTryModal(false);
                      addToCartAndCheckout(item);
                    }}
                    className="p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/40 cursor-pointer transition-all flex gap-4 items-center group relative"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-xl border border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform" 
                    />
                    <div className="flex-grow min-w-0">
                      <span className="text-[9px] bg-primary/20 text-primary px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider block w-fit mb-1">
                        {item.badge}
                      </span>
                      <h4 className="text-white font-bold text-sm truncate group-hover:text-primary transition-colors">{item.name}</h4>
                      <p className="text-slate-400 text-[11px] line-clamp-1 mb-1">{item.description}</p>
                      <span className="text-primary font-serif font-bold text-sm">{formatPrice(item.price)}</span>
                    </div>
                    <span className="bg-primary/10 text-primary p-2 rounded-full group-hover:bg-primary group-hover:text-white transition-all flex-shrink-0">
                      <ShoppingBag size={14} />
                    </span>
                  </div>
                ))}
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Full Must-Try Tasting Bundle</p>
                  <p className="text-xl font-serif text-white font-bold">{formatPrice(totalMustTryPrice)} <span className="text-xs text-slate-500 font-sans font-normal">(4 Items)</span></p>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setShowMustTryModal(false);
                    addMultipleToCartAndCheckout(MUST_TRY_SUGGESTIONS);
                  }}
                  className="w-full md:w-auto px-8 py-4 bg-primary text-white font-bold rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer hover:bg-indigo-500 transition-colors"
                >
                  <ShoppingBag size={16} /> Order All Must-Try Items
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Elegant Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 12, 0] }} 
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/20 uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;