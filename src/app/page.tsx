"use client"
import React, { useState, useEffect, MouseEvent, useRef } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Backpack } from "react-kawaii";

type Poop = { id: number; x: number; y: number };

export default function Home() {
  const { width, height } = useWindowSize();
  const [mounted, setMounted] = useState(false);
  const [poops, setPoops] = useState<Poop[]>([]);
  const [text, setText] = useState("学推に向けてしっかりと勉強しよう！");
  const [hitCount, setHitCount] = useState(0);
  const [gameClear, setGameClear] = useState(false);

  const backpackRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const fadeIn = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const id = Date.now();
    const startX = e.clientX;
    const startY = e.clientY;

    setPoops((prev) => [...prev, { id, x: startX, y: startY }]);
    setTimeout(() => {
      setPoops((prev) => prev.filter((p) => p.id !== id));
    }, 1200);
  };

  const checkCollision = (poopX: number, poopY: number) => {
    if (!backpackRef.current) return false;
    const rect = backpackRef.current.getBoundingClientRect();
    return poopX > rect.left && poopX < rect.right && poopY > rect.top && poopY < rect.bottom;
  };

  const handlePoopHit = (finalX: number, finalY: number) => {
    if (!checkCollision(finalX, finalY)) return;
    const newCount = hitCount + 1;
    setHitCount(newCount);

    if (newCount === 1) setText("いてて！");
    else if (newCount === 10) {
      setText("あなたにはあげない、成績");
      setGameClear(true);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full min-h-screen"
      style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      onClick={handleClick}
    >
      {mounted && width && height && <Confetti width={width} height={height} />}

      <motion.p
        className="relative text-center bg-white rounded-full px-4 py-2 rounded-lg speech-bubble z-10 select-none"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {text}
      </motion.p>

      <motion.div ref={backpackRef} initial="hidden" animate="visible" variants={fadeIn} className="z-10 select-none">
        <Backpack size={240} mood="blissful" color="#add2ff" />
      </motion.div>

      <AnimatePresence>
        {poops.map((poop) => {
          const randomX = [
            poop.x,
            poop.x + (Math.random() * 200 - 100),
            poop.x + (Math.random() * 400 - 200),
          ];
          const randomY = [
            poop.y,
            poop.y - (Math.random() * 300 + 100),
            poop.y - (Math.random() * 500 + 200),
          ];
          const randomRotate = [0, Math.random() * 720, Math.random() * 1080];

          // 衝突チェック（最終座標で簡易判定）
          const finalX = randomX[randomX.length - 1];
          const finalY = randomY[randomY.length - 1];
          handlePoopHit(finalX, finalY);

          return (
            <motion.div
              key={poop.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: [1, 1.5, 1],
                x: randomX,
                y: randomY,
                rotate: randomRotate,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", fontSize: "3rem" }}
            >
              💩
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* ゲームクリアモーダル */}
      {gameClear && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-8 text-3xl font-bold text-center"
          >
            ゲームクリア
          </motion.div>
        </div>
      )}
    </div>
  );
}