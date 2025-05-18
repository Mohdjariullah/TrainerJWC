'use client';

import { PlayerProfile } from '@/types/playerProfile';

interface PlayerProfileDisplayProps {
  profile: PlayerProfile;
}

export default function PlayerProfileDisplay({ profile }: PlayerProfileDisplayProps) {
  const { tier, totalPoints } = profile;

  return (
    <div className="bg-[#1A1A1A] rounded-lg p-8 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{tier.title}</h2>
        <div className="text-blue-400 text-sm">Score: {totalPoints} points</div>
      </div>

      <div className="space-y-6">
        <div className="prose prose-invert">
          <p className="text-gray-300">{tier.summary}</p>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-white mb-3">Next Step</h3>
          <p className="text-gray-300 mb-6">{tier.nextStep}</p>

          <button 
            onClick={() => window.open(tier.cta.link, '_blank')}
            className="w-full px-6 py-3 bg-[#0D6EFD] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            {tier.cta.text}
          </button>
        </div>
      </div>
    </div>
  );
}
