// Import React library
import React from 'react';
import { QuizResultProps } from '../../../types/UserCourse';


/**
 * Component to display the results of a quiz in a modal format.
 * It calculates the score percentage and displays a message and color based on the score.
 * @param quizResult - An object containing the number of correct answers and total questions.
 * @param onClose - A function to close the modal.
 */
const QuizResultModal: React.FC<QuizResultProps> = ({ quizResult, onClose }) => {
  const { correct_answers, total_questions } = quizResult;

  // Calculate the score percentage by dividing the number of correct answers by the total questions and multiplying by 100.
  // The toFixed method is used to round the result to the nearest whole number.
  const scorePercentage = (correct_answers / total_questions * 100).toFixed(0);

  // Determine the message and text color based on the calculated score percentage.
  // Different messages and colors are assigned depending on whether the score is above 75%, between 50% and 75%, or below 50%.
  let message = '';
  let textColor = '';

  if (Number(scorePercentage) > 75) {
    message = "You did a great job!";
    textColor = 'text-green-500'; // Green text color for high scores
  } else if (Number(scorePercentage) > 50) {
    message = "You can try better next time.";
    textColor = 'text-orange-500'; // Orange text color for moderate scores
  } else {
    message = "Oops! Try harder next time.";
    textColor = 'text-red-500'; // Red text color for low scores
  }

  // Return the JSX structure of the modal.
  // The modal contains a title, a paragraph showing the number of correct answers and total questions,
  // a message with dynamic color based on the score, and a button to close the modal.
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Quiz Completed!</h2>
        <p>You got {correct_answers} out of {total_questions} correct.</p>
        <p className={`mt-4 ${textColor}`}>{message}</p>
        <button onClick={onClose} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200">
          Close
        </button>
      </div>
    </div>
  );
};

export default QuizResultModal;
