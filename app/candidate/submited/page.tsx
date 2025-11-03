"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ResultsPage() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.8, y: show ? 0 : 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-10 max-w-md w-full border border-white/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
          className="mb-6"
        >
          <div className="w-24 h-24 rounded-full bg-green-500/20 mx-auto flex items-center justify-center">
            <CheckCircle2 size={64} className="text-green-400" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-4xl font-bold text-white mb-3"
        >
          Congratulations! 🎉
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-white/80 text-lg mb-8"
        >
          We’ve received your submission and will get back to you shortly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link href="/candidate">
            <Button className="bg-white text-indigo-600 hover:bg-white/90 font-semibold px-6 py-2 rounded-full shadow-lg">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
