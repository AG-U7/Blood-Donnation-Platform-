import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Droplet } from "lucide-react";

export function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-white flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <Droplet className="text-[#CC0000] w-24 h-24 fill-[#CC0000]" />
        </motion.div>
        <h1 className="font-['DM_Sans'] text-[48px] text-[#111111] mt-4 tracking-tight font-semibold">SangVie</h1>
        <p className="font-['DM_Sans'] text-[#444444] text-[16px] mt-2 tracking-wide text-center max-w-[280px]">
          Sauvez des vies, une goutte à la fois.
        </p>
      </motion.div>
    </div>
  );
}
