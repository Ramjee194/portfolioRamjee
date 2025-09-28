// AnimatedTitles.jsx
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";

export default function AnimatedTitles() {
  return (
    <motion.div
      className="text-center text-2xl md:text-3xl font-semibold text-pink-500 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <Typewriter
        options={{
          strings: [
            "Java Full-Stack Developer",
            "Mern Stack Developer",
            "Open Source Contributor",
            "Problem Solver",
          ],
          autoStart: true,
          loop: true,
          delay: 75,
          deleteSpeed: 50,
        }}
      />
    </motion.div>
  );
}
