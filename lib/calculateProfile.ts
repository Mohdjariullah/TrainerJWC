import type { PlayerProfile } from '@/types/playerProfile';

export function calculatePoints(answers: Record<string, string>): number {
  let totalPoints = 0;

  // Core questions (8 points possible)
  const corePoints = {
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
      const map = pointMap as Record<string, number>;
      totalPoints += map[answers[key]] || 0;
    }
  });

  // Mindset questions (10 points possible)
  const mindsetQuestions = [
    'confidence_pressure',
    'training_transfer',
    'self_direction',
    'bounce_back',
    'competitive_drive'
  ];

  // Skills questions (10 points possible)
  const skillQuestions = [
    'shooting_consistency',
    'finishing_contact',
    'game_situations',
    'physical_tools',
    'play_strengths'
  ];

  // Calculate points for both mindset and skills
  [...mindsetQuestions, ...skillQuestions].forEach(question => {
    const value = parseInt(answers[question]);
    if (value >= 8) totalPoints += 2;
    else if (value >= 5) totalPoints += 1;
  });

  return totalPoints;
}

export function getProfileTier(points: number): string {
  if (points >= 22) {
    return 'The Chosen Ones (Tier 1)';
  } else if (points >= 15) {
    return 'Rising Stars (Tier 2)';
  } else {
    return 'Developing Prospect (Tier 3)';
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