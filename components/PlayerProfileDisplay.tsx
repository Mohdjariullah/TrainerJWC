'use client';

import { motion } from 'framer-motion';

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
    answers: Record<string, any>;
  };
}

export default function PlayerProfileDisplay({ profile }: PlayerProfileProps) {
  // Safely check if profile and tier exist
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

  const { tier, totalPoints } = profile;
  
  // Debug logging
  console.log('PlayerProfileDisplay - Profile:', profile);
  console.log('PlayerProfileDisplay - Total Points:', totalPoints);
  console.log('PlayerProfileDisplay - Tier:', tier.title);
  
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

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${(totalPoints / 28) * 100}%`,
      transition: { duration: 1, ease: "easeOut", delay: 0.5 }
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
          <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 blur-3xl -z-10" />

          <motion.h2 
            className="text-3xl font-bold mb-6 text-yellow-400"
            variants={childVariants}
          >
            {tier.title}
          </motion.h2>
          
          <motion.div className="mb-8" variants={childVariants}>
            <div className="flex justify-between text-sm mb-2">
              <span>{totalPoints} points</span>
              <span>28 max</span>
            </div>
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"
                variants={progressVariants}
              />
            </div>
          </motion.div>

          <motion.p 
            className="text-lg text-gray-300 leading-relaxed mb-6"
            variants={childVariants}
          >
            {tier.summary}
          </motion.p>

          <motion.div 
            className="text-xl font-medium mb-8 text-yellow-400"
            variants={childVariants}
          >
            {tier.nextStep}
          </motion.div>

          <motion.div variants={childVariants}>
            {tier.cta.type === 'multiple' && tier.cta.buttons ? (
              <div className="flex flex-wrap gap-4">
                {tier.cta.buttons.map((button, index) => (
                  <motion.a
                    key={index}
                    href={button.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium py-4 px-6 rounded-xl text-center transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/20"
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
                  className="block w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium py-4 px-6 rounded-xl text-center transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tier.cta.text}
                </motion.a>
              )
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center mt-8"
          variants={childVariants}
        >
          <motion.button 
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'My Basketball Profile',
                  text: `I'm a ${tier.title} with ${totalPoints} points!`,
                  url: window.location.href
                })
              }
            }}
          >
            Share My Results
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
