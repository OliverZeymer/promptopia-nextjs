"use client";
import { textVariant } from "@utils/motion";
import { motion } from "framer-motion";
export default function LandingHero() {
  return (
    <motion.div animate="show" className="w-full flex-center flex-col" initial="hidden">
      <motion.h1 variants={textVariant(0.1)} className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
      </motion.h1>
      <motion.h2 variants={textVariant(1)} className="orange_gradient second_head_text text-center">
        AI-Powered Prompts
      </motion.h2>

      <motion.p variants={textVariant(2)} className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts
      </motion.p>
    </motion.div>
  );
}
