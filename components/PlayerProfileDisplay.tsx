'use client';

import { motion } from 'framer-motion';
import PLAYER_TIERS from '@/lib/questions';
interface PlayerProfileProps {
  points: number;
}

export default function PlayerProfileDisplay({ points }: PlayerProfileProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${(points / 28) * 100}%`,
      transition: { duration: 1, ease: "easeOut", delay: 0.5 }
    }
  };

  const getTier = () => {
    if (points >= PLAYER_TIERS.CHOSEN_ONES.minPoints) return PLAYER_TIERS.CHOSEN_ONES;
    if (points >= PLAYER_TIERS.RISING_STARS.minPoints) return PLAYER_TIERS.RISING_STARS;
    return PLAYER_TIERS.DEVELOPING_PROSPECT;
  };

  const tier = getTier();
  return (
    <motion.div 
      className="min-h-screen bg-black text-white py-12 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          variants={childVariants}
        >
          Your Player Profile
        </motion.h1>

        <motion.div
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          variants={childVariants}
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 blur-3xl -z-10" />

          <motion.h2 
            className="text-3xl font-bold mb-6 text-orange-400"
            variants={childVariants}
          >
            {tier.title}
          </motion.h2>
          
          <motion.div className="mb-8" variants={childVariants}>
            <div className="flex justify-between text-sm mb-2">
              <span>{points} points</span>
              <span>28 max</span>
            </div>
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                variants={progressVariants}
              />
            </div>
          </motion.div>

          <motion.p 
            className="text-lg text-gray-300 leading-relaxed mb-6"
            variants={childVariants}
          >
            {tier.description}
          </motion.p>

          <motion.div 
            className="text-xl font-medium mb-8 text-orange-400"
            variants={childVariants}
          >
            {tier.nextStep}
          </motion.div>

          <motion.div variants={childVariants}>
            {'buttons' in tier.cta ? (
              <div className="flex flex-wrap gap-4">
                {tier.cta.buttons.map((button, index) => (
                  <motion.a
                    key={index}
                    href={button.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-medium py-4 px-6 rounded-xl text-center transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {button.text}
                  </motion.a>
                ))}
              </div>
            ) : (
              'link' in tier.cta && (
                <motion.a
                  href={tier.cta.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-medium py-4 px-6 rounded-xl text-center transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {'text' in tier.cta ? tier.cta.text : ''}
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
            className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-3 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'My Basketball Profile',
                  text: `I'm a ${tier.title} with ${points} points!`,
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
