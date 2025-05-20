'use client';

import { motion } from 'framer-motion';

interface PlayerProfileProps {
  profile: {
    tier: {
      title: string;
      summary: string;
      nextStep: string;
      cta: {
        type: string;
        link: string;
        text: string;
      };
    };
  };
}

export default function PlayerProfileDisplay({ profile }: PlayerProfileProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-black text-white py-12 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">Your Player Profile</h1>
        
        <div className="bg-[#2C2C2C] rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6">{profile.tier.title}</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">{profile.tier.summary}</p>
          <div className="text-xl font-medium mb-8">{profile.tier.nextStep}</div>
          
          <a
            href={profile.tier.cta.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#FCD34D] text-black font-medium py-4 px-6 rounded-xl text-center transition-all duration-200 hover:opacity-90"
          >
            {profile.tier.cta.text}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
