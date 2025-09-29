import { SuccessAnimationProps } from "@/lib/interfaces/core";
import { motion } from "framer-motion";
import { Award, CheckCircle, Scale, Sparkles, Star } from "lucide-react";
import React from "react";

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
  isVisible,
  title,
  message,
  caseNumber,
  onComplete,
}) => {
  if (!isVisible) return null;

  // Auto-complete after 3 seconds
  React.useEffect(() => {
    if (isVisible && onComplete) {
      const timer = setTimeout(onComplete, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-500 flex items-center justify-center bg-gradient-to-br from-black/80 via-black/90 to-black/95 backdrop-blur-sm"
    >
      {/* Background animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [null, -100],
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
            className="absolute w-2 h-2 bg-white rounded-full"
          />
        ))}
      </div>

      {/* Main success card */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotateY: 180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 0.2,
        }}
        className="relative bg-white rounded-3xl p-12 text-center max-w-lg mx-4 shadow-2xl border-4 border-gray-100"
      >
        {/* Floating decorative elements */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity },
          }}
          className="absolute -top-6 -left-6 text-yellow-400"
        >
          <Star className="h-12 w-12 fill-current" />
        </motion.div>

        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 6, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, delay: 0.5 },
          }}
          className="absolute -top-4 -right-4 text-blue-400"
        >
          <Sparkles className="h-10 w-10 fill-current" />
        </motion.div>

        <motion.div
          animate={{
            rotate: 360,
            y: [-5, 5, -5],
          }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            y: { duration: 2, repeat: Infinity },
          }}
          className="absolute -bottom-4 -left-4 text-green-400"
        >
          <Award className="h-8 w-8 fill-current" />
        </motion.div>

        {/* Main success icon with complex animation */}
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              delay: 0.5,
            }}
            className="relative"
          >
            {/* Pulsing background circle */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 bg-green-500 rounded-full blur-xl"
            />

            {/* Main checkmark */}
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full p-6 shadow-2xl"
            >
              <CheckCircle className="h-20 w-20 text-white fill-current" />
            </motion.div>
          </motion.div>

          {/* Orbiting legal scale icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              animate={{
                y: [-40, -50, -40],
                rotate: -360,
              }}
              transition={{
                y: { duration: 2, repeat: Infinity },
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              }}
              className="absolute"
            >
              <Scale className="h-8 w-8 text-gray-700" />
            </motion.div>
          </motion.div>
        </div>

        {/* Success text with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="space-y-4"
        >
          <motion.h2
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="text-gray-600 text-lg leading-relaxed mb-6"
          >
            {message}
          </motion.p>

          {caseNumber && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, type: "spring" }}
              className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border-2 border-gray-200"
            >
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Scale className="h-6 w-6 text-gray-700" />
                </motion.div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">File ID</p>
                  <p className="text-xl font-bold text-gray-900">
                    #{caseNumber}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-b-3xl"
        />

        {/* Floating success badges */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
        >
          ✓ Completed
        </motion.div>
      </motion.div>

      {/* Confetti effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: -100,
              x: Math.random() * window.innerWidth,
              rotate: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: window.innerHeight + 100,
              rotate: 360,
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 2 + 1,
              ease: "easeOut",
            }}
            className={`absolute w-3 h-3 ${
              i % 4 === 0
                ? "bg-yellow-400"
                : i % 4 === 1
                  ? "bg-green-400"
                  : i % 4 === 2
                    ? "bg-blue-400"
                    : "bg-red-400"
            } rounded-full`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SuccessAnimation;
