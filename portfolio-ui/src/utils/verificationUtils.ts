export interface VerificationQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  placeholder: string;
}

const QUESTIONS: Omit<VerificationQuestion, 'id'>[] = [
  { question: "Type the word 'discipline' backwards", correctAnswer: "enilpicsid", placeholder: "e..." },
  { question: "What is 12 + 7?", correctAnswer: "19", placeholder: "Answer" },
  { question: "What is the opposite of 'Night'?", correctAnswer: "day", placeholder: "d..." },
  { question: "Type the first 4 letters of the day name 'Monday'", correctAnswer: "mond", placeholder: "m..." },
  { question: "Type the first 4 letters of the day name 'Tuesday'", correctAnswer: "tues", placeholder: "t..." },
  { question: "Type the first 4 letters of the day name 'Wednesday'", correctAnswer: "wedn", placeholder: "w..." },
  { question: "What is 15 - 6?", correctAnswer: "9", placeholder: "Answer" },
  { question: "Type 'FOCUS' in all lowercase", correctAnswer: "focus", placeholder: "f..." },

  { question: "What is 5 + 8?", correctAnswer: "13", placeholder: "Answer" },
  { question: "What is 20 - 7?", correctAnswer: "13", placeholder: "Answer" },
  { question: "What is 9 + 6?", correctAnswer: "15", placeholder: "Answer" },
  { question: "What is 18 - 9?", correctAnswer: "9", placeholder: "Answer" },
  { question: "What is 7 × 2?", correctAnswer: "14", placeholder: "Answer" },
  { question: "What is 21 ÷ 3?", correctAnswer: "7", placeholder: "Answer" },
  { question: "What is 10 + 11?", correctAnswer: "21", placeholder: "Answer" },
  { question: "What is 30 - 12?", correctAnswer: "18", placeholder: "Answer" },
  { question: "What is 6 × 3?", correctAnswer: "18", placeholder: "Answer" },
  { question: "What is 25 - 5?", correctAnswer: "20", placeholder: "Answer" },
  { question: "What is 4 × 4?", correctAnswer: "16", placeholder: "Answer" },
  { question: "What is 40 ÷ 8?", correctAnswer: "5", placeholder: "Answer" },

  { question: "Type the word 'discipline' in lowercase", correctAnswer: "discipline", placeholder: "d..." },
  { question: "Type the word 'consistency' backwards", correctAnswer: "ycnetsisnoc", placeholder: "y..." },
  { question: "Type the word 'morning' backwards", correctAnswer: "gninrom", placeholder: "g..." },
  { question: "Type 'EARLY' in lowercase", correctAnswer: "early", placeholder: "e..." },
  { question: "Type 'habit' in uppercase", correctAnswer: "HABIT", placeholder: "H..." },
  { question: "Type 'focus' in uppercase", correctAnswer: "FOCUS", placeholder: "F..." },

  { question: "What is the opposite of 'Cold'?", correctAnswer: "hot", placeholder: "h..." },
  { question: "What is the opposite of 'Up'?", correctAnswer: "down", placeholder: "d..." },
  { question: "What is the opposite of 'In'?", correctAnswer: "out", placeholder: "o..." },
  { question: "What is the opposite of 'True'?", correctAnswer: "false", placeholder: "f..." },
  { question: "What is the opposite of 'Open'?", correctAnswer: "closed", placeholder: "c..." },

  { question: "Type the first 3 letters of 'Friday'", correctAnswer: "fri", placeholder: "f..." },
  { question: "Type the first 3 letters of 'Saturday'", correctAnswer: "sat", placeholder: "s..." },
  { question: "Type the first 3 letters of 'Sunday'", correctAnswer: "sun", placeholder: "s..." },
  { question: "Type the last 3 letters of 'morning'", correctAnswer: "ing", placeholder: "i..." },
  { question: "Type the last 3 letters of 'discipline'", correctAnswer: "ine", placeholder: "i..." },

  { question: "What is 50 - 25?", correctAnswer: "25", placeholder: "Answer" },
  { question: "What is 3 × 7?", correctAnswer: "21", placeholder: "Answer" },
  { question: "What is 2 × 9?", correctAnswer: "18", placeholder: "Answer" },
  { question: "What is 16 ÷ 4?", correctAnswer: "4", placeholder: "Answer" },
  { question: "What is 45 ÷ 5?", correctAnswer: "9", placeholder: "Answer" },

  { question: "Type the word 'awake'", correctAnswer: "awake", placeholder: "a..." },
  { question: "Type the word 'alive'", correctAnswer: "alive", placeholder: "a..." },
  { question: "Type the word 'alert'", correctAnswer: "alert", placeholder: "a..." },
  { question: "Type the word 'energy'", correctAnswer: "energy", placeholder: "e..." },
  { question: "Type the word 'growth'", correctAnswer: "growth", placeholder: "g..." },

  { question: "Type 'I am awake' without spaces", correctAnswer: "iamawake", placeholder: "i..." },
  { question: "Type 'good morning' without spaces", correctAnswer: "goodmorning", placeholder: "g..." },
  { question: "Type 'wake up' without spaces", correctAnswer: "wakeup", placeholder: "w..." },

  { question: "What is the first letter of 'Discipline'?", correctAnswer: "d", placeholder: "d" },
  { question: "What is the first letter of 'Morning'?", correctAnswer: "m", placeholder: "m" },
  { question: "What is the first letter of 'Focus'?", correctAnswer: "f", placeholder: "f" },
  { question: "What is the last letter of 'Habit'?", correctAnswer: "t", placeholder: "t" },
  { question: "What is the last letter of 'Early'?", correctAnswer: "y", placeholder: "y" },

  { question: "Spell the number 5 in words", correctAnswer: "five", placeholder: "f..." },
  { question: "Spell the number 9 in words", correctAnswer: "nine", placeholder: "n..." },
  { question: "Spell the number 10 in words", correctAnswer: "ten", placeholder: "t..." },
  { question: "Spell the number 7 in words", correctAnswer: "seven", placeholder: "s..." },
  { question: "Spell the number 3 in words", correctAnswer: "three", placeholder: "t..." },

  { question: "What color is the sky on a clear day?", correctAnswer: "blue", placeholder: "b..." },
  { question: "What color are leaves usually?", correctAnswer: "green", placeholder: "g..." },
  { question: "What color is coal?", correctAnswer: "black", placeholder: "b..." },
  { question: "What color is snow?", correctAnswer: "white", placeholder: "w..." },
  { question: "What color is the sun usually drawn as?", correctAnswer: "yellow", placeholder: "y..." },

  { question: "Type the word 'consistency'", correctAnswer: "consistency", placeholder: "c..." },
  { question: "Type the word 'discipline' without the letter 'i'", correctAnswer: "dscplne", placeholder: "d..." },
  { question: "Type the word 'morning' without the letter 'n'", correctAnswer: "mori g".replace(' ',''), placeholder: "m..." }, // ignore if you want, remove this one if confusing
  { question: "Type the word 'habit' twice", correctAnswer: "habithabit", placeholder: "h..." },
  { question: "Type the word 'focus' twice", correctAnswer: "focusfocus", placeholder: "f..." },

  { question: "What day comes after Monday?", correctAnswer: "tuesday", placeholder: "t..." },
  { question: "What day comes before Sunday?", correctAnswer: "saturday", placeholder: "s..." },
  { question: "What month comes after January?", correctAnswer: "february", placeholder: "f..." },
  { question: "What month comes before March?", correctAnswer: "february", placeholder: "f..." },
  { question: "What month is the 12th month?", correctAnswer: "december", placeholder: "d..." },

  { question: "How many minutes are in 1 hour?", correctAnswer: "60", placeholder: "Answer" },
  { question: "How many hours are in a day?", correctAnswer: "24", placeholder: "Answer" },
  { question: "How many days are in a week?", correctAnswer: "7", placeholder: "Answer" },
  { question: "How many seconds are in a minute?", correctAnswer: "60", placeholder: "Answer" },
  { question: "How many days are in January?", correctAnswer: "31", placeholder: "Answer" },

  { question: "Type the reverse of 'early'", correctAnswer: "ylrae", placeholder: "y..." },
  { question: "Type the reverse of 'habit'", correctAnswer: "tibah", placeholder: "t..." },
  { question: "Type the reverse of 'focus'", correctAnswer: "sucof", placeholder: "s..." },
  { question: "Type the reverse of 'awake'", correctAnswer: "ekawa", placeholder: "e..." },
  { question: "Type the reverse of 'alert'", correctAnswer: "trela", placeholder: "t..." },

  { question: "What is 100 - 45?", correctAnswer: "55", placeholder: "Answer" },
  { question: "What is 11 + 14?", correctAnswer: "25", placeholder: "Answer" },
  { question: "What is 3 × 9?", correctAnswer: "27", placeholder: "Answer" },
  { question: "What is 81 ÷ 9?", correctAnswer: "9", placeholder: "Answer" },
  { question: "What is 64 ÷ 8?", correctAnswer: "8", placeholder: "Answer" },

  { question: "Type the word 'present'", correctAnswer: "present", placeholder: "p..." },
  { question: "Type the word 'today'", correctAnswer: "today", placeholder: "t..." },
  { question: "Type the word 'now'", correctAnswer: "now", placeholder: "n..." },
  { question: "Type the word 'ready'", correctAnswer: "ready", placeholder: "r..." },
  { question: "Type the word 'commit'", correctAnswer: "commit", placeholder: "c..." },

  { question: "Type only the vowels from 'discipline'", correctAnswer: "iiie", placeholder: "i..." },
  { question: "Type only the consonants from 'focus'", correctAnswer: "fcs", placeholder: "f..." },
  { question: "Type only the vowels from 'awake'", correctAnswer: "a a e".replace(' ',''), placeholder: "a..." }, // again remove if confusing
  { question: "Type the number 123 backwards", correctAnswer: "321", placeholder: "3..." },
  { question: "Type the number 908 backwards", correctAnswer: "809", placeholder: "8..." },

  { question: "Type 'yes' in uppercase", correctAnswer: "YES", placeholder: "Y..." },
  { question: "Type 'no' in uppercase", correctAnswer: "NO", placeholder: "N..." },
  { question: "Type 'ok' in uppercase", correctAnswer: "OK", placeholder: "O..." },
  { question: "Type 'hello' in uppercase", correctAnswer: "HELLO", placeholder: "H..." },
  { question: "Type 'time' in uppercase", correctAnswer: "TIME", placeholder: "T..." },

  { question: "Type 'I will wake up' without spaces", correctAnswer: "iwillwakeup", placeholder: "i..." },
  { question: "Type 'good habits' without spaces", correctAnswer: "goodhabits", placeholder: "g..." },
  { question: "Type 'stay focused' without spaces", correctAnswer: "stayfocused", placeholder: "s..." },
  { question: "Type 'early riser' without spaces", correctAnswer: "earlyriser", placeholder: "e..." },
  { question: "Type 'daily routine' without spaces", correctAnswer: "dailyroutine", placeholder: "d..." }
];


export const generateQuestion = (): VerificationQuestion => {
  const randomIndex = Math.floor(Math.random() * QUESTIONS.length);
  const q = QUESTIONS[randomIndex];
  return {
    ...q,
    id: `q-${Date.now()}-${randomIndex}`
  };
};

export const validateAnswer = (answer: string, correctAnswer: string): boolean => {
  return answer.trim().toLowerCase() === correctAnswer.toLowerCase();
};
