import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, CreditCard, Truck, ChevronRight, Trash2, Plus, Minus, ArrowLeft, CheckCircle2 } from "lucide-react";
import { formatPrice } from "../utils/helpers";
import GlassCard from "../components/ui/GlassCard";
import { fadeIn, staggerContainer } from "../utils/animations";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useState } from "react";

const Order = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, clearCart, addToCartAndCheckout } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const isEmpty = cartItems.length === 0;

  const gst = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + gst;

  const steps = [
    { id: 1, name: "Cart", icon: <ShoppingBag size={14} />, active: !isOrdered },
    { id: 2, name: "Details", icon: <Truck size={14} />, active: !isOrdered },
    { id: 3, name: "Payment", icon: <CreditCard size={14} />, active: isOrdered },
  ];

  const handleCheckout = () => {
    setIsOrdered(true);
    toast.success("Order placed successfully! Your meal is being prepared with perfection.", {
      duration: 5000,
      icon: '✨',
      style: {
        borderRadius: '12px',
        background: '#0f172a',
        color: '#fff',
        border: '1px solid rgba(99,102,241,0.4)',
      },
    });
    setTimeout(() => {
      clearCart();
    }, 1500);
  };

  const recommendations = [
    { id: 901, name: "Special Truffle Aioli", price: 120, category: "Sauce", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300" },
    { id: 902, name: "Artisan Garlic Bread", price: 180, category: "Starter", image: "https://images.unsplash.com/photo-1579684947550-22e945225d9a?w=300" },
  ];

  return (
    <div className="pt-32 pb-20 bg-bg-main min-h-screen relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Progress Stepper */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-full">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-3">
                <div className={`flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest ${step.active ? "text-primary" : "text-slate-600"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step.active ? "border-primary bg-primary/10" : "border-slate-800"}`}>
                    {step.id}
                  </span>
                  {step.name}
                </div>
                {idx !== steps.length - 1 && <ChevronRight size={14} className="text-slate-800" />}
              </div>
            ))}
          </div>
        </div>

        {isOrdered ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center max-w-lg mx-auto"
          >
            <div className="w-24 h-24 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <CheckCircle2 size={50} />
            </div>
            <h2 className="text-4xl font-serif text-white mb-4">Order Confirmed!</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Your order has been received by our master kitchen. We look forward to serving you an extraordinary culinary experience.
            </p>
            <Link to="/menu">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOrdered(false)}
                className="px-8 py-4 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-xl shadow-primary/20"
              >
                Order More Delicacies
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left Column: Cart Items */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="lg:col-span-2 space-y-6"
            >
              <div className="flex justify-between items-end border-b border-white/5 pb-6">
                <h2 className="text-4xl font-serif text-white">Your Selection</h2>
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
                </span>
              </div>

              <AnimatePresence mode="popLayout">
                {isEmpty ? (
                  <motion.div 
                    variants={fadeIn("up", 0.2)}
                    className="py-20 text-center"
                  >
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5 text-slate-700">
                      <ShoppingBag size={40} />
                    </div>
                    <h3 className="text-xl text-white font-serif mb-4">Your gallery is empty</h3>
                    <p className="text-slate-500 mb-8 max-w-xs mx-auto">Click on any dish across our menu to add it directly to your order.</p>
                    <Link to="/menu">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20"
                      >
                        Explore Menu
                      </motion.button>
                    </Link>
                  </motion.div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div key={item.id} layout variants={fadeIn("up", 0.1)}>
                      <GlassCard className="p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center justify-between group border-white/5 hover:border-primary/30 transition-all">
                        <div className="flex gap-4 items-center w-full md:w-auto">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-2xl border border-white/10" 
                          />
                          <div>
                            <span className="text-[10px] text-primary font-bold uppercase tracking-widest block mb-1">
                              {item.category}
                            </span>
                            <h3 className="text-white font-serif text-xl mb-1">{item.name}</h3>
                            <p className="text-slate-400 text-xs line-clamp-1 max-w-xs">{item.description}</p>
                            {item.calories && <span className="text-primary text-[10px] font-bold mt-1 block">{item.calories}</span>}
                          </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-slate-400 hover:text-white transition-colors p-1"
                              title="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-white font-bold text-sm min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-slate-400 hover:text-white transition-colors p-1"
                              title="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Item Total Price */}
                          <div className="text-right min-w-[80px]">
                            <span className="text-white font-serif text-lg font-bold">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            {item.quantity > 1 && (
                              <span className="text-[10px] text-slate-500 block">
                                {formatPrice(item.price)} each
                              </span>
                            )}
                          </div>

                          {/* Remove Button */}
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-600 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                            title="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>

              {/* Recommended Additions */}
              <div className="mt-12 p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
                <h4 className="text-white font-serif mb-6 text-lg">Chef's Recommendations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.map((rec) => (
                    <div 
                      key={rec.id} 
                      onClick={() => addToCartAndCheckout(rec)}
                      className="flex items-center gap-4 p-3 rounded-2xl border border-white/5 bg-white/5 hover:border-primary/40 cursor-pointer group transition-all"
                    >
                      <img src={rec.image} alt={rec.name} className="w-14 h-14 object-cover rounded-xl" />
                      <div className="flex-grow">
                        <p className="text-xs text-white font-bold group-hover:text-primary transition-colors">{rec.name}</p>
                        <p className="text-xs text-primary font-serif">{formatPrice(rec.price)}</p>
                      </div>
                      <span className="text-[10px] bg-primary/20 text-primary px-3 py-1 rounded-full font-bold uppercase group-hover:bg-primary group-hover:text-white transition-all">
                        + Add
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Summary */}
            <motion.div 
              variants={fadeIn("left", 0.3)}
              initial="initial"
              animate="animate"
              className="h-fit"
            >
              <GlassCard className="p-8 space-y-8 border-primary/10">
                <div className="space-y-4">
                  <h3 className="text-white font-serif text-2xl tracking-wide">Summary</h3>
                  <div className="w-12 h-1 bg-primary rounded-full" />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 uppercase tracking-widest font-bold">Subtotal</span>
                    <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 uppercase tracking-widest font-bold">Delivery Fee</span>
                    <span className="text-emerald-500 font-bold tracking-tighter uppercase">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 uppercase tracking-widest font-bold">Taxes (5% GST)</span>
                    <span className="text-white font-medium">{formatPrice(gst)}</span>
                  </div>
                  
                  <div className="h-px bg-white/10 my-6" />
                  
                  <div className="flex justify-between items-end">
                    <span className="text-white font-serif text-lg">Total Amount</span>
                    <span className="text-3xl text-primary font-serif italic">{formatPrice(totalAmount)}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <motion.button 
                    disabled={isEmpty}
                    onClick={handleCheckout}
                    whileHover={!isEmpty ? { scale: 1.02, backgroundColor: "#6366f1" } : {}}
                    whileTap={!isEmpty ? { scale: 0.98 } : {}}
                    className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/10 ${
                      isEmpty ? "bg-white/5 text-slate-700 cursor-not-allowed" : "bg-primary text-white cursor-pointer"
                    }`}
                  >
                    Proceed to Payment <ChevronRight size={18} />
                  </motion.button>
                  
                  <p className="text-[10px] text-center text-slate-600 uppercase tracking-[0.2em] font-bold">
                    Secure 256-bit SSL Payment
                  </p>
                </div>
              </GlassCard>

              {/* Back Link */}
              <Link to="/menu" className="flex items-center justify-center gap-2 mt-8 text-slate-500 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Continue Browsing
              </Link>
            </motion.div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Order;