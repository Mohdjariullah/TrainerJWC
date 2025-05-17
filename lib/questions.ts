export interface ContactField {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

// Define the structure of our questions
export interface Question {
  id: string;
  title?: string;
  text: string;
  options?: string[];
  multiSelect?: boolean;
  maxSelections?: number;
  isContactForm?: boolean;
  fields?: ContactField[];
}

// Questions for the basketball evaluation
const questions: Question[] = [
  {
    id: 'role',
    title: 'Just a Quick Question',
    text: "WHO'S TAKING THIS?",
    options: ['Athlete', 'Parent'],
  },  {
    id: 'age',
    text: "What's your current age group?",
    options: [
      'Under 14',
      '14-18 (High School)',
      '18-22 (College)',
      'Over 22'
    ],
  },  {
    id: 'skill_level',
    text: "How do you see yourself as a player right now?",
    options: [
      'Just starting out',
      'Solid but room to grow',
      'Advanced and pushing limits',
      'Elite, ready for the next level'
    ],
  },  {
    id: 'dream_goal',
    text: "What's your biggest basketball dream? (Pick your top goal)",
    options: [
      'Master the fundamentals',
      'Get stronger and faster',
      'Stand out for college scouts',
      'Play like a pro someday'
    ],
  },  {
    id: 'training_status',
    text: "Are you training with someone right now?",
    options: [
      "Yes, I've got a full-time coach",
      "Yes, but it's casual or part-time",
      "No, I'm searching for the right fit",
      "No, I'm good on my own"
    ],
  },  {
    id: 'commitment_level',
    text: "How bad do you want to crush your goals?",
    options: [
      "I'm all in, no excuses",
      "I'm fired up but need a plan",
      "I want it, just not sure how",
      "I'll get there eventually"
    ],
  },  {
    id: 'investment_willingness',
    text: "Would you (or your parents) invest in a game-changing program?",
    options: [
      "Absolutely, I'm ready to commit",
      "Probably, if it's worth it",
      "Maybe, I'd need to think it over",
      "No, not an option right now"
    ],
  },
  {
    id: 'program_preferences',
    text: "What would make a program elite for you? (Pick top 2)",
    options: [
      "One-on-one coaching",
      "Pro-level workouts",
      "Mental edge training",
      "Insider film breakdowns"
    ],
    multiSelect: true,
    maxSelections: 2
  },
  {
    id: 'hesitation_reason',
    text: "What's holding you back from joining a program like mine?",
    options: [
      "Nothing, I'm ready",
      "Not sure it's better than what I've got",
      "The price tag",
      "Just not the right time" 
    ],
  },  {
    id: 'level_up',
    text: "How soon do you want to level up your game?",
    options: [
      "Right now, let's go",
      "Next month or so",
      "Few months down the road",
      "No rush, just exploring"
    ],
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
}

export default questions;