import React, { useState } from 'react';
import { Quiz } from "../../../types/UserCourse";

const QuizButton: React.FC<{ quiz: Quiz; onAnswerSelected: (index: number, option: string) => void }> = ({ quiz, onAnswerSelected }) => {
  // State to track the currently selected option
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  // Function to handle option selection
  const handleOptionClick = (index: number, optionText: string) => {
    setSelectedOptionIndex(index); // Update the state with the selected option index
    onAnswerSelected(index, optionText); // Notify the parent component about the selection
  };

  return (
    <div className="bg-white text-black flex flex-col justify-center items-center space-y-6">
      <p className="text-4xl font-bold">{quiz.question}</p>
      {quiz.options.map((option, index) => (
        <button
          className={`btn w-64 ${index === selectedOptionIndex ? 'bg-black text-white' : 'bg-blue-700 text-white'}`}
          onClick={() => handleOptionClick(index, option.text)}
          key={index}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default QuizButton;
