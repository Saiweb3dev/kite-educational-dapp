// Standard library
import React from 'react';

// Types
import { QuizOption } from '../../../types/Course';


interface QuizQuestionProps {
    quiz: { id: number; question: string; options: Array<QuizOption>; answer?: string };
    index: number;
    quizActions: {
        removeQuiz: (index: number) => void;
        addQuizOption: (quizIndex: number) => void;
        updateQuizQuestion: (index: number, value: string) => void;
        updateQuizOption: (quizIndex: number, optIndex: number, value: string) => void;
        updateQuizAnswer: (quizId: number, value: string) => void;
    };
}

/**
 * Represents a single quiz question within a quiz section.
 * Allows users to edit the question text, options, and the correct answer.
 *
 * @component
 * @param {QuizQuestionProps} props - Props containing the quiz data, index, and actions to manipulate the quiz.
 */
const QuizQuestion: React.FC<QuizQuestionProps> = ({ quiz, index, quizActions }) => {
    // Input field for editing the quiz question text.
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Quiz {index + 1}</h3>
  
  <div className="space-y-4">
    {/* Quiz Question */}
    <div>
      <label htmlFor={`question-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
        Question
      </label>
      <input
        id={`question-${index}`}
        type="text"
        value={quiz.question}
        onChange={(e) => quizActions.updateQuizQuestion(index, e.target.value)}
        placeholder="Enter the quiz question"
        required
        className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    {/* Quiz Options */}
    {quiz.options.map((option, optIndex) => (
      <div key={optIndex}>
        <label htmlFor={`option-${index}-${optIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
          Option {optIndex + 1}
        </label>
        <input
          id={`option-${index}-${optIndex}`}
          type="text"
          value={option.text}
          onChange={(e) => quizActions.updateQuizOption(index, optIndex, e.target.value)}
          placeholder={`Enter option ${optIndex + 1}`}
          className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    ))}

    {/* Correct Answer */}
    <div>
      <label htmlFor={`answer-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
        Correct Answer
      </label>
      <input
        id={`answer-${index}`}
        type="text"
        value={quiz.answer || ''}
        onChange={(e) => quizActions.updateQuizAnswer(quiz.id, e.target.value)}
        placeholder="Enter the correct answer"
        className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    {/* Action Buttons */}
    <div className="flex justify-between mt-4 space-x-2">
      <button 
        type="button" 
        onClick={() => quizActions.addQuizOption(index)} 
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Option
      </button>
      <button 
        onClick={() => quizActions.removeQuiz(index)} 
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Remove Quiz
      </button>
    </div>
  </div>
</div>
    );
};


export default QuizQuestion;