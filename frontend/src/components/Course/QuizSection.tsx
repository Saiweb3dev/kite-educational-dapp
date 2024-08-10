// Standard library
import React from 'react';

// Types
import { QuizOption } from '../../../types/Course';

// Components
import QuizQuestion from './QuizQuestions';


interface QuizSectionProps {
    quizzes: Array<{ id: number; question: string; options: Array<QuizOption>; answer?: string }>;
    quizActions: {
        addQuiz: () => void;
        removeQuiz: (index: number) => void;
        addQuizOption: (quizIndex: number) => void;
        updateQuizQuestion: (index: number, value: string) => void;
        updateQuizOption: (quizIndex: number, optIndex: number, value: string) => void;
        updateQuizAnswer: (quizId: number, value: string) => void;
    };
}

/**
 * Component responsible for rendering a list of quizzes and providing actions to manipulate them.
 * Each quiz is represented by a {@link QuizQuestion} component, allowing for dynamic interaction.
 *
 * @component
 * @param {QuizSectionProps} props - Props containing quizzes data and actions to manipulate quizzes.
 */
const QuizSection: React.FC<QuizSectionProps> = ({ quizzes, quizActions }) => {
    // Map over quizzes array to render a QuizQuestion component for each quiz.
    // Each QuizQuestion receives the quiz data, its index, and the quizActions object.
    return (
        <>
            {quizzes.map((quiz, index) => (
                <QuizQuestion key={quiz.id} quiz={quiz} index={index} quizActions={quizActions} />
            ))}
            {/* Button to add a new quiz. Clicking this button triggers the addQuiz action from quizActions. */}
            <button onClick={quizActions.addQuiz} className="bg-white text-blue-700 px-4 py-2 rounded mt-4">Add New Quiz</button>
        </>
    );
};


export default QuizSection;