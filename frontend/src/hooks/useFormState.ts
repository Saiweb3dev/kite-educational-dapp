import { useState } from "react";
import { FormData } from "../../types/Course";

const useFormState = (onSubmit: (data: FormData) => void) => {
  const [formState, setFormState] = useState<FormData>({
    title: "",
    description: "",
    courseName: "",
    imageUrl: "",
    link: "",
    quizzes: [{ id: 0, question: "", options: [], answer: "" }],
  });

  const updateBasicInfo = (field: keyof FormData, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const addQuiz = () => {
    setFormState((prev) => ({
      ...prev,
      quizzes: [
        ...prev.quizzes,
        { id: prev.quizzes.length, question: "", options: [], answer: "" },
      ],
    }));
  };

  const removeQuiz = (indexToRemove: number) => {
    setFormState((prev) => ({
      ...prev,
      quizzes: prev.quizzes.filter((_, index) => index !== indexToRemove),
    }));
  };

  const addQuizOption = (quizIndex: number) => {
    console.log("Add Quiz Option called")
    setFormState((prev) => {
      const newQuizzes = [...prev.quizzes];
      if (newQuizzes[quizIndex].options.length >= 4) {
        alert("Each quiz can have up to 4 options.");
        return prev;
      }
      newQuizzes[quizIndex] = {
        ...newQuizzes[quizIndex],
        options: [
          ...newQuizzes[quizIndex].options,
          { text: "", correct: false },
        ],
      };
      return { ...prev, quizzes: newQuizzes };
    });
  };

  const updateQuizOption = (
    quizIndex: number,
    optIndex: number,
    value: string
  ) => {
    setFormState((prev) => {
      const newQuizzes = prev.quizzes.map((q, i) =>
        i === quizIndex
          ? {
              ...q,
              options: q.options.map((o, idx) =>
                idx === optIndex ? { ...o, text: value } : o
              ),
            }
          : q
      );
      return { ...prev, quizzes: newQuizzes };
    });
  };

  const updateQuizQuestion = (index: number, value: string) => {
    setFormState((prev) => ({
      ...prev,
      quizzes: prev.quizzes.map((q, i) =>
        i === index ? { ...q, question: value } : q
      ),
    }));
  };

  const updateQuizAnswer = (quizId: number, value: string) => {
    setFormState((prev) => ({
      ...prev,
      quizzes: prev.quizzes.map((q) =>
        q.id === quizId ? { ...q, answer: value } : q
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Form submission attempted');
    e.preventDefault();
    // Only submit if all required fields are filled
    if (validateForm()) {
      console.log('Form validated, submitting');
      onSubmit(formState);
    }else{
      console.log('Form validation failed');
    }
  };
  const validateForm = () => {
    // Add your validation logic here
    // For example:
    return (
      formState.title.trim() !== "" &&
      formState.description.trim() !== "" &&
      formState.courseName.trim() !== "" &&
      formState.quizzes.every(
        (quiz) =>
          quiz.question.trim() !== "" &&
          quiz.options.length > 0 &&
          quiz.options.every((option) => option.text.trim() !== "") &&
          quiz.answer &&
          quiz.answer.trim() !== ""
      )
    );
  };
  return {
    formState,
    updateBasicInfo,
    quizActions: {
      addQuiz,
      removeQuiz,
      addQuizOption,
      updateQuizQuestion,
      updateQuizOption,
      updateQuizAnswer,
    },
    handleSubmit,
  };
};

export default useFormState;
