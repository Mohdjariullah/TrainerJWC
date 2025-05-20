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
        {playerProfile && (
          <>
            <h1 className="text-4xl font-bold mb-12 text-center">Your Player Profile</h1>
            <PlayerProfileDisplay 
              profile={playerProfile}
            />
          </>
        )}
      </div>
    </div>
  );
}
