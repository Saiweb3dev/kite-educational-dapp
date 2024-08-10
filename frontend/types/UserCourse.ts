export interface Option {
  text: string;
  correct: boolean;
}

export interface Quiz {
  question: string;
  options: Option[];
  answerIndex?: number; // Optional field to store the selected answer index
}

export interface CourseDetails {
  name: string;
  description: string;
  imageUrl: string;
  quizzes: Quiz[];
}
