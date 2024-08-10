import { Quiz } from "../../../types/UserCourse";
const QuizComponent: React.FC<{ quiz: Quiz; onAnswerSelected: (index: number) => void }> = ({ quiz, onAnswerSelected }) => {
  return (
    <div>
      <p>{quiz.question}</p>
      {quiz.options.map((option, index) => (
        <button onClick={() => onAnswerSelected(index)} key={index}>
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default QuizComponent