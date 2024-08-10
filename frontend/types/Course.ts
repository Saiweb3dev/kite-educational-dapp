export interface QuizOption {
  text: string;
  correct: boolean;
}

// In your types/Course.ts or a similar file

export interface QuizItem {
  id: number;
  question: string;
  options: Array<QuizOption>;
  answer?: string;
}

export interface CourseFormProps {
  onSubmit: (formData: FormData) => void; // Ensure this matches what you're passing
}
 export interface FormData {
title: string;
description: string;
courseName: string;
imageUrl: string;
link: string;
quizzes: Array<{
  id:any;
    question: string;
    options: Array<QuizOption>;
    answer?:string;
}>;
}
