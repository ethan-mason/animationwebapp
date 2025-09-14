"use client"
import React, { useState, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import { motion } from "framer-motion";
import { Backpack } from "react-kawaii";

export default function Home() {
  const { width, height } = useWindowSize()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)  // クライアント側でマウントされたら true に
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-screen"
      style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {mounted && width && height && (
        <Confetti
          width={width}
          height={height}
        />
      )}

      <motion.p
        className="relative text-center bg-white rounded-full px-4 py-2 rounded-lg speech-bubble"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        学推に向けてしっかりと勉強しよう！
      </motion.p>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Backpack size={240} mood="blissful" color="#add2ff" />
      </motion.div>
    </div>
  );
}