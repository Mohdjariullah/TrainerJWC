'use client';

import { PLAYER_TIERS } from '@/lib/questions';

interface PlayerProfileProps {
  points: number;
}

export default function PlayerProfileDisplay({ points }: PlayerProfileProps) {
  const getTier = () => {
    if (points >= PLAYER_TIERS.CHOSEN_ONES.minPoints) return PLAYER_TIERS.CHOSEN_ONES;
    if (points >= PLAYER_TIERS.RISING_STARS.minPoints) return PLAYER_TIERS.RISING_STARS;
    return PLAYER_TIERS.DEVELOPING_PROSPECT;
  };

  const tier = getTier();

  return (
    <div className="bg-[#1A1A1A] rounded-xl p-8 space-y-6">
      <h2 className="text-3xl font-bold text-white">{tier.title}</h2>
      <p className="text-gray-300 text-lg">{tier.description}</p>
      <p className="text-blue-400 font-medium">{tier.nextStep}</p>
      
      {'buttons' in tier.cta ? (
        <div className="flex gap-4">
          {tier.cta.buttons.map((button, index) => (
            <a
              key={index}
              href={button.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              {button.text}
            </a>
          ))}
        </div>
      ) : (
        <a
          href={'link' in tier.cta ? tier.cta.link : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
        >
          {'text' in tier.cta ? tier.cta.text : ''}
        </a>
      )}
    </div>
  );
}
