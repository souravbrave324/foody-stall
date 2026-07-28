import { motion } from "framer-motion";

const GlassCard = ({ children, className = "", onClick, ...rest }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -10 }}
      className={`glass-card p-6 rounded-2xl transition-all duration-300 ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;