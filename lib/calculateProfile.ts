import type { PlayerProfile } from '@/types/playerProfile';

export function calculatePoints(answers: Record<string, string>): number {
  let totalPoints = 0;

  // Background Block Points
  const pointsMapping = {
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

  // Mindset and Skill Block Points (same scoring pattern)
  const scalePointsMapping = {
    '8-10 (Strongly Agree)': 2,
    '8-10 (College-ready)': 2,
    '5-7 (Somewhat Agree)': 1,
    '5-7 (Developing)': 1,
    '1-4 (Disagree)': 0,
    '1-4 (Beginner)': 0
  };

  // Calculate points for each answer
  Object.entries(answers).forEach(([key, value]) => {
    if (typeof value === 'string') {
      // Check if key is one of the keys in pointsMapping
      if (key in pointsMapping) {
        const mapping = pointsMapping[key as keyof typeof pointsMapping];
        if (value in mapping) {
          totalPoints += mapping[value as keyof typeof mapping];
        }
      }
      if (value in scalePointsMapping) {
        totalPoints += scalePointsMapping[value as keyof typeof scalePointsMapping];
      }
    }
  });

  return totalPoints;
}
export function getProfileTier(points: number): string {
  // Maximum possible points: 28 (14 questions × 2 points max each)
  if (points >= 22) {
    return 'Tier 1: Elite Prospect';
  } else if (points >= 15) {
    return 'Tier 2: Development Focus';
  } else {
    return 'Tier 3: Foundation Building';
  }
}

function getSummaryForTier(tier: string): string {
  switch (tier) {
    case 'Tier 1: Elite Prospect':
      return 'You are among the top prospects, showing elite potential and readiness for advanced opportunities.';
    case 'Tier 2: Development Focus':
      return 'You have a strong foundation and are on the path to higher performance with focused development.';
    case 'Tier 3: Foundation Building':
      return 'You are building your skills and mindset—keep working on the fundamentals for future growth.';
    default:
      return '';
  }
}

function getNextStepForTier(tier: string): string {
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

function getCtaForTier(tier: string): string {
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
  const tier = getProfileTier(points);
  
  return {
    tier: {
      title: tier,
      minPoints: points >= 22 ? 22 : points >= 15 ? 15 : 0,
      summary: getSummaryForTier(tier),
      nextStep: getNextStepForTier(tier),
      cta: {
        type: 'calendly',
        link: getCtaForTier(tier),
        text: getCtaForTier(tier)
      }
    },
    totalPoints: points,
    answers
  };
}