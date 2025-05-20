'use client';

import { useEffect, useState } from 'react';
import { calculatePlayerProfile } from '@/lib/calculateProfile';
import PlayerProfileDisplay from '@/components/PlayerProfileDisplay';
import type { PlayerProfile } from '@/types/playerProfile';

export default function SummaryPage() {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);

  useEffect(() => {
    const formState = localStorage.getItem('formState');
    if (formState) {
      const { answers } = JSON.parse(formState);
      const playerProfile = calculatePlayerProfile(answers);
      setProfile(playerProfile);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        {profile && <PlayerProfileDisplay profile={profile} />}
      </div>
    </div>
  );
}
