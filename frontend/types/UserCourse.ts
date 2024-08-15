export interface Option {
  text: string;
  correct: boolean;
}

export interface Quiz {
  question: string;
  options: Option[];
  answerIndex?: number; // Optional field to store the selected answer index
}

export interface QuizResultProps {
  quizResult: {
    correct_answers: number;
    total_questions: number;
  };
  onClose: () => void; // Function to close the modal
}

export interface CourseDetails {
  name: string;
  description: string;
  imageUrl: string;
  quizzes: Quiz[];
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
  courseName: string;
  answers: Answer[];
  onResultReceived: (result: CheckAnswersResponse) => void;
  address: string | undefined;
}
