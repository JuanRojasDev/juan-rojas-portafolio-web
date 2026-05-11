// ─── Motion System — 2026 AI-Native Portfolio ───
// Inspired by Linear / Vercel motion design language

// ─── Easing curves ───
export const easings = {
  spring: [0.34, 1.56, 0.64, 1],
  smooth: [0.4, 0, 0.2, 1],
  out: [0, 0, 0.2, 1],
  in: [0.4, 0, 1, 1],
  inOut: [0.4, 0, 0.6, 1],
};

// ─── Shared transition presets ───
export const transitions = {
  fast: { duration: 0.15, ease: easings.smooth },
  base: { duration: 0.25, ease: easings.smooth },
  slow: { duration: 0.4, ease: easings.out },
  spring: { type: "spring", stiffness: 300, damping: 30 },
  springBouncy: { type: "spring", stiffness: 400, damping: 20 },
  springGentle: { type: "spring", stiffness: 200, damping: 40 },
};

// ─── Hero animations ───
export const headContainerAnimation = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.6, ease: easings.out },
};

export const headTextAnimation = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.5, ease: easings.out, delay: 0.1 },
};

export const headContentAnimation = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.5, ease: easings.out, delay: 0.2 },
};

// ─── Fade up (section reveals) ───
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easings.out, delay },
  }),
};

// ─── Fade in ───
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: easings.smooth, delay },
  }),
};

// ─── Scale in ───
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easings.spring, delay },
  }),
};

// ─── Slide in from left ───
export const slideLeftVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easings.out, delay },
  }),
};

// ─── Slide in from right ───
export const slideRightVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easings.out, delay },
  }),
};

// ─── Stagger container ───
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// ─── Stagger item ───
export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easings.out },
  },
};

// ─── Card hover ───
export const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: transitions.spring,
  },
};

// ─── Glow pulse ───
export const glowPulseVariants = {
  initial: { opacity: 0.3 },
  animate: {
    opacity: [0.3, 0.7, 0.3],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ─── Floating animation ───
export const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ─── Typewriter cursor ───
export const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1],
    },
  },
};

// ─── Section title reveal ───
export const titleRevealVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easings.out },
  },
};

// ─── Magnetic button ───
export const magneticVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: transitions.spring,
  },
  tap: {
    scale: 0.97,
    transition: transitions.fast,
  },
};
