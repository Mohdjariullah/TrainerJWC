export interface CTAButton {
  type: string;
  text: string;
  link: string;
}

export interface PlayerTier {
  title: string;
  minPoints: number;
  summary: string;
  nextStep: string;
  cta: {
    type: 'calendly' | 'video' | 'download' | 'multiple';
    link?: string;
    text?: string;
    buttons?: CTAButton[];
  };
}

export interface QuestionScore {
  option: string;
  points: number;
}

import type { ContactInfo } from './form';

export interface PlayerProfile {
tier: PlayerTier;
totalPoints: number;
answers: Record<string, string | string[] | ContactInfo | undefined>;
}

export const PLAYER_TIERS: PlayerTier[] = [
  {
    title: "The Chosen Ones",
    minPoints: 22,
    summary: "Your scores confirm it: you're already playing above your age group. Effort isn't your issue—efficient structure is. Right now raw talent is doing 90% of the work. With a proven D-1 framework you'll translate every rep to real games and separate from the pack.",
    nextStep: "Lock in a Train Like a Pro 1-on-1 call to claim one of the limited mentorship spots.",
    cta: {
      type: 'calendly',
      link: '/schedule-call',
      text: 'Schedule Your Elite Training Call'
    }
  },
  {
    title: "Rising Stars",
    minPoints: 15,
    summary: "The data shows you've got the engine and the attitude. What's missing is a precise plan to turn hard work into measurable gains—vertical, strength, game IQ. Our mentorship bridges that gap so your work rate actually shows on the stat sheet.",
    nextStep: "Watch a 2-min breakdown of how the program sharpens your edge, then jump on a live Q&A to see if you're a fit.",
    cta: {
      type: 'video',
      link: '/training-breakdown',
      text: 'Watch Training Breakdown'
    }
  },
  {
    title: "Developing Prospect",
    minPoints: 0,
    summary: "You've got the basics and the will to improve. The next 90 days should focus on fundamentals, confidence, and consistent reps. Start with our free drill pack and weekly community check-ins. When you're ready for full coaching, the D-1 system is here.",
    nextStep: "Download the '5 Pro Drills' guide and join the Discord to stay accountable.",
    cta: {
      type: 'download',
      link: '/pro-drills-guide',
      text: 'Get Your Free Drill Pack'
    }
  }
];
