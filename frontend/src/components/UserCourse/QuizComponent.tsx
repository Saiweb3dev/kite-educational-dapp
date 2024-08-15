import { Quiz } from "../../../types/UserCourse";
const QuizComponent: React.FC<{ quiz: Quiz; onAnswerSelected: (index: number,option:string) => void }> = ({ quiz, onAnswerSelected }) => {
  return (
    <div className="bg-white text-black flex flex-col justify-center items-center space-y-6">
      <p className="text-4xl font-bold">{quiz.question}</p>
      {quiz.options.map((option, index) => (
        <button className="btn w-64 bg-blue-700 text-white" onClick={() => onAnswerSelected(index,option.text)} key={index}>
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default QuizComponent