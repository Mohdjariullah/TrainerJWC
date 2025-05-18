import { PlayerProfile, PLAYER_TIERS } from '@/types/playerProfile';

const QUESTION_SCORES = {
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
  },
  level_up: {
    "Right now, let's go": 2,
    "Next month or so": 1,
    "Few months down the road": 0,
    "No rush, just exploring": 0
  }
};

// For mindset and skill questions, we'll use these point mappings
const RATING_POINTS = {
  high: { min: 8, points: 2 },
  medium: { min: 5, points: 1 },
  low: { min: 1, points: 0 }
};

function getRatingPoints(rating: number): number {
  if (rating >= RATING_POINTS.high.min) return RATING_POINTS.high.points;
  if (rating >= RATING_POINTS.medium.min) return RATING_POINTS.medium.points;
  return RATING_POINTS.low.points;
}

export function calculatePlayerProfile(answers: Record<string, string | number | string[] | undefined>): PlayerProfile {
  let totalPoints = 0;

  // Score background questions
  Object.entries(QUESTION_SCORES).forEach(([questionId, scores]) => {
    if (answers[questionId]) {
      const answer = answers[questionId];
      const scoreMap = scores as Record<string, number>;
      if (Array.isArray(answer)) {
        // Handle multi-select questions (like program_preferences)
        answer.forEach(option => {
          totalPoints += scoreMap[option] || 0;
        });
      } else {
        totalPoints += scoreMap[answer] || 0;
      }
    }
  });

  // Score mindset and skill ratings
  const ratingQuestions = [
    'confidence', 'training_transfer', 'self_direction', 'bounce_back', 'competitive_drive',
    'shooting', 'finishing', 'game_situations', 'physical_tools', 'strengths'
  ];

  ratingQuestions.forEach(question => {
    if (answers[question]) {
      totalPoints += getRatingPoints(Number(answers[question]));
    }
  });

  // Determine player tier
  const tier = PLAYER_TIERS.find((tier, index, array) => 
    totalPoints >= tier.minPoints && 
    (index === array.length - 1 || totalPoints < array[index + 1].minPoints)
  ) || PLAYER_TIERS[0];

  return {
    tier,
    totalPoints,
    answers
  };
}
