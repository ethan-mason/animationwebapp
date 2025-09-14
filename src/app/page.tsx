"use client"
import { motion } from "motion/react"
import { Backpack } from "react-kawaii";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <p className="relative text-center  bg-white rounded-full px-4 py-2 rounded-lg speech-bubble">学推に向けてしっかりと勉強しよう！</p>
      <motion.ul animate={{ rotate: 360 }}><Backpack size={240} mood="blissful" color="#add2ff" /></motion.ul>
    </div>
  )
}