export interface QuizOption {
  text: string;
  correct: boolean;
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
    question: string;
    options: Array<QuizOption>;
}>;
}
