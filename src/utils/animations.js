export const fadeIn = (direction = "up", delay = 0) => {
  return {
    initial: {
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
      opacity: 0,
    },
    animate: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.65,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const scaleUp = (delay = 0) => {
  return {
    initial: { scale: 0.95, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};