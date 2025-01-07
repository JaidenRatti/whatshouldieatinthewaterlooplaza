import { motion } from 'framer-motion'

export function AnimatedGoose({ isRunning }: { isRunning: boolean }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100"
      height="100"
      animate={{
        x: isRunning ? [0, 50, 0, -50, 0] : 0,
      }}
      transition={{
        duration: 1,
        repeat: isRunning ? Infinity : 0,
        ease: "linear",
      }}
    >
      {/* Body */}
      <path
        d="M20 60 Q30 40 50 50 Q70 60 80 50 L75 70 Q60 80 40 75 Q25 72 20 60Z"
        fill="#f4f4f4"
        stroke="#000"
        strokeWidth="2"
      />
      {/* Neck */}
      <path
        d="M75 50 Q85 35 80 20 Q78 15 75 18 Q72 22 74 28 Q76 34 72 40 Q68 46 65 50"
        fill="#f4f4f4"
        stroke="#000"
        strokeWidth="2"
      />
      {/* Head */}
      <path
        d="M72 18 Q76 12 82 15 Q86 18 84 22 Q82 25 78 23 Q75 21 72 18"
        fill="#f4f4f4"
        stroke="#000"
        strokeWidth="2"
      />
      {/* Eye */}
      <circle cx="81" cy="18" r="1" fill="#000" />
      {/* Beak */}
      <path
        d="M84 20 L90 22 L84 24"
        fill="#ffa500"
        stroke="#000"
        strokeWidth="1"
      />
      {/* Legs */}
      <path
        d="M30 75 L25 90 M40 75 L35 90"
        fill="none"
        stroke="#ffa500"
        strokeWidth="2"
      />
      {/* Feet */}
      <path
        d="M23 90 L25 90 L27 92 M33 90 L35 90 L37 92"
        fill="none"
        stroke="#ffa500"
        strokeWidth="2"
      />
    </motion.svg>
  )
}

