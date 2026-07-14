"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, Box } from '@mui/material'; // Injected core fix
import { ExternalLink, Info } from 'lucide-react';

// Mock news-feed style ad database targeting developer ecosystems
const MOCK_AD_FEED = [
  {
    id: 'ad-1',
    sponsor: 'Synology NAS Services',
    title: 'Migrate to Cloud base NAS Today',
    description: 'Get $100 in free credits for every 5TG. Offer ends this month.',
    cta: 'Deploy Now',
    tag: 'Cloud Computing',
    bgColor: 'from-orange-600 to-amber-700'
  },
  {
    id: 'ad-2',
    sponsor: 'Lipcare',
    title: 'Display Monitoring Simplified',
    description: 'Realtime subscriptions, instant colors, and enterprise FPS ready out-of-the-box.',
    cta: 'Start Free',
    tag: 'Monitors',
    bgColor: 'from-emerald-600 to-teal-800'
  },
  {
    id: 'ad-3',
    sponsor: 'LENOVO LOQ',
    title: 'Exclusive offer : Precision Gaming with AI-Powered Performance',
    description: 'Power up your game with the Lenovo Loq.',
    cta: 'Learn More',
    tag: 'Gaming',
    bgColor: 'from-zinc-900 to-black'
  }
];

export default function GoogleAdBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically cycle through ads like a continuous news feed
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % MOCK_AD_FEED.length);
    }, 6000); // Rotates every 6 seconds

    return () => clearInterval(timer);
  }, []);

  const currentAd = MOCK_AD_FEED[currentIndex];

  return (
    <div 
      className="w-full max-w-5xl mx-auto my-6 p-1 bg-gray-200 dark:bg-zinc-800 rounded-lg shadow-sm"
      // Simulating the exact Google Ad Tag attribute you observed
      data-google-query-id={`AMZ-HUB-MOCK-AD-${currentAd.id}-${Date.now()}`}
    >
      {/* Ad Attribution Label Header */}
      <div className="flex justify-between items-center px-2 py-1 text-[10px] text-gray-500 font-sans tracking-wide">
        <span className="flex items-center gap-1 uppercase font-bold text-gray-400">
          Reported Ad <Info size={10} />
        </span>
        <span className="flex items-center gap-1 italic">
          Ads by Google
        </span>
      </div>

      {/* Main Interactive Ad Container */}
      <div className="relative h-28 w-full bg-white dark:bg-zinc-900 rounded-md overflow-hidden flex items-center border border-gray-300 dark:border-zinc-700">
        
        {/* News Feed Animation Core Wrapper */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAd.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full flex items-center px-4 md:px-6 justify-between gap-4"
          >
            {/* Visual Graphic Asset */}
            <div className={`hidden md:flex h-20 w-20 shrink-0 rounded-lg bg-gradient-to-br ${currentAd.bgColor} items-center justify-center p-2 text-white font-black text-center text-xs shadow-inner`}>
              {currentAd.tag}
            </div>

            {/* Content Mid-Section */}
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold tracking-tight text-[#FF9900] uppercase bg-amber-500/10 px-1.5 py-0.5 rounded">
                  Sponsored
                </span>
                <Typography className="text-xs font-semibold text-gray-400 truncate">
                  {currentAd.sponsor}
                </Typography>
              </div>
              <h4 className="text-sm md:text-base font-bold text-gray-900 dark:text-white truncate">
                {currentAd.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 max-w-2xl mt-0.5">
                {currentAd.description}
              </p>
            </div>

            {/* Interactive Call To Action Block */}
            <div className="shrink-0 flex items-center gap-3">
              <button className="flex items-center gap-1.5 bg-[#FF9900] hover:bg-[#E47911] text-[#131921] font-bold text-xs px-4 py-2.5 rounded-md transition-colors shadow-sm whitespace-nowrap">
                {currentAd.cta}
                <ExternalLink size={14} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Live Active Feed Rotator Dot Indicator */}
        <div className="absolute right-2 top-2 flex gap-1">
          {MOCK_AD_FEED.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#FF9900] scale-125' : 'bg-gray-300 dark:bg-zinc-600'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}