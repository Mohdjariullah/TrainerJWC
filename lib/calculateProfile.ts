import type { PlayerProfile } from '@/types/playerProfile';

export function calculatePoints(answers: Record<string, string>): number {
  let totalPoints = 0;

  console.log('Starting calculation with answers:', answers);

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
      const points = map[answers[key]] || 0;
      totalPoints += points;
      console.log(`${key}: "${answers[key]}" = ${points} points`);
    }
  });

  console.log('Core points total:', totalPoints);

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
    if (answers[question]) {
      const value = parseInt(answers[question]);
      console.log(`${question}: value = ${value}`);
      
      if (!isNaN(value)) {
        let questionPoints = 0;
        if (value >= 8) {
          questionPoints = 2;
        } else if (value >= 5) {
          questionPoints = 1;
        } else {
          questionPoints = 0;
        }
        totalPoints += questionPoints;
        console.log(`${question}: ${value} = ${questionPoints} points`);
      }
    }
  });

  console.log('Final calculated total points:', totalPoints);
  
  return totalPoints;
}

export function getProfileTier(points: number): string {
  console.log('Getting tier for points:', points);
  if (points >= 22) {
    return 'The Chosen Ones ';
  } else if (points >= 15) {
    return 'Rising Stars ';
  } else {
    return 'Developing Prospect';
  }
}

export function calculatePlayerProfile(answers: Record<string, string>): PlayerProfile {
  const points = calculatePoints(answers);
  console.log('Profile calculation - Final Points:', points);
  
  let tier;

  if (points >= 22) {
    tier = {
      title: 'The Chosen Ones ',
      minPoints: 22,
      summary: "Your scores confirm it: you're already playing above your age group. Effort isn't your issue—efficient structure is. Right now raw talent is doing 90% of the work. With a proven D-1 framework you'll translate every rep to real games and separate from the pack.",
      nextStep: "Lock in a Train Like a Pro 1-on-1 call to claim one of the limited mentorship spots.",
      cta: {
        type: 'calendly' as const,
        link: 'https://calendly.com/trainwjc/1-1-call-with-trainwjc?preview_source=et_card&month=2025-05',
        text: 'Schedule Elite Training Call'
      }
    };
  } else if (points >= 15) {
    tier = {
      title: 'Rising Stars ',
      minPoints: 15,
      summary: "The data shows you've got the engine and the attitude. What's missing is a precise plan to turn hard work into measurable gains—vertical, strength, game IQ. Our mentorship bridges that gap so your work rate actually shows on the stat sheet.",
      nextStep: "Book your strategy call to get a custom development plan.",
      cta: {
        type: 'calendly' as const,
        link: 'https://calendly.com/trainwjc/1-1-call-with-trainwjc?preview_source=et_card&month=2025-05',
        text: 'Book Train Like a Pro 1-on-1 call'
      }
    };
  } else {
    tier = {
      title: 'Developing Prospect ',
      minPoints: 0,
      summary: "You've got the basics and the will to improve. The next 90 days should focus on fundamentals, confidence, and consistent reps. Start with our free drill pack and weekly community check-ins. When you're ready for full coaching, the D-1 system is here.",
      nextStep: "Join our community to start your journey.",
      cta: {
        type: 'multiple',
        buttons: [
          {
            type: 'discord' as const,
            text: 'Join Discord Community',
            link: 'https://discord.gg/hwejYwBP'
          }
        ]
      }
    };
  }

  console.log('Final tier assigned:', tier.title);
  
  return {
    tier,
    totalPoints: points,
    answers
  };
}