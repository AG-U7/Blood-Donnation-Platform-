import React from "react";
import { Link } from "react-router";
import { Button, Typography } from "../components/ui";
import { PublicLayout } from "../components/layouts";
import { motion } from "motion/react";
import { useLanguage } from "../i18n";
import homeImage from "../../../aman-chaturvedi-0ZZo5o00o80-unsplash.jpg";

export function HomePage() {
  const { language } = useLanguage();
  const isFrench = language === "fr";

  return (
    <PublicLayout>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center md:py-20 md:px-20 relative overflow-hidden min-h-[calc(100vh-80px)]">
        {/* Animated Background Image */}
        <motion.div 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${homeImage})`
            }}
          />
        </motion.div>

        {/* Animated gradient overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 bg-gradient-to-b from-white/90 via-white/80 to-white/92"
        />

        {/* Floating animated shapes */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[10%] right-[10%] w-[200px] h-[200px] rounded-full bg-[#CC0000]/10 blur-3xl z-0"
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-[15%] left-[5%] w-[250px] h-[250px] rounded-full bg-[#CC0000]/8 blur-3xl z-0"
        />

        {/* Main Content */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-3xl"
        >
          <Typography.H1 className="mb-6">
            {isFrench ? (
              <>
                Le réseau solidaire de <span className="text-[#CC0000]">don de sang</span>
              </>
            ) : (
              <>
                The solidarity <span className="text-[#CC0000]">blood donation</span> network
              </>
            )}
          </Typography.H1>
          
          <Typography.Body className="mb-12 max-w-2xl mx-auto text-[16px] md:text-[20px] leading-relaxed">
            {isFrench
              ? "Rejoignez notre communauté. Répondez aux urgences de votre région et sauvez des vies en temps réel."
              : "Join our community. Respond to emergencies in your area and help save lives in real time."}
          </Typography.Body>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link to="/login">
              <Button 
                size="lg" 
                className="w-full md:w-auto min-w-[250px] shadow-2xl shadow-[#CC0000]/30 hover:shadow-[#CC0000]/40 transition-all duration-300 text-[18px] h-14"
              >
                {isFrench ? "Commencer" : "Get started"}
              </Button>
            </Link>
          </motion.div>

          {/* Small tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-[14px] text-[#888888]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {isFrench
              ? "Un geste simple qui peut sauver une vie"
              : "A simple act that can save a life"}
          </motion.p>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
