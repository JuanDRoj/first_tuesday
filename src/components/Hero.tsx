import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";

const Hero: React.FC<{ onDonate: () => void }> = ({ onDonate }) => {
  return (
    <AuroraBackground className="h-auto py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-0"
      >
        <div className="flex justify-center mb-8">
          <img
            src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/yNs6MDaUC3lENJrSOcmE/media/64c3ef5114592c85c49e1956.png"
            alt="First Tuesday Logo"
            className="h-24 md:h-32"
          />
        </div>

        <div className="ft-pill-purple mb-6">
          First Tuesday: Scaling Impact, Strengthening Baton Rouge
        </div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-ftpurple dark:text-white">
          From Grassroots Movement to
          <br />
          <span className="text-ftpurple">Tech-Enabled Platform</span>
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
          Be Part of the Next Phase of Impact – When businesses serve, Baton
          Rouge wins.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8"
        >
          <button onClick={onDonate} className="ft-btn-primary">
            Donate Now
          </button>
        </motion.div>
      </motion.div>
    </AuroraBackground>
  );
};

export default Hero;
