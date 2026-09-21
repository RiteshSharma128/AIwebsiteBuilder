


import React from "react";
import { Code, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function Header() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50"
    >
      <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">

            {/* Logo + Title */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-xl opacity-60 rounded-2xl" />

                <div className="relative p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <Code className="h-6 w-6 text-white" />
                </div>
              </div>

              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                  Build Website By AI
                </h1>

                <p className="text-xs text-gray-400">
                  Build websites with AI in seconds
                </p>
              </div>
            </motion.div>

            {/* AI Status */}
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(34,197,94,0.3)",
              }}
              className="
                flex items-center gap-2
                px-4 py-2
                rounded-full
                bg-white/10
                backdrop-blur-lg
                border border-green-400/20
              "
            >
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.6, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="w-2 h-2 rounded-full bg-green-400"
              />

              {/* <Sparkles className="h-4 w-4 text-green-400" />

              <span className="text-sm font-medium text-green-300">
                AI Ready
              </span> */}
              
            </motion.div>

          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;