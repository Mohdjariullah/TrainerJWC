'use client';

import { useEffect, useState } from 'react';
import { calculatePlayerProfile } from '@/lib/calculateProfile';
import PlayerProfileDisplay from '@/components/PlayerProfileDisplay';
import type { PlayerProfile } from '@/types/playerProfile';

export default function SummaryPage() {
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile | null>(null);

  useEffect(() => {
    const formState = localStorage.getItem('formState');
    if (formState) {
      const { answers } = JSON.parse(formState);
      const profile = calculatePlayerProfile(answers);
      setPlayerProfile(profile);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        {playerProfile?.tier ? (
          <PlayerProfileDisplay profile={playerProfile} />
        ) : (
          <div>Loading your profile...</div>
        )}
      </div>
    </div>
  );
}
