"use client"

import type React from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <motion.div
        className="md:w-1/2 bg-white flex items-center justify-center p-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div>
          <motion.h1
            className="text-4xl md:text-6xl text-blue-900 font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to De-Learn
          </motion.h1>
          <motion.p
            className="text-gray-700 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Blockchain based learning platform for students to learn get NFT as reward.
          </motion.p>
          <Link href="/Courses">
          <motion.button
            className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Explore Course
          </motion.button>
          </Link>
        </div>
      </motion.div>
      <motion.div
        className="md:w-1/2 bg-white flex items-center justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.img
          src="/edu.png"
          alt="Hero Image"
          className="max-w-3/4 h-auto md:max-w-2/3 md:h-[500px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        />
      </motion.div>
    </div>
  )
}

export default LandingPage

