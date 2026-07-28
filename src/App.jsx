import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";

import Lenis from "@studio-freight/lenis";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import CustomCursor from "./components/common/CustomCursor";
import ThemeToggle from "./components/common/ThemeToggle";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Accessibility from "./pages/Accessibility";

const SmoothScroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CartProvider>
          <div className="bg-bg-dark min-h-screen">
            <SmoothScroll />
            <CustomCursor />
            <ThemeToggle />

            <Toaster position="bottom-right" />

            <Navbar />

          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/order" element={<Order />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>

          <Footer />
        </div>
      </CartProvider>
    </ThemeProvider>
  </Router>
);
}

export default App;