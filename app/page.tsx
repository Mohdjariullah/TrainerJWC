'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import FormWizard from '@/components/FormWizard';

export default function Home() {
  const [started, setStarted] = useState(false);
  
  return (
    <AnimatePresence mode="wait">
      {!started ? (
        <motion.div 
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-screen bg-black flex items-center justify-center overflow-hidden"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto text-center px-4"
          >
            <div className="flex flex-col items-center">
                <div className="relative w-[280px] mx-auto rounded-[32px] overflow-hidden" style={{ border: '2px solid rgba(255,255,255,0.1)' }}>
                <Image
                  src="/basketball-player.png"
                  alt="Basketball Player"
                  width={280}
                  height={0}
                  style={{ objectFit: 'cover', height: 'auto' }}
                  className="hover:scale-105 transition-transform duration-300"
                  priority
                />
                </div>
              <div className="space-y-8 px-4 mt-16">
                <h1 className="text-6xl font-bold text-white tracking-tight">
                  Train Like a Pro Evaluation
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  Take the 3-minute evaluation to find the exact gaps in your game—and get a custom action plan from former D-1 guard Jake Cioe.
                </p>
                <div className="space-y-6 pt-8">
                  <motion.button 
                    onClick={() => setStarted(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  >
                    Get Started
                  </motion.button>
                  <p className="text-gray-500">
                    Takes only 3 minutes. Get instant results.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-screen bg-black flex items-center justify-center overflow-hidden"
        >
          <FormWizard />
        </motion.div>
      )}
    </AnimatePresence>
  );
}