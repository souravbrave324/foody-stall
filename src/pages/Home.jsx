import { motion } from "framer-motion";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import MenuPreview from "../components/sections/MenuPreview";
import Testimonials from "../components/sections/Testimonials";
import ReservationForm from "../components/sections/ReservationForm";
import { SplineSceneBasic } from "../components/ui/spline-demo";

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="page-transition"
    >
      <Hero />
      <About />

      {/* Interactive 3D Spline Scene Showcase */}
      <section className="py-16 bg-bg-main relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <SplineSceneBasic />
        </div>
      </section>

      <MenuPreview />
      <Testimonials />
      <ReservationForm />
    </motion.div>
  );
};

export default Home;