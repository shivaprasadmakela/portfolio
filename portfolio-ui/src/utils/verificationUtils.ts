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
