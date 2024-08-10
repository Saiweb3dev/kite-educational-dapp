"use client"
import { useParams } from "next/navigation";
import React, { useEffect, useState } from 'react';
import axios from "axios"
import QuizComponent from "@/components/UserCourse/QuizComponent";
import { CourseDetails } from "../../../../../types/UserCourse";
// Define an interface for the course details


const CourseDetailPage: React.FC = () => {
  const params = useParams();
  const name = params.index as string;
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizProgress, setQuizProgress] = useState({ currentIndex: 0, isCompleted: false });


  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/course/${name}`);
        setCourseDetails(response.data);
        console.log("response from server --> ",response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourseDetails();
  }, [name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!courseDetails) {
    return <div>No course details found.</div>;
  }

  if (quizProgress.isCompleted) {
    return <div>Quiz Completed!</div>;
  }

  const onAnswerSelected = (index: number) => {
    // Logic to handle answer selection
    // For now, just log the selected index
    console.log(`Selected answer index: ${index}`);
  
    // Optionally, here you could also check if the answer is correct
    // and update the quiz progress state accordingly
  };
  

  return (
    <div className="container mx-auto h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">{courseDetails.name}</h1>
      <img src={courseDetails.imageUrl} alt={courseDetails.name} className="mb-4 rounded-lg shadow-lg" />
      <p className="text-lg">{courseDetails.description}</p>
      {courseDetails.quizzes.length > 0 && (
      <QuizComponent
      quiz={courseDetails.quizzes[quizProgress.currentIndex]}
      onAnswerSelected={onAnswerSelected} // Correctly passing the function
    />
    )}

    <button onClick={() => setQuizProgress({ ...quizProgress, isCompleted: true })}>Check Answer</button>
    <button onClick={() => setQuizProgress({ ...quizProgress, currentIndex: (quizProgress.currentIndex + 1) % courseDetails.quizzes.length })}>Next</button>
    </div>
  );
};

export default CourseDetailPage;