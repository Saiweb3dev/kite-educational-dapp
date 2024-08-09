"use client"
import React, { useState } from 'react';

// Define the shape of a quiz option
interface QuizOption {
    text: string;
    correct: boolean;
}

// Define the shape of the form data
// In CourseForm.tsx

// Adjust the FormData interface to include the properties expected by handleSubmit
interface FormData {
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



// Define the props for the form component
interface CourseFormProps {
  onSubmit: (formData: FormData) => void; // Ensure this matches what you're passing
}

// CourseForm component
const Form: React.FC<CourseFormProps> = ({ onSubmit }) => {
    // State for course name, image URL, link, and quizzes
    const [courseName, setCourseName] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [quizzes, setQuizzes] = useState<Array<{ question: string; options: Array<QuizOption> }>>([
        { question: '', options: [] },
    ]);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      // Initialize title and description with empty strings or default values
      const formData: FormData = {
          title: '',
          description: '',
          courseName,
          imageUrl,
          link,
          quizzes,
      };
  
      onSubmit(formData);
  };
  

    // Add a new quiz
    const addQuiz = () => {
        setQuizzes([...quizzes, { question: '', options: [] }]);
    };

    // Remove a quiz by index
    const removeQuiz = (indexToRemove: number) => {
        setQuizzes(quizzes.filter((_, index) => index !== indexToRemove));
    };

    // Add an option to a quiz
    const addQuizOption = (quizIndex: number) => {
        setQuizzes(quizzes.map((quiz, index) => 
            index === quizIndex ? { ...quiz, options: [...quiz.options, { text: '', correct: false }] } : quiz
        ));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Course Name"
                required
            />
            <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                required
            />
            <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Link"
                required
            />
            {quizzes.map((quiz, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={quiz.question}
                        onChange={(e) =>
                            setQuizzes(quizzes.map((q, i) => i === index ? { ...q, question: e.target.value } : q))
                        }
                        placeholder="Quiz Question"
                        required
                    />
                    {quiz.options.map((option, optIndex) => (
                        <input
                            key={optIndex}
                            type="text"
                            value={option.text}
                            onChange={(e) =>
                                setQuizzes(quizzes.map((q, i) => i === index ? { ...q, options: q.options.map((o, idx) => idx === optIndex ? { ...o, text: e.target.value } : o) } : q))
                            }
                            placeholder={`Option ${String.fromCharCode(optIndex + 65)} `}
                            required
                        />
                    ))}
                    <button onClick={() => addQuizOption(index)}>Add Option</button>
                    <button onClick={() => removeQuiz(index)}>Remove Quiz</button>
                </div>
            ))}

            <button onClick={() => addQuiz()}>Add New Quiz</button>
        </form>
    );
};

export default Form;
