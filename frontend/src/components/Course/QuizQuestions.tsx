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
        <div className="space-y-2 flex flex-col justify-center items-center">
            <input
                type="text"
                value={quiz.question}
                onChange={(e) => quizActions.updateQuizQuestion(index, e.target.value)}
                placeholder="Quiz Question"
                required
                className="input input-bordered input-primary w-full max-w-xs"
            />
            {/* Dynamic generation of input fields for quiz options. */}
            {quiz.options.map((option, optIndex) => (
                <input
                    key={optIndex}
                    type="text"
                    value={option.text}
                    onChange={(e) => quizActions.updateQuizOption(index, optIndex, e.target.value)}
                    placeholder={`Option ${optIndex + 1}`}
                    className="input input-bordered input-primary w-full max-w-xs"
                />
            ))}
            {/* Input field for specifying the correct answer. */}
            <input
                type="text"
                value={quiz.answer || ''}
                onChange={(e) => quizActions.updateQuizAnswer(quiz.id, e.target.value)}
                placeholder="Correct Answer"
                className="input input-bordered input-primary w-full max-w-xs"
            />
            {/* Buttons for adding/removing quiz options and removing the entire quiz. */}
            <div className="flex space-x-4 justify-between mt-2">
                <button type="button" onClick={() => quizActions.addQuizOption(index)} className="bg-white text-blue-700 px-4 py-2 rounded">Add Option</button>
                <button onClick={() => quizActions.removeQuiz(index)} className="bg-red-600 text-white px-4 py-2 rounded">Remove Quiz</button>
            </div>
        </div>
    );
};


export default QuizQuestion;