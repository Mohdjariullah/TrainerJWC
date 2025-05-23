'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { calculatePlayerProfile } from '@/lib/calculateProfile';
import PlayerProfileDisplay from '@/components/PlayerProfileDisplay';
import type { PlayerProfile } from '@/types/playerProfile';

export default function SummaryPage() {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const formState = localStorage.getItem('formState');
      if (formState) {
        const parsedState = JSON.parse(formState);
        const answers = parsedState.answers;
        const playerProfile = calculatePlayerProfile(answers);
        setProfile(playerProfile);
      }
    } catch (error) {
      console.error('Error calculating profile:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">No profile data found</h2>
          <Link href="/" className="px-6 py-3 bg-orange-500 text-black rounded-lg hover:bg-orange-600 transition-colors">
            Take the Assessment
          </Link>
        </div>
      </div>
    );
  }

  return <PlayerProfileDisplay profile={profile} />;
}
