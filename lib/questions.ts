export interface ContactField {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

export interface Question {
  id: string;
  title?: string;
  text: string;
  options?: string[];
  multiSelect?: boolean;
  maxSelections?: number;
  isContactForm?: boolean;
  fields?: ContactField[];
  note?: string;
  points?: { [option: string]: number };
}

const questions: Question[] = [
  {
    id: 'role',
    title: 'Just a Quick Question',
    text: "WHO'S TAKING THIS?",
    options: ['Athlete', 'Parent'],
    note: "Parents: If you're filling this out for your athlete, please answer based on their age and abilities.",
    points: {
      'Athlete': 0,
      'Parent': 0
    }
  }, {
    id: 'age',
    text: "What's your current age group?",
    note: "Parents: Please select your athlete's age group, not your own.",
    options: [
      'Under 14',
      '14-18 (High School)',
      '18-22 (College)',
      'Over 22'
    ],
    points: {
      'Under 14': 1,
      '14-18 (High School)': 2,
      '18-22 (College)': 2,
      'Over 22': 2
    }
  },  {
    id: 'dream_goal',
    text: "What's your biggest basketball dream? (Pick your top goal)",
    options: [
      'Stand out for college scouts',
      'Play like a pro someday',
      'Get stronger and faster',
      'Master the fundamentals'
    ],
    points: {
      'Stand out for college scouts': 2,
      'Play like a pro someday': 2,
      'Get stronger and faster': 1,
      'Master the fundamentals': 1
    }
  },  {
    id: 'training_status',
    text: "Are you training with someone right now?",
    options: [
      "No, I'm searching for the right fit",
      "Yes, but it's casual or part-time",
      "No, I'm good on my own",
      "Yes, I've got a full-time coach"
    ],
    points: {
      "No, I'm searching for the right fit": 2,
      "Yes, but it's casual or part-time": 1,
      "No, I'm good on my own": 1,
      "Yes, I've got a full-time coach": 0
    }
  },  {
    id: 'investment_willingness',
    text: "Would you (or your parents) invest in a game-changing program?",
    options: [
      "Absolutely, I'm ready to commit",
      "Probably, if it's worth it",
      "Maybe, I'd need to think it over",
      "No, not an option right now"
    ],
    points: {
      "Absolutely, I'm ready to commit": 2,
      "Probably, if it's worth it": 1,
      "Maybe, I'd need to think it over": 1,
      "No, not an option right now": 0
    }
  },
  {
    id: 'confidence_pressure',
    text: "In tight games, I believe I'll make the right play.",
    options: [
      '8-10 (College-ready)',
      '5-7 (Developing)',
      '1-4 (Beginner)'
    ],
    points: {
      '8-10': 2,
      '5-7': 1,
      '1-4': 0
    }
  },
  {
    id: 'training_transfer',
    text: "What I work on in training shows up in live games.",
    options: [
      '8-10 (Strongly Agree)',
      '5-7 (Somewhat Agree)',
      '1-4 (Disagree)'
    ],
    points: {
      '8-10 (Strongly Agree)': 2,
      '5-7 (Somewhat Agree)': 1,
      '1-4 (Disagree)': 0
    }
  },
  {
    id: 'self_direction',
    text: "I can design a daily workout without outside help.",
    options: [
      '8-10 (Strongly Agree)',
      '5-7 (Somewhat Agree)',
      '1-4 (Disagree)'
    ],
    points: {
      '8-10 (Strongly Agree)': 2,
      '5-7 (Somewhat Agree)': 1,
      '1-4 (Disagree)': 0
    }
  },
  {
    id: 'bounce_back',
    text: "After a bad game or workout, I reset quickly and refocus.",
    options: [
      '8-10 (Strongly Agree)',
      '5-7 (Somewhat Agree)',
      '1-4 (Disagree)'
    ],
    points: {
      '8-10 (Strongly Agree)': 2,
      '5-7 (Somewhat Agree)': 1,
      '1-4 (Disagree)': 0
    }
  },
  {
    id: 'competitive_drive',
    text: "I actively seek stronger opponents so I can level up.",
    options: [
      '8-10 (Strongly Agree)',
      '5-7 (Somewhat Agree)',
      '1-4 (Disagree)'
    ],
    points: {
      '8-10 (Strongly Agree)': 2,
      '5-7 (Somewhat Agree)': 1,
      '1-4 (Disagree)': 0
    }
  },
  {
    id: 'shooting_consistency',
    text: "Catch-and-shoot & off-the-dribble.",
    options: [
      '8-10 (College-ready)',
      '5-7 (Developing)',
      '1-4 (Beginner)'
    ],
    points: {
      '8-10 (College-ready)': 2,
      '5-7 (Developing)': 1,
      '1-4 (Beginner)': 0
    }
  },
  {
    id: 'finishing_contact',
    text: "Both hands, through traffic.",
    options: [
      '8-10 (College-ready)', 
      '5-7 (Developing)',
      '1-4 (Beginner)'
    ],
    points: {
      '8-10 (College-ready)': 2,
      '5-7 (Developing)': 1,
      '1-4 (Beginner)': 0
    }
  },
  {
    id: 'game_situations',
    text: "Pick-and-roll reads, late-clock creation, transition.",
    options: [
      '8-10 (College-ready)',
      '5-7 (Developing)', 
      '1-4 (Beginner)'
    ],
    points: {
      '8-10 (College-ready)': 2,
      '5-7 (Developing)': 1,
      '1-4 (Beginner)': 0
    }
  },
  {
    id: 'physical_tools',
    text: "Using your physical tools (posting smaller guards, spacing vs. length, etc.).",
    options: [
      '8-10 (College-ready)',
      '5-7 (Developing)',
      '1-4 (Beginner)'
    ],
    points: {
      '8-10 (College-ready)': 2,
      '5-7 (Developing)': 1,
      '1-4 (Beginner)': 0
    }
  },
  {
    id: 'play_strengths',
    text: "You know—and stick to—your highest-percentage actions.",
    options: [
      '8-10 (College-ready)',
      '5-7 (Developing)',
      '1-4 (Beginner)'
    ],
    points: {
      '8-10 (College-ready)': 2,
      '5-7 (Developing)': 1,
      '1-4 (Beginner)': 0
    }
  },
  {
    id: 'contact_info',
    title: 'Get Your Personalized Training Plan',
    text: "Enter your contact information",
    isContactForm: true,
    fields: [
      { name: 'firstName', label: 'First Name', type: 'text', required: true },
      { name: 'lastName', label: 'Last Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true }
    ]
  }
];

export const parentQuestions: Question[] = [
  {
    id: 'age',
    text: "What is your athlete's age group?",
    options: ['Under 14', '14-18', '18-22', 'Over 22'],
    points: {
      'Under 14': 1,
      '14-18': 2,
      '18-22': 2,
      'Over 22': 2
    }
  },
  {
    id: 'dream_goal',
    text: "What is your athlete's biggest basketball goal?",
    options: ['Master fundamentals', 'Get stronger & faster', 'Stand out to college scouts', 'Play professionally'],
    points: {
      'Master fundamentals': 1,
      'Get stronger & faster': 1,
      'Stand out to college scouts': 2,
      'Play professionally': 2
    }
  },
  {
    id: 'training_status',
    text: "Is your athlete currently training with a coach?",
    options: ['Full-time coach', 'Part-time coach', 'Self-training', 'Looking for a coach'],
    points: {
      'Full-time coach': 0,
      'Part-time coach': 1,
      'Self-training': 1,
      'Looking for a coach': 2
    }
  },
  {
    id: 'investment_willingness',
    text: "Would you invest in a program that transforms their game?",
    options: ['No', 'Maybe', 'Probably', 'Absolutely'],
    points: {
      'No': 0,
      'Maybe': 1,
      'Probably': 1,
      'Absolutely': 2
    }
  },
  {
    id: 'urgency',
    text: "How urgently should they level up?",
    options: ['No rush', 'Few months', 'Next month', 'Right now'],
    points: {
      'No rush': 0,
      'Few months': 0,
      'Next month': 1,
      'Right now': 2
    }
  },
  // Mindset Block
  {
    id: 'confidence_pressure',
    text: "In tight games, my athlete believes they will make the right play.",
    options: ['8-10', '5-7', '1-4'],
    points: {
      '8-10': 2,
      '5-7': 1,
      '1-4': 0
    }
  },
  {
    id: 'training_transfer',
    text: "What my athlete practices shows up in real games.",
    options: ['8-10', '5-7', '1-4'],
    points: {
      '8-10': 2,
      '5-7': 1,
      '1-4': 0
    }
  },
  {
    id: 'self_direction',
    text: "My athlete can plan their own workouts effectively.",
    options: ['8-10', '5-7', '1-4'],
    points: {
      '8-10': 2,
      '5-7': 1,
      '1-4': 0
    }
  },
  {
    id: 'bounce_back',
    text: "After a poor performance, my athlete resets quickly.",
    options: ['8-10', '5-7', '1-4'],
    points: {
      '8-10': 2,
      '5-7': 1,
      '1-4': 0
    }
  },
  {
    id: 'competitive_drive',
    text: "My athlete seeks tougher competition to grow.",
    options: ['8-10', '5-7', '1-4'],
    points: {
      '8-10': 2,
      '5-7': 1,
      '1-4': 0
    }
  },
  // Skill Block
  {
    id: 'shooting_consistency',
    text: "My athlete's catch‑and‑shoot and off‑dribble shots are reliable.",
    options: ['8-10', '5-7', '1-4'],
    points: {
      '8-10': 2,
      '5-7': 1,
      '1-4': 0
    }
  },
  {
    id: 'finishing_contact',
    text: "My athlete finishes strong through traffic.",
    options: ['8-10', '5-7', '1-4'],
    points: {
      '8-10': 2,
      '5-7': 1,
      '1-4': 0
    }
  },
  {
    id: 'game_scoring',
    text: "My athlete makes smart reads in pick‑and‑roll and transition.",
    options: ['8-10', '5-7', '1-4'],
    points: {
      '8-10': 2,
      '5-7': 1,
      '1-4': 0
    }
  },
  {
    id: 'physical_leverage',
    text: "My athlete uses their size or speed effectively.",
    options: ['8-10', '5-7', '1-4'],
    points: {
      '8-10': 2,
      '5-7': 1,
      '1-4': 0
    }
  },
  {
    id: 'play_strengths',
    text: "My athlete sticks to their high‑percentage moves.",
    options: ['8-10', '5-7', '1-4'],
    points: {
      '8-10': 2,
      '5-7': 1,
      '1-4': 0
    }
  },
  {
    id: 'contact_info',
    title: 'Get Your Athlete\'s Personalized Training Plan',
    text: "Enter your contact information",
    isContactForm: true,
    fields: [
      { name: 'firstName', label: 'First Name', type: 'text', required: true },
      { name: 'lastName', label: 'Last Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true }
    ]
  }
];

export const PLAYER_TIERS = {
  CHOSEN_ONES: {
    minPoints: 22,
    title: "The Chosen Ones",
    description: "Your athlete's scores show they're outperforming their peers. Their talent is clear—now they need structure. Our D-1 framework will unlock their full potential.",
    nextStep: "Schedule a 1-on-1 'Train Like a Pro' call to claim a limited mentorship seat.",
    cta: {
      type: "calendly",
      link: "/schedule-call",
      text: "Schedule Elite Training Call"
    }
  },
  RISING_STARS: {
    minPoints: 15,
    title: "Rising Stars",
    description: "The data shows your athlete has the work ethic and mindset. They need a targeted plan for vertical, strength, and IQ. Our mentorship bridges that gap.",
    nextStep: "View a 2-minute program overview, then join a live Q&A to confirm fit.",
    cta: {
      type: "video",
      link: "/training-overview",
      text: "Watch Training Overview"
    }
  },
  DEVELOPING_PROSPECT: {
    minPoints: 0,
    title: "Developing Prospect",
    description: "Your athlete has strong fundamentals and the drive to improve. The next 90 days should focus on drills, confidence, and consistency. Start with our free drill pack.",
    nextStep: "Download our '5 Pro Drills' guide and join the community Discord for accountability.",
    cta: {
      type: "download",
      link: "/pro-drills-guide",
      text: "Download Free Drill Pack"
    }
  }
};

export default questions;