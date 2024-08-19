export interface Option {
  text: string;
  correct: boolean;
}

export interface Quiz {
  question: string;
  options: Option[];
  answerIndex?: number; // Optional field to store the selected answer index
}

// In UserCourse.types.ts

export interface QuizResultProps {
  quizResult: {
    correct_answers: number;
    total_questions: number;
  };
  onClose: () => void;
  courseID: number; // Add this line
}

export interface CourseDetails {
  name: string;
  description: string;
  imageUrl: string;
  quizzes: Quiz[];
  link:string;
  id:number;
}

interface Answer {
  questionId: number;
  selectedOption: string;
}

export interface CheckAnswersResponse {
  address: string;
  correct_answers: number;
  total_questions: number;
}

export interface CheckAnswerButtonProps {
  courseName: string | undefined;
  answers: Answer[];
  onResultReceived: (result: CheckAnswersResponse) => void;
  address: string | undefined;
}

export interface QuizMainComponentProps {
  courseDetailsProp: CourseDetails;
  address: string; // Adjust the type according to your actual use case
}