"use client";
import { useEffect, useState } from "react";
import { CheckAnswersResponse, CourseDetails,QuizMainComponentProps } from "../../../types/UserCourse";
import CheckAnswerButton from "./CheckAnswerButton";
import QuizButton from "./QuizButton";
import QuizResultModal from "./QuizResultModal";
const QuizMainComponent: React.FC<QuizMainComponentProps> = ({ courseDetailsProp, address }) => {
  const [quizProgress, setQuizProgress] = useState({
    currentIndex: 0,
    isCompleted: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseDetails, setCourseDetails] = useState<CourseDetails|null>(null);
  const [answers, setAnswers] = useState<
    Array<{ questionId: number; selectedOption: string }>
  >([]);
  const [quizResult, setQuizResult] = useState<CheckAnswersResponse | null>(
    null
  );

  useEffect(() => {
    setCourseDetails(courseDetailsProp);
  },[])

  useEffect(() => {
    if (quizProgress.isCompleted) {
      setIsModalOpen(true);
    }
  }, [quizProgress.isCompleted]);

  // Function to handle answer selection in the quiz
  const onAnswerSelected = (index: number, option: string):void => {
    console.log(`Selected answer index: ${index} ${option}`);
    setAnswers((prevAnswers) => [
      ...prevAnswers.filter((a) => a.questionId !== index),
      { questionId: index, selectedOption: option },
    ]);
  };

  const handleResultReceived = (result: CheckAnswersResponse) => {
    console.log("Quiz result:", result);
    setQuizResult(result);
    setQuizProgress({ ...quizProgress, isCompleted: true });
  };

  if (!courseDetails) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl">Take the Quiz for Collect Course NFT</h1>
      <div>
        {courseDetails?.quizzes?.length > 0 && (
          <QuizButton
            quiz={courseDetails.quizzes[quizProgress.currentIndex]}
            onAnswerSelected={onAnswerSelected}
          />
        )}
      </div>
      <div className="flex flex-row justify-center items-center space-x-6">
        <CheckAnswerButton
          courseName={courseDetails?.name}
          answers={answers}
          onResultReceived={handleResultReceived}
          address={address}
        />
        {quizProgress.isCompleted && isModalOpen && quizResult && (
          <QuizResultModal
            quizResult={quizResult}
            onClose={() => setIsModalOpen(false)}
            courseID={courseDetails.id}
          />
        )}
        {courseDetails?.quizzes?.length > 0 && (
          <>
            {quizProgress.currentIndex < courseDetails.quizzes.length - 1 ? (
              <button
                onClick={() =>
                  setQuizProgress({
                    ...quizProgress,
                    currentIndex:
                      (quizProgress.currentIndex + 1) % courseDetails.quizzes.length,
                  })
                }
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Next
              </button>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizMainComponent;
