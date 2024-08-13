// Import necessary modules and components
"use client"
import { useParams } from "next/navigation"; // Hook to access route parameters
import React, { useEffect, useState } from 'react'; // Core React hooks
import axios from "axios"; // HTTP client for making requests
import QuizComponent from "@/components/UserCourse/QuizComponent"; // Custom component for quizzes
import { CourseDetails } from "../../../../../types/UserCourse"; // Type definition for course details


// Main component for displaying course details and managing quiz progress
const CourseDetailPage: React.FC = () => {
  // Extracting the course ID from the URL parameters
  const params = useParams();
  const name = params.index as string; // Assuming 'index' is the parameter holding the course ID

  // State variables for storing course details, loading status, errors, and quiz progress
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true); // Indicates whether the component is waiting for data
  const [error, setError] = useState<string | null>(null); // Any error messages
  const [quizProgress, setQuizProgress] = useState({ currentIndex: 0, isCompleted: false }); // Current quiz progress

  // Effect hook to fetch course details when the component mounts or the course ID changes
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true); // Set loading to true before starting the request
        const response = await axios.get(`http://localhost:8080/api/course/${name}`); // Fetching course details from the API
        setCourseDetails(response.data); // Updating state with fetched data
        console.log("response from server --> ", response.data); // Logging the response for debugging
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred'); // Setting error message if any
      } finally {
        setLoading(false); // Setting loading to false after the request completes
      }
    };

    fetchCourseDetails(); // Calling the function to fetch data
  }, [name]); // Dependency array ensures the effect runs only when 'name' changes

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

  if (quizProgress.isCompleted) {
    return <div>Quiz Completed!</div>; // Display completion message
  }

  // Function to handle answer selection in the quiz
  const onAnswerSelected = (index: number) => {
    console.log(`Selected answer index: ${index}`); // Log the selected index for debugging
    // Here, you could also check if the answer is correct and update the quiz progress state accordingly
  };

  // Render the course details and quiz component
  return (
    <div className="container mx-auto h-screen p-4 bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">{courseDetails.name}</h1>
      <img src={courseDetails.imageUrl} alt={courseDetails.name} className="mb-4 rounded-lg shadow-lg" />
      <p className="text-lg">{courseDetails.description}</p>
      {/* Conditionally render the QuizComponent if there are quizzes */}
      {courseDetails.quizzes.length > 0 && (
        <QuizComponent
          quiz={courseDetails.quizzes[quizProgress.currentIndex]} // Pass the current quiz to the component
          onAnswerSelected={onAnswerSelected} // Pass the function to handle answer selection
        />
      )}
      {/* Buttons for navigating through the quizzes */}
      <div className="flex flex-row justify-center items-center space-x-6">
        <button onClick={() => setQuizProgress({ ...quizProgress, isCompleted: true })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Check Answer</button>
        <button onClick={() => setQuizProgress({ ...quizProgress, currentIndex: (quizProgress.currentIndex + 1) % courseDetails.quizzes.length })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</button>
      </div>
    </div>
  );
};

export default CourseDetailPage;
