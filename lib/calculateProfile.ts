import type { PlayerProfile } from '@/types/playerProfile';

export function calculatePoints(answers: Record<string, string>): number {
  let totalPoints = 0;

  // Core questions (8 points possible)
  const corePoints = {
    role: {
      'Athlete': 2,
      'Parent': 1
    },
    age: {
      'Under 14': 1,
      '14-18 (High School)': 2,
      '18-22 (College)': 2,
      'Over 22': 2
    },
    dream_goal: {
      'Stand out for college scouts': 2,
      'Play like a pro someday': 2,
      'Get stronger and faster': 1,
      'Master the fundamentals': 1
    },
    training_status: {
      "No, I'm searching for the right fit": 2,
      "Yes, but it's casual or part-time": 1,
      "No, I'm good on my own": 1,
      "Yes, I've got a full-time coach": 0
    },
    investment_willingness: {
      "Absolutely, I'm ready to commit": 2,
      "Probably, if it's worth it": 1,
      "Maybe, I'd need to think it over": 1,
      "No, not an option right now": 0
    }
  };

  // Add core points
  Object.entries(corePoints).forEach(([key, pointMap]) => {
    if (answers[key]) {
      totalPoints += pointMap[answers[key]] || 0;
    }
  });

  // Slider questions (20 points possible)
  const sliderQuestions = [
    'confidence_pressure',
    'training_transfer',
    'self_direction',
    'bounce_back',
    'competitive_drive',
    'shooting_consistency',
    'finishing_contact',
    'game_situations',
    'physical_tools',
    'play_strengths'
  ];

  sliderQuestions.forEach(question => {
    const value = parseInt(answers[question]);
    if (!isNaN(value)) {
      if (value >= 8) totalPoints += 2;
      else if (value >= 5) totalPoints += 1;
    }
  });

  return totalPoints;
}

export function getProfileTier(points: number): string {
  if (points >= 22) {
    return 'The Chosen One (Tier 1)';
  } else if (points >= 15) {
    return 'Rising Stars (Tier 2)';
  } else {
    return 'Developing Prospect (Tier 3)';
  }
}


export function getNextStepForTier(tier: string): string {
  switch (tier) {
    case 'Tier 1: Elite Prospect':
      return 'Connect with advanced coaches and explore elite training programs.';
    case 'Tier 2: Development Focus':
      return 'Focus on targeted skill development and seek feedback from mentors.';
    case 'Tier 3: Foundation Building':
      return 'Work on mastering the basics and consider joining a structured training group.';
    default:
      return '';
  }
}
export function getCtaForTier(tier: string): string {
  switch (tier) {
    case 'Tier 1: Elite Prospect':
      return 'Apply for our Elite Training Program now!';
    case 'Tier 2: Development Focus':
      return 'Sign up for our Development Workshops!';
    case 'Tier 3: Foundation Building':
      return 'Start with our Foundation Skills Course!';
    default:
      return '';
  }
}
export function calculatePlayerProfile(answers: Record<string, string>): PlayerProfile {
  const points = calculatePoints(answers);
  let tier;

  if (points >= 22) {
    tier = {
      title: 'The Chosen One',
      summary: "Your scores confirm it: you're already playing above your age group. Effort isn't your issue—efficient structure is. Right now raw talent is doing 90% of the work. With a proven D-1 framework you'll translate every rep to real games and separate from the pack.",
      nextStep: "Lock in a Train Like a Pro 1-on-1 call to claim one of the limited mentorship spots.",
      cta: {
        type: 'calendly',
        link: 'https://calendly.com/trainwjc/1-1-call-with-trainwjc?preview_source=et_card&month=2025-05',
        text: 'Schedule Elite Training Call'
      }
    };
  } else if (points >= 15) {
    tier = {
      title: 'Rising Stars',
      summary: "The data shows you've got the engine and the attitude. What's missing is a precise plan to turn hard work into measurable gains—vertical, strength, game IQ. Our mentorship bridges that gap so your work rate actually shows on the stat sheet.",
      nextStep: "Book your strategy call to get a custom development plan.",
      cta: {
        type: 'calendly',
        link: 'https://calendly.com/trainwjc/1-1-call-with-trainwjc?preview_source=et_card&month=2025-05',
        text: 'Book Train Like a Pro 1-1 call'
      }
    };
  } else {
    tier = {
      title: 'Developing Prospect',
      summary: "You've got the basics and the will to improve. The next 90 days should focus on fundamentals, confidence, and consistent reps. Start with our free drill pack and weekly community check-ins. When you're ready for full coaching, the D-1 system is here.",
      nextStep: "Download the 5 Pro Drills Guide.",
      cta: {
        type: 'calendly',
        link: 'https://trainwjc.kit.com/01778085c8',
        text: 'Download the 5 Pro Drills Guide'
      }
    };
  }

  return { tier, answers };
}

// Fixed type mismatch for cta property
export const PLAYER_TIERS = {
  CHOSEN_ONES: {
    title: 'The Chosen One',
    minPoints: 22,
    summary: 'Your scores confirm it: you\'re already playing above your age group. Effort isn\'t your issue—efficient structure is.',
    nextStep: 'Lock in a Train Like a Pro 1-on-1 call to claim one of the limited mentorship spots.',
    cta: {
      type: 'calendly',
      link: 'https://calendly.com/trainwjc/1-1-call-with-trainwjc?preview_source=et_card&month=2025-05',
      text: 'Schedule Elite Training Call'
    }
  },
  RISING_STARS: {
    title: 'Rising Stars',
    minPoints: 15,
    summary: 'The data shows you\'ve got the engine and the attitude. What\'s missing is a precise plan to turn hard work into measurable gains.',
    nextStep: 'Book your strategy call to get a custom development plan.',
    cta: {
      type: 'calendly',
      link: 'https://calendly.com/trainwjc/1-1-call-with-trainwjc?preview_source=et_card&month=2025-05',
      text: 'Book Train Like a Pro 1-1 call'
    }
  },
  DEVELOPING_PROSPECT: {
    title: 'Developing Prospect',
    minPoints: 0,
    summary: 'You\'ve got the basics and the will to improve. The next 90 days should focus on fundamentals, confidence, and consistent reps.',
    nextStep: 'Download the \'5 Pro Drills\' guide and join our community.',
    cta: {
      type: 'calendly',
      link: 'https://trainwjc.kit.com/01778085c8',
      text: 'Download the 5 Pro Drills Guide'
    },
    minPoints: 0 // Added missing minPoints property
  }
};