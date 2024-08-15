// Import necessary modules and components
"use client";
import CheckAnswerButton from "@/components/UserCourse/CheckAnswerButton";
import QuizComponent from "@/components/UserCourse/QuizComponent"; // Custom component for quizzes
import QuizResultModal from "@/components/UserCourse/QuizResultModal";
import axios from "axios"; // HTTP client for making requests
import { useParams } from "next/navigation"; // Hook to access route parameters
import React, { useEffect, useState } from "react"; // Core React hooks
import { useAccount } from "wagmi";
import {
  CheckAnswersResponse,
  CourseDetails,
} from "../../../../../types/UserCourse"; // Type definition for course details

// Main component for displaying course details and managing quiz progress
const CourseDetailPage: React.FC = () => {
  // Extracting the course ID from the URL parameters
  const params = useParams();
  const name = params.index as string; // Assuming 'index' is the parameter holding the course ID
  const { address }: any = useAccount();

  // State variables for storing course details, loading status, errors, and quiz progress
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true); // Indicates whether the component is waiting for data
  const [error, setError] = useState<string | null>(null); // Any error messages
  const [quizProgress, setQuizProgress] = useState({
    currentIndex: 0,
    isCompleted: false,
  }); // Current quiz progress
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [answers, setAnswers] = useState<
    Array<{ questionId: number; selectedOption: string }>
  >([]);
  const [quizResult, setQuizResult] = useState<CheckAnswersResponse | null>(
    null
  );

  // Effect hook to fetch course details when the component mounts or the course ID changes
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true); // Set loading to true before starting the request
        const response = await axios.get(
          `http://localhost:8080/api/course/${name}`
        ); // Fetching course details from the API
        setCourseDetails(response.data); // Updating state with fetched data
        console.log("response from server --> ", response.data); // Logging the response for debugging
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred"); // Setting error message if any
      } finally {
        setLoading(false); // Setting loading to false after the request completes
      }
    };

    fetchCourseDetails(); // Calling the function to fetch data
  }, [name]); // Dependency array ensures the effect runs only when 'name' changes

  useEffect(() => {
    if (quizProgress.isCompleted) {
      setIsModalOpen(true);
    }
  }, [quizProgress.isCompleted]);

  // Conditional rendering based on the current state
  if (loading) {
    return <div>Loading...</div>; // Display loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  if (!courseDetails) {
    return <div>No course details found.</div>; // Display message if no course details are available
  }

  // Function to handle answer selection in the quiz
  const onAnswerSelected = (index: number, option: string) => {
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

  // Render the course details and quiz component
  return (
    <div className="container mx-auto h-screen p-4 bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">{courseDetails.name}</h1>
      <img
        src={courseDetails.imageUrl}
        alt={courseDetails.name}
        className="mb-4 rounded-lg shadow-lg"
      />
      <p className="text-lg">{courseDetails.description}</p>
      {/* Conditionally render the QuizComponent if there are quizzes */}
      <div className="flex flex-col justify-center items-center space-y-4">
        {courseDetails.quizzes.length > 0 && (
          <QuizComponent
            quiz={courseDetails.quizzes[quizProgress.currentIndex]} // Pass the current quiz to the component
            onAnswerSelected={onAnswerSelected} // Pass the function to handle answer selection
          />
        )}
        {/* Buttons for navigating through the quizzes */}
        <div className="flex flex-row justify-center items-center space-x-6">
          <CheckAnswerButton
            courseName={courseDetails.name}
            answers={answers}
            onResultReceived={handleResultReceived}
            address={address}
          />
          <button
            onClick={() =>
              setQuizProgress({
                ...quizProgress,
                currentIndex:
                  (quizProgress.currentIndex + 1) %
                  courseDetails.quizzes.length,
              })
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
          {quizProgress.isCompleted && isModalOpen && quizResult && (
            <QuizResultModal
              quizResult={quizResult}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
