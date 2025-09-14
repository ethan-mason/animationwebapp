"use client"
import React, { useState, useEffect, MouseEvent } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Backpack } from "react-kawaii";

// 💩1つの型を定義
type Poop = {
  id: number;
  x: number;
  y: number;
};

export default function Home() {
  const { width, height } = useWindowSize();
  const [mounted, setMounted] = useState(false);
  const [poops, setPoops] = useState<Poop[]>([]); // 型を明示

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // クリックで💩を追加
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const id = Date.now();
    const x = e.clientX;
    const y = e.clientY;

    setPoops((prev) => [...prev, { id, x, y }]);

    // 1秒後に削除
    setTimeout(() => {
      setPoops((prev) => prev.filter((p) => p.id !== id));
    }, 1000);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full min-h-screen"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={handleClick}
    >
      {mounted && width && height && <Confetti width={width} height={height} />}

      <motion.p
        className="relative text-center bg-white rounded-full px-4 py-2 rounded-lg speech-bubble z-10 select-none"
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
        className="z-10 select-none"
      >
        <Backpack size={240} mood="blissful" color="#add2ff" />
      </motion.div>

      {/* 💩アニメーション */}
      <AnimatePresence>
        {poops.map((poop) => (
          <motion.div
            key={poop.id}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1.2, y: -100, rotate: 360 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              left: poop.x,
              top: poop.y,
              pointerEvents: "none",
              fontSize: "2rem",
            }}
          >
            💩
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
