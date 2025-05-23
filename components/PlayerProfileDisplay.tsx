'use client';

import { motion } from 'framer-motion';
import { ContactInfo } from '@/types/form';

interface PlayerProfileProps {
  profile: {
    tier: {
      title: string;
      minPoints: number;
      summary: string;
      nextStep: string;
      cta: {
        type: string;
        link?: string;
        text?: string;
        buttons?: Array<{
          type: string;
          text: string;
          link: string;
        }>;
      };
    };
    totalPoints: number;
    answers: Record<string, string | string[] | ContactInfo | undefined>;
  };
}

export default function PlayerProfileDisplay({ profile }: PlayerProfileProps) {
  if (!profile || !profile.tier) {
    return (
      <div className="min-h-screen bg-black text-white py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading your profile...</h2>
          <p>Please wait while we calculate your results.</p>
        </div>
      </div>
    );
  }

  const { tier } = profile;
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
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
        <motion.div
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          variants={childVariants}
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-[#FFE44D]/10 to-[#FFD700]/10 blur-3xl -z-10" />

          <motion.h2 
            className="text-3xl font-bold mb-6 text-[#FFE44D]"
            variants={childVariants}
          >
            {tier.title}
          </motion.h2>

          <motion.p 
            className="text-lg text-gray-300 leading-relaxed mb-6"
            variants={childVariants}
          >
            {tier.summary}
          </motion.p>

          <motion.div 
            className="text-xl font-medium mb-8 text-[#FFE44D]"
            variants={childVariants}
          >
            {tier.nextStep}
          </motion.div>

          <motion.div variants={childVariants}>
            {tier.cta.type === 'multiple' && tier.cta.buttons ? (
              <div className="flex flex-wrap gap-4">
                {/* Download Guide Button */}
                <motion.a
                  href="https://trainwjc.kit.com/01778085c8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] bg-gradient-to-r from-[#FFE44D] to-[#FFD700] hover:from-[#FFD700] hover:to-[#FFC800] text-black font-medium py-4 px-6 rounded-xl text-center transition-all duration-200 hover:shadow-lg hover:shadow-[#FFE44D]/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download the 5 Drill program
                </motion.a>
                
                {/* Discord Community Button */}
                {tier.cta.buttons.map((button, index) => (
                  <motion.a
                    key={index}
                    href={button.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] bg-gradient-to-r from-[#FFE44D] to-[#FFD700] hover:from-[#FFD700] hover:to-[#FFC800] text-black font-medium py-4 px-6 rounded-xl text-center transition-all duration-200 hover:shadow-lg hover:shadow-[#FFE44D]/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {button.text}
                  </motion.a>
                ))}
              </div>
            ) : (
              tier.cta.link && (
                <motion.a
                  href={tier.cta.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-[#FFE44D] to-[#FFD700] hover:from-[#FFD700] hover:to-[#FFC800] text-black font-medium py-4 px-6 rounded-xl text-center transition-all duration-200 hover:shadow-lg hover:shadow-[#FFE44D]/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tier.cta.text}
                </motion.a>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
