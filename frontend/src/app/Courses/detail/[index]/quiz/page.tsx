"use client"; // Indicates that this file is intended to run on the client side
import Loader from "@/components/Loader"; // Imports a loading component
import QuizMainComponent from "@/components/UserCourse/QuizMainComponent"; // Imports the main quiz component
import QuizResultModal from "@/components/UserCourse/QuizResultModal"; // Imports the modal for displaying quiz results
import React, { useEffect, useState } from "react"; // Imports React and hooks for managing state and effects
import { CheckAnswersResponse, CourseDetails } from "../../../../../../types/UserCourse"; // Imports type definitions
import { useSearchParams } from 'next/navigation'; // Imports hook for accessing search parameters in Next.js

const QuizPage: React.FC = () => {
  const searchParams = useSearchParams(); // Hook to get URL search parameters
  const address = searchParams.get('address'); // Retrieves the user's address from URL parameters
  console.log("address in quiz --> ", address); // Logs the retrieved address for debugging purposes

  // State to store course details fetched from local storage
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  const [quizResult, setQuizResult] = useState<CheckAnswersResponse | null>(null); // State to store quiz results
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the visibility of the quiz result modal
  const [quizProgress, setQuizProgress] = useState({ currentIndex: 0, isCompleted: false }); // State to track quiz progress

  useEffect(() => {
    const storedCourseDetails = localStorage.getItem("courseDetails"); // Retrieves course details from local storage
    if (storedCourseDetails) {
      // Parses the stored JSON string back into an object and updates the state
      setCourseDetails(JSON.parse(storedCourseDetails) as CourseDetails);
      console.log("courseDetails in quiz --> ", courseDetails); // Logs the retrieved course details for debugging purposes
      localStorage.removeItem("courseDetails"); // Removes the item from local storage after retrieval
    }
  }, [courseDetails]); // Dependency array ensures effect runs only when 'courseDetails' changes

  useEffect(() => {
    // Opens the quiz result modal when the quiz is completed
    if (quizProgress.isCompleted) {
      setIsModalOpen(true);
    }
  }, [quizProgress.isCompleted]); // Dependency array ensures effect runs only when 'quizProgress.isCompleted' changes

  if (courseDetails === null) {
    return <Loader />; // Renders loader component while course details are being fetched
  }

  // Main render of the QuizPage component
  return (
    <div className="container max-w-full h-screen p-4 bg-white text-black">
      <div className="flex flex-col justify-center items-center mx-auto space-y-6">
        {/* Renders the main quiz component with course details and user's address as props */}
        <QuizMainComponent courseDetailsProp={courseDetails} address={address as string} />
        
        {/* Conditionally renders the quiz result modal when the quiz is completed */}
        {quizProgress.isCompleted && isModalOpen && quizResult && (
          <QuizResultModal
            quizResult={quizResult} // Passes quiz result to the modal
            onClose={() => setIsModalOpen(false)} // Function to close the modal
          />
        )}
      </div>
    </div>
  );
};

export default QuizPage;
